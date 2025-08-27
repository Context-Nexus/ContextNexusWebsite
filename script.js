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
            themeToggle.checked = true;
        } else {
            body.classList.remove('light-theme');
            themeToggle.checked = false;
        }
    };
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('dark');
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

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
        const words = ["Unreal Project.", "Blueprint logic.", "C++ architecture."];
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

    // --- Feature 5: ADVANTAGE CARD SLIDESHOWS (PRECISE TIMING) ---
    const slideshowTargets = document.querySelectorAll('.advantage-card.slideshow-target');
    
    const slideData1 = [
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 20.5c.7.3 1.5.3 2.2 0"/><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v20"/><path d="m15.5 15.5-3.3-3.3a1.4 1.4 0 0 1 0-2l3.3-3.3"/><path d="M8.5 8.5l3.3 3.3a1.4 1.4 0 0 1 0 2l-3.3 3.3"/></svg>`,
            title: 'True Blueprint Fluency',
            text: 'Our professional parser translates complex Blueprint graphs into a clean, semantic DSL. The AI doesn’t just see text—it understands the logic, flow, and structure.',
            duration: 8500 // Longer duration for more text
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Full C++ Support, Standard',
            text: 'We believe deep C++ class analysis is a core requirement. Context Nexus scans your entire project, from Blueprints to source code, giving the AI a complete picture.',
            duration: 8000
        }
    ];

    const slideData2 = [
         {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
            title: 'Customizable AI Personas',
            text: 'Direct the AI’s behavior with custom Personas. Switch between a "Teacher," "Senior Developer," "Debugger," or create your own for perfectly tailored responses.',
            duration: 9000 // Most text, longest duration
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
            title: 'Deep Editor Integration',
            text: 'Our tools feel native to Unreal. Right-click any asset in the Content Browser to instantly add it to the AI\'s context for a hyper-fast and intuitive workflow.',
            duration: 8500
        }
    ];

    const slideData3 = [
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
            title: 'For the Professional Team',
            text: 'Navigate vast, legacy codebases with ease, enforce code standards, and maintain stability and performance at scale. This is a tool for developers who build to last.',
            duration: 8500
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
            title: 'For the Indie Studio',
            text: 'For small teams, every hour counts. Context Nexus is a force multiplier, automating boilerplate and diagnosing elusive bugs to free you up for pure creativity and innovation.',
            duration: 8000
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5"/></svg>`,
            title: 'For the Aspiring Developer',
            text: 'Just starting your Unreal journey? Context Nexus is your personal mentor, explaining confusing code and accelerating your learning tenfold from day one.',
            duration: 7500 // Shortest text, shortest duration
        },
    ];

    // Array of all slide data sets
    const allSlideData = [slideData1, slideData2, slideData3];
    // Specific start delays for each card in milliseconds, as you requested
    const startDelays = [2000, 8000, 5000]; // Card 1: 2s, Card 2: 8s, Card 3: 5s

    const slideshowInstances = [];

    if (slideshowTargets.length === allSlideData.length) {
        slideshowTargets.forEach((cardElement, index) => {
            const data = allSlideData[index];
            const cardContent = cardElement.querySelector('.card-content');
            let currentSlide = 0;
            let timeoutId = null;

            const updateCard = (slideIndex) => {
                const slide = data[slideIndex];
                cardContent.innerHTML = `${slide.icon}<h4>${slide.title}</h4><p>${slide.text}</p>`;
            };

            const scheduleNextSlide = () => {
                // Get the specific duration for the *currently visible* slide
                const currentDuration = data[currentSlide].duration;
                
                timeoutId = setTimeout(() => {
                    // Transition to the next slide
                    cardContent.classList.add('fading');
                    setTimeout(() => {
                        currentSlide = (currentSlide + 1) % data.length;
                        updateCard(currentSlide);
                        cardContent.classList.remove('fading');
                        // After transition, schedule the next one
                        scheduleNextSlide();
                    }, 400); // 400ms for the fade animation
                }, currentDuration);
            };

            const startSlideshow = () => {
                clearTimeout(timeoutId);
                // The very first slide is displayed for the initial start delay
                const firstDisplayDuration = startDelays[index];
                timeoutId = setTimeout(() => {
                    // Transition to the second slide
                     cardContent.classList.add('fading');
                    setTimeout(() => {
                        currentSlide = (currentSlide + 1) % data.length;
                        updateCard(currentSlide);
                        cardContent.classList.remove('fading');
                        // Now, start the normal scheduling based on each slide's content length
                        scheduleNextSlide();
                    }, 400);
                }, firstDisplayDuration);
            };

            const stopSlideshow = () => {
                clearTimeout(timeoutId);
            };

            // Set the initial content for the card
            updateCard(0);
            slideshowInstances.push({ start: startSlideshow, stop: stopSlideshow });
        });

        // Start all slideshows and add global controls
        slideshowInstances.forEach(instance => instance.start());
        const advantageGrid = document.getElementById('advantage-grid');
        advantageGrid.addEventListener('mouseenter', () => slideshowInstances.forEach(inst => inst.stop()));
        advantageGrid.addEventListener('mouseleave', () => slideshowInstances.forEach(inst => inst.start()));
    }

    // --- Feature 6: Smooth Scrolling for Sticky Nav ---
    const navLinks = document.querySelectorAll('.creative-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const correctTargetId = targetId === '#roadmap' ? '#mission' : targetId;
            const targetElement = document.querySelector(correctTargetId);
            if (targetElement) {
                const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navHeight + 20);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
