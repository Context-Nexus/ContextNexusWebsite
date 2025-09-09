document.addEventListener('DOMContentLoaded', () => {

    // --- Feature 1: Fade-in Animation on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    const elementsToFadeIn = document.querySelectorAll('.fade-in');
    elementsToFadeIn.forEach((el) => observer.observe(el));

    // --- Feature 2: Day/Night Theme Switch ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-theme');
            if(themeToggle) themeToggle.checked = true;
        } else {
            body.classList.remove('light-theme');
            if(themeToggle) themeToggle.checked = false;
        }
    };
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('light'); // Make light the default
    }

    if(themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- Feature 3: Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
    });
    
    // --- Feature 4: Typewriter Effect ---
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const words = ["UE5 project.", "Blueprint logic.", "C++ architecture.", "Gameplay systems."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            let typeSpeed = 150;

            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 75;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } 
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };
        
        type();
    }

    // --- WHY SECTION: single-card slideshow with arrows (COMBINED CONTENT) ---
    (() => {
      const whyCard = document.getElementById('why-carousel');
      if (!whyCard) return;
    
      const whySlides = [
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M14 14h7v7h-7z"/><path d="M3 14h7v7H3z"/></svg>`,
          title: 'Architectural Answers, Not Guesses',
          text: `We analyze your entire Unreal Engine project—C++ classes, Blueprint graphs, event flows, and dependencies—and build a unified knowledge map.\n\nSo when you ask “What happens if I change this function?”, Context Nexus gives answers grounded in how your game actually works, not vague guesses.`,
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4 22h16"/><path d="M20 22V8l-8-4-8 4v14"/><path d="M12 12v10"/><path d="M7 12h10"/></svg>`,
          title: 'Token-Efficient Context',
          text: `Instead of sending your whole project, you hand-pick only the files, classes, or functions relevant to the task.\n\nThe AI sees exactly what it needs—no wasted tokens, no noise. That means faster replies, lower cost, and sharper answers.`,
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>`,
          title: 'Native Unreal Workflow',
          text: `Context Nexus feels like part of Unreal itself. Right-click Add to Context, tick checkboxes in the Project Explorer, and chat directly inside the editor.\n\nNo alt-tabbing, no context switching—your workflow stays focused where the game is being built.`,
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 20l9-16H3z"/></svg>`,
          title: 'Best with Rider (Recommended)',
          text: `Context Nexus supports any setup, but we recommend JetBrains Rider for the smoothest Unreal + C++ experience.\n\nRider’s powerful parsing and navigation complement Context Nexus perfectly, giving you deep, seamless insight. VS Code works too—just not as seamlessly.`,
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
          title: 'Customizable AI Personas',
          text: `Your AI doesn’t have to behave like a generic assistant. Switch between a Teacher who explains, a Senior Developer who reviews, or a Debugger who hunts bugs—or craft your own Persona.\n\nYou decide how the AI talks and what role it plays in your workflow.`,
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
          title: 'Deep Editor Integration',
          text: `Context Nexus hooks into the Unreal Editor at every level. Right-click any asset in the Content Browser, add it instantly to the AI’s context, and start asking questions.\n\nIt’s frictionless, intuitive, and feels like a built-in Unreal feature.`,
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
          title: 'For the Indie Studio',
          text: `For small teams, every hour matters.\n\nContext Nexus acts as a force multiplier—catching bugs early, cutting boilerplate, and keeping your project on track—so you can focus on creativity, not firefighting.`,
        },
        {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5"/></svg>`,
          title: 'For the Professional Team',
          text: `Large codebases demand stability. With deep dependency analysis, static checks, and cross-language clarity, Context Nexus helps studios enforce standards, maintain performance, and ship with confidence at scale.`,
        }
      ];
    
      const cardContent = whyCard.querySelector('.card-content');
      const dotsContainer = whyCard.querySelector('.slideshow-dots');
      const prevBtn = whyCard.querySelector('.why-arrow.prev');
      const nextBtn = whyCard.querySelector('.why-arrow.next');
    
      let current = 0;
      let timeoutId = null;
      let paused = false;
    
      const render = (idx) => {
        const s = whySlides[idx];
        cardContent.classList.add('fading');
        setTimeout(() => {
          // Process text for paragraphs
          const paragraphs = s.text.split('\n\n').map(p => `<p>${p}</p>`).join('');
          cardContent.innerHTML = `${s.icon}<h4>${s.title}</h4>${paragraphs}`;
          cardContent.classList.remove('fading');
          updateDots(idx);
        }, 250);
      };
    
      const updateDots = (active) => {
        dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
          d.classList.toggle('active', i === active);
        });
      };
    
      const schedule = (ms) => {
        clearTimeout(timeoutId);
        if (paused) return;
        timeoutId = setTimeout(() => goTo((current + 1) % whySlides.length), ms || 8000);
      };
    
      const goTo = (idx) => {
        current = idx;
        render(current);
        schedule(whySlides[current].duration);
      };
    
      // dots
      dotsContainer.innerHTML = '';
      whySlides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    
      // arrows
      prevBtn.addEventListener('click', () => {
        const next = (current - 1 + whySlides.length) % whySlides.length;
        goTo(next);
      });
      nextBtn.addEventListener('click', () => {
        const next = (current + 1) % whySlides.length;
        goTo(next);
      });
    
      // hover pause on desktop
      whyCard.addEventListener('mouseenter', () => { paused = true; clearTimeout(timeoutId); });
      whyCard.addEventListener('mouseleave', () => { paused = false; schedule(whySlides[current].duration); });
    
      // init
      render(0);
      schedule(1500);
    })();

    // --- Smooth Scrolling for Sticky Nav ---
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            // Do not prevent default for the trial button, let its own handler work
            if (link.classList.contains('trial-button')) {
                return;
            }

            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const linkPath = href.split('#')[0];

            // If it's a link to a section on the current page
            if (href.startsWith('#') || (linkPath === currentPath || linkPath === '')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navHeight + 20);
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // Let the browser handle navigation to other pages
        });
    });

    // --- Scroll Progress Bar ---
    const setScrollProgress = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || window.pageYOffset || 0;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const progress = Math.min(Math.max(scrollTop / max, 0), 1);
      document.documentElement.style.setProperty('--scroll-progress', progress.toString());
    };

    // Set once and on scroll/resize
    setScrollProgress();
    window.addEventListener('scroll', setScrollProgress, { passive: true });
    window.addEventListener('resize', setScrollProgress);

    // --- Pricing Modal ---
    const plansButton = document.getElementById('see-plans-btn');
    const pricingModal = document.getElementById('pricing-modal');
    if (plansButton && pricingModal) {
        const modalOverlay = pricingModal.querySelector('.modal-overlay');
        const modalCloseBtn = pricingModal.querySelector('.modal-close');
        const modalBackBtn = pricingModal.querySelector('.modal-back');

        const tierSelectionView = document.getElementById('tier-selection');
        const durationSelectionView = document.getElementById('duration-selection');
        
        const durationTitle = document.getElementById('duration-title');
        const tierCards = tierSelectionView.querySelectorAll('.plan-card');
        const durationOptions = durationSelectionView.querySelectorAll('.duration-option');

        let selectedTier = '';

        const openModal = (e) => {
            e.preventDefault(); 
            tierSelectionView.classList.remove('hidden');
            durationSelectionView.classList.add('hidden');
            pricingModal.classList.add('visible');
        };

        const closeModal = () => {
            pricingModal.classList.remove('visible');
        };

        plansButton.addEventListener('click', openModal);
        modalOverlay.addEventListener('click', closeModal);
        modalCloseBtn.addEventListener('click', closeModal);
        
        modalBackBtn.addEventListener('click', () => {
            durationSelectionView.classList.add('hidden');
            tierSelectionView.classList.remove('hidden');
        });

        tierCards.forEach(card => {
            card.addEventListener('click', () => {
                const tier = card.dataset.tier;
                
                if (tier === 'indie' || tier === 'studio') {
                    selectedTier = tier;
                    const capitalizedTier = tier.charAt(0).toUpperCase() + tier.slice(1);
                    durationTitle.textContent = `Select Subscription for ${capitalizedTier}`;
                    
                    tierSelectionView.classList.add('hidden');
                    durationSelectionView.classList.remove('hidden');
                } else if (tier === 'enterprise') {
                    closeModal();
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        durationOptions.forEach(option => {
            option.addEventListener('click', () => {
                durationOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && pricingModal.classList.contains('visible')) {
                closeModal();
            }
        });
    }

    // --- Contact form --- 
    (() => {
      const form = document.getElementById('contact-form');
      const status = document.getElementById('contact-status');
      if (!form) return;
    
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        if (!data.name || !data.email || !data.message) {
          status.textContent = 'Please fill in all fields.';
          return;
        }
        status.textContent = 'Thanks for reaching out — we’ll get back to you soon.';
        form.reset();
      });
    })();

    // --- 7-day Free Trial button (placeholder behavior) ---
    (() => {
      const trialBtns = document.querySelectorAll('.trial-button');
      if (trialBtns.length === 0) return;

      const clickHandler = (e) => {
        const btn = e.currentTarget;
        if (btn.classList.contains('is-coming-soon') || btn.getAttribute('aria-disabled') === 'true' || btn.getAttribute('href') === '#') {
          e.preventDefault();
          alert('The 7-day free trial will be available on the Fab Marketplace soon. Stay tuned!');
        }
      };

      trialBtns.forEach(btn => {
        btn.addEventListener('click', clickHandler);
      });
    })();

    // --- Mobile nav toggle ---
    (() => {
      const btn = document.getElementById('nav-toggle');
      const menu = document.getElementById('mobile-menu');
      if (!btn || !menu) return;

      const open = () => {
        menu.hidden = false;
        requestAnimationFrame(() => menu.classList.add('open'));
        btn.setAttribute('aria-expanded', 'true');
      };
      const close = () => {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        // hide after transition
        setTimeout(() => { if (!menu.classList.contains('open')) menu.hidden = true; }, 180);
      };
      const toggle = () => (menu.classList.contains('open') ? close() : open());

      btn.addEventListener('click', toggle);

      // Close on ESC or link click
      menu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') close();
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('open')) close();
      });
    })();
    
    // --- Active underline: only on current page (incl. logo on home) ---
    (() => {
      const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

      // all nav links (desktop + mobile)
      const links = document.querySelectorAll('.sticky-nav a.underline-grow');

      // clear any previous 'active'
      links.forEach(a => a.classList.remove('active'));

      // set active on matching page link (how.html, about.html, faq.html, etc.)
      links.forEach(a => {
        const href = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
        if (href && href === path) {
          a.classList.add('active');
        }
      });
    })();

    // --- Carousel bootstrapping: show placeholders for missing assets ---
    (() => {
      const carousel = document.querySelector('.cnx-carousel');
      if (!carousel) return;

      const slides = Array.from(carousel.querySelectorAll('.cnx-carousel__slide'));

      const checkAsset = (el) => new Promise((resolve) => {
        if (!el) return resolve(false);

        if (el.tagName === 'IMG') {
          const src = el.getAttribute('src') || el.getAttribute('data-src');
          if (!src) return resolve(false);
          const probe = new Image();
          probe.onload = () => resolve(true);
          probe.onerror = () => resolve(false);
          probe.src = src;
        } else if (el.tagName === 'VIDEO') {
          const hasSrc = Array.from(el.querySelectorAll('source')).some(s => s.src && s.src.length > 0 && !s.src.endsWith('#'));
          if (!hasSrc) return resolve(false);

          let done = false;
          const clean = (ok) => { if (!done) { done = true; resolve(ok); } };
          el.addEventListener('loadedmetadata', () => clean(true), { once: true });
          el.addEventListener('error', () => clean(false), { once: true });
          
          try { el.load(); } catch (_) { clean(false); }
          setTimeout(() => clean(true), 1200);
        } else {
          resolve(false);
        }
      });

      slides.forEach(slide => {
        // Skip the guaranteed screenshot slide
        if (slide.id === 'cnx_slide2') return;

        const media = slide.querySelector('.cnx-media');
        if (media) {
            // Lazy-load images
            if (media.tagName === 'IMG' && media.dataset.src) {
                media.src = media.dataset.src;
            }

            checkAsset(media).then(ok => {
                if (!ok) {
                    media.classList.add('cnx-hidden'); // Hide the media element, not the slide
                }
            });
        }
      });

      // Pause video when not on its slide
      const videoSlide = document.getElementById('cnx_slide1');
      const video = videoSlide ? videoSlide.querySelector('video') : null;
      if (video) {
        const applyVideoPolicy = () => {
          // Default to slide 2 (your screenshot) if no hash is present
          const activeId = (location.hash || '#cnx_slide2').substring(1);
          if (activeId === 'cnx_slide1' && !video.classList.contains('cnx-hidden')) {
            video.play().catch(()=>{});
          } else {
            video.pause();
          }
        };
        window.addEventListener('hashchange', applyVideoPolicy);
        applyVideoPolicy(); // Run on init
      }
    })();
});