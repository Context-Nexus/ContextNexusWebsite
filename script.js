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
    
    // Default to dark theme if no setting is saved
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('dark'); // Explicitly set dark mode for new visitors
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

    
    // --- NEW Feature 4: Hero Logo Parallax ---
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
});
