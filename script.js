// This is the "observer". It watches for when elements with the 'fade-in' class enter the screen.
const observer = new IntersectionObserver((entries) => {
    // Loop over the elements it's watching
    entries.forEach((entry) => {
        // If the element is on the screen...
        if (entry.isIntersecting) {
            // ...add the 'visible' class to it, which triggers our CSS animation.
            entry.target.classList.add('visible');
        }
    });
});

// Find all the elements on the page that have the 'fade-in' class
const elementsToFadeIn = document.querySelectorAll('.fade-in');

// Tell the observer to start watching all of these elements
elementsToFadeIn.forEach((el) => observer.observe(el));