// /api/contact.js (Vercel serverless function)
import { Resend } from 'resend';
import dns from 'dns/promises';

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// --- spam/abuse prevention ---
// In-memory rate limit (per server instance). More robust solutions exist, but this is a good start.
const windowMs = 60 * 1000; // 1 minute
const maxPerWindow = 5;
const requestBucket = new Map();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Heuristics to catch low-effort spam
const isNonsense = (s) => {
  if (!s) return true;
  const t = s.trim();
  if (t.length < 8) return true;
  if ((t.match(/\S/g) || []).length < 6) return true;
  if (/^([a-z])\1{4,}$/i.test(t)) return true; // e.g., "aaaaa"
  if (/^[a-z]{1,3}$/i.test(t)) return true;    // e.g., "abc"
  if (/^[^a-zA-Z0-9]+$/.test(t)) return true;  // symbols only
  return false;
};

// Checks if the email's domain has MX records (i.e., is set up to receive email)
const hasMxRecords = async (domain) => {
  try {
    const records = await dns.resolveMx(domain);
    return Array.isArray(records) && records.length > 0;
  } catch {
    return false;
  }
};

// Verifies the CAPTCHA token with Cloudflare's API
const verifyTurnstile = async (token, ip) => {
  const params = new URLSearchParams();
  params.append('secret', process.env.TURNSTILE_SECRET_KEY);
  params.append('response', token);
  if (ip) params.append('remoteip', ip);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: params
    });
    return response.json();
  } catch (error) {
    console.error("Turnstile verification fetch failed:", error);
    return { success: false };
  }
};

// --- Main Handler ---
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';

  // 1. Rate Limiting
  const now = Date.now();
  const userRequests = (requestBucket.get(ip) || []).filter((timestamp) => now - timestamp < windowMs);
  if (userRequests.length >= maxPerWindow) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }
  userRequests.push(now);
  requestBucket.set(ip, userRequests);

  const { name, email, message, company, captchaToken } = req.body || {};

  // 2. Honeypot Check
  if (company) {
    return res.status(400).json({ error: 'Spam detected.' });
  }

  // 3. CAPTCHA Verification
  if (!captchaToken) {
    return res.status(400).json({ error: 'CAPTCHA is required.' });
  }
  const turnstileResult = await verifyTurnstile(captchaToken, ip);
  if (!turnstileResult.success) {
    return res.status(400).json({ error: 'CAPTCHA validation failed. Please try again.' });
  }

  // 4. Input Validation
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (!name || isNonsense(name)) {
    return res.status(400).json({ error: 'Please provide your real name.' });
  }
  if (!message || isNonsense(message) || message.trim().length < 20) {
    return res.status(400).json({ error: 'Your message should be at least 20 characters long.' });
  }

  // 5. MX Record Check
  const domain = email.split('@')[1];
  if (!(await hasMxRecords(domain))) {
    return res.status(400).json({ error: 'The email domain does not appear to be valid.' });
  }

  // 6. Send Email via Resend
  try {
    await resend.emails.send({
      from: 'Contact Form <contact@yourdomain.com>', // MUST be a verified domain in Resend
      to: 'your-support-email@yourdomain.com',       // The email address where you want to receive messages
      reply_to: email,
      subject: `New Message from ${name} via Context Nexus Site`,
      text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ ok: true, message: 'Your message has been sent successfully.' });
  } catch (error) {
    console.error('Resend API Error:', error);
    return res.status(500).json({ error: 'There was an error sending your message.' });
  }
}