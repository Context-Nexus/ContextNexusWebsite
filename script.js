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
        // Default to dark theme
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
    
    // --- Feature 4: Hero Logo Parallax ---
    const heroLogo = document.getElementById('hero-logo-bg');
    if (heroLogo) {
        window.addEventListener('scroll', () => {
            let scrollPosition = window.scrollY;
            const translateY = -scrollPosition * 0.25;
            const opacity = Math.max(0, 1 - (scrollPosition / 400));
            
            window.requestAnimationFrame(() => {
                heroLogo.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
                heroLogo.style.opacity = (document.body.classList.contains('light-theme') ? 0.03 : 0.05) * opacity;
            });
        });
    }

    // --- Feature 5: CENTRAL CARD SLIDESHOW ---
    const slideshowCard = document.getElementById('slideshow-card');
    if (slideshowCard) {
        // --- DATA FOR THE SLIDES ---
        const slideData = [
            { // Slide 1: Professional Team
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
                title: 'For the Professional Team',
                text: 'Navigate vast, legacy codebases with ease, enforce code standards, and maintain stability and performance at scale. This is a tool for developers who build to last.'
            },
            { // Slide 2: Indie Studio
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
                title: 'For the Indie Studio',
                text: 'For small teams, every hour counts. Context Nexus is a force multiplier, automating boilerplate and diagnosing elusive bugs to free you up for pure creativity and gameplay innovation.'
            },
            { // Slide 3: Aspiring Developer
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5"/></svg>`,
                title: 'For the Aspiring Developer',
                text: 'Just starting your Unreal Engine journey? Context Nexus is your personal mentor, explaining confusing code, untangling Blueprints, and accelerating your learning tenfold from day one.'
            }
        ];

        const cardContent = slideshowCard.querySelector('.card-content');
        const advantageGrid = document.getElementById('advantage-grid');

        let currentSlide = 0;
        let slideInterval;

        const updateCard = (index) => {
            const data = slideData[index];
            cardContent.innerHTML = `
                ${data.icon}
                <h4>${data.title}</h4>
                <p>${data.text}</p>
            `;
        };
        
        const transitionSlide = () => {
            cardContent.classList.add('fading');
            
            setTimeout(() => {
                currentSlide = (currentSlide + 1) % slideData.length;
                updateCard(currentSlide);
                cardContent.classList.remove('fading');
            }, 400); 
        };

        const startSlideshow = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(transitionSlide, 5000); 
        };

        const stopSlideshow = () => {
            clearInterval(slideInterval);
        };

        updateCard(0);
        startSlideshow();
        
        advantageGrid.addEventListener('mouseenter', stopSlideshow);
        advantageGrid.addEventListener('mouseleave', startSlideshow);
    }
});
