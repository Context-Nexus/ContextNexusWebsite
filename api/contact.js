// /api/contact.js — Vercel serverless function
// Validates input, optional CAPTCHA verify (Turnstile/hCaptcha), MX check, rate-limit, then sends email via Resend.

import dns from 'dns/promises';
import { Resend } from 'resend';

// ---- config (override via environment variables)
const CONTACT_TO = process.env.CONTACT_TO || 'support@contextnexus.dev';
const CONTACT_FROM = process.env.CONTACT_FROM || 'Context Nexus <contact@contextnexus.dev>';
const REQUIRE_CAPTCHA = (process.env.REQUIRE_CAPTCHA || 'false').toLowerCase() === 'true';

// ---- init resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ---- tiny in-memory rate limit (per lambda instance)
const windowMs = 60 * 1000;      // 1 minute
const maxPerWindow = 5;          // max requests per IP per window
const bucket = new Map();

// ---- utils
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNonsense = (s) => {
  if (!s) return true;
  const t = s.trim();
  if (t.length < 8) return true;                            // too short
  if ((t.match(/\S/g) || []).length < 6) return true;       // few non-space chars
  if (/^([a-z])\1{4,}$/i.test(t)) return true;              // aaaaa, zzzzz
  if (/^[a-z]{1,3}$/i.test(t)) return true;                 // 1–3 letters only
  if (/^[^a-zA-Z0-9]+$/.test(t)) return true;               // symbols only
  return false;
};

const hasMx = async (domain) => {
  try {
    const answers = await dns.resolveMx(domain);
    return Array.isArray(answers) && answers.length > 0;
  } catch {
    return false;
  }
};

const verifyTurnstile = async (token, ip) => {
  const params = new URLSearchParams();
  params.append('secret', process.env.TURNSTILE_SECRET_KEY || '');
  params.append('response', token || '');
  if (ip) params.append('remoteip', ip);

  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: params
  });
  return r.json();
};

const verifyHCaptcha = async (token, ip) => {
  const params = new URLSearchParams();
  params.append('secret', process.env.HCAPTCHA_SECRET_KEY || '');
  params.append('response', token || '');
  if (ip) params.append('remoteip', ip);

  const r = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  return r.json();
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // basic IP & rate-limit
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  const now = Date.now();
  const entry = bucket.get(ip) || [];
  const recent = entry.filter((t) => now - t < windowMs);
  if (recent.length >= maxPerWindow) {
    return res.status(429).json({ error: 'Too many requests — try again soon.' });
  }
  recent.push(now);
  bucket.set(ip, recent);

  // parse body
  const { name, email, message, company, captchaToken, captchaProvider } = req.body || {};

  // honeypot
  if (company) {
    return res.status(400).json({ error: 'Bad request.' });
  }

  // optional CAPTCHA (or force via REQUIRE_CAPTCHA=true)
  if (REQUIRE_CAPTCHA || captchaProvider) {
    if (!captchaToken) return res.status(400).json({ error: 'CAPTCHA required.' });

    if (captchaProvider === 'turnstile') {
      if (!process.env.TURNSTILE_SECRET_KEY) {
        return res.status(500).json({ error: 'CAPTCHA not configured on server.' });
      }
      const vr = await verifyTurnstile(captchaToken, ip);
      if (!vr.success) return res.status(400).json({ error: 'CAPTCHA validation failed.' });
    } else if (captchaProvider === 'hcaptcha') {
      if (!process.env.HCAPTCHA_SECRET_KEY) {
        return res.status(500).json({ error: 'CAPTCHA not configured on server.' });
      }
      const vr = await verifyHCaptcha(captchaToken, ip);
      if (!vr.success) return res.status(400).json({ error: 'CAPTCHA validation failed.' });
    } else {
      return res.status(400).json({ error: 'Unsupported CAPTCHA provider.' });
    }
  }

  // server-side validations
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email.' });
  }
  if (!name || isNonsense(name)) {
    return res.status(400).json({ error: 'Please provide your real name.' });
  }
  if (!message || isNonsense(message) || message.trim().length < 20) {
    return res.status(400).json({ error: 'Message should be at least 20 characters.' });
  }

  // MX check (does the domain accept mail?)
  const domain = email.split('@')[1];
  if (!(await hasMx(domain))) {
    return res.status(400).json({ error: 'Email domain is not accepting mail.' });
  }

  // ensure Resend is configured
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  // send email via Resend
  try {
    await resend.emails.send({
      from: CONTACT_FROM,      // e.g., 'Context Nexus <contact@contextnexus.dev>'
      to: CONTACT_TO,          // e.g., 'support@contextnexus.dev'
      reply_to: email,         // user’s email for direct replying
      subject: `New contact from ${name}`,
      text: `From: ${name} <${email}>\nIP: ${ip}\n\n${message}`
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
