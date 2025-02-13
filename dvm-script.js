document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousels
    initializeCarousels();

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentSlideIndex = 0;

        // Create dots
        const dotsContainer = carousel.parentElement.querySelector('.carousel-buttons .carousel-dots');
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        // Initialize image sliders within each slide
        slides.forEach(slide => {
            initializeImageSlider(slide.querySelector('.image-slider'));
        });

        function goToSlide(index) {
            slides[currentSlideIndex].classList.remove('active');
            dotsContainer.children[currentSlideIndex].classList.remove('active');

            currentSlideIndex = index;

            slides[currentSlideIndex].classList.add('active');
            dotsContainer.children[currentSlideIndex].classList.add('active');
        }

        const prevButton = carousel.parentElement.querySelector('.prev-slide-button');
        const nextButton = carousel.parentElement.querySelector('.next-slide-button');

        prevButton.addEventListener('click', () => {
            goToSlide((currentSlideIndex - 1 + slides.length) % slides.length);
        });

        nextButton.addEventListener('click', () => {
            goToSlide((currentSlideIndex + 1) % slides.length);
        });
    });
}

function initializeImageSlider(slider) {
    if (!slider) return;

    const images = Array.from(slider.querySelectorAll('img'));
    const prevButton = slider.querySelector('.prev-image');
    const nextButton = slider.querySelector('.next-image');
    let currentImageIndex = 0;
    let autoAdvanceInterval;

    function showImage(index) {
        // Remove active class from all images
        images.forEach(img => img.classList.remove('active'));

        // Calculate the new index ensuring it wraps around
        currentImageIndex = ((index % images.length) + images.length) % images.length;

        // Add active class to new current image
        images[currentImageIndex].classList.add('active');
    }

    function handlePrevClick(e) {
        e.preventDefault();
        e.stopPropagation();
        clearInterval(autoAdvanceInterval);
        showImage(currentImageIndex - 1);
    }

    function handleNextClick(e) {
        e.preventDefault();
        e.stopPropagation();
        clearInterval(autoAdvanceInterval);
        showImage(currentImageIndex + 1);
    }

    // Remove any existing event listeners (if any)
    if (prevButton) {
        prevButton.replaceWith(prevButton.cloneNode(true));
        const newPrevButton = slider.querySelector('.prev-image');
        newPrevButton.addEventListener('click', handlePrevClick, false);
    }

    if (nextButton) {
        nextButton.replaceWith(nextButton.cloneNode(true));
        const newNextButton = slider.querySelector('.next-image');
        newNextButton.addEventListener('click', handleNextClick, false);
    }

    // Initialize
    showImage(0);

    // Return cleanup function
    return () => {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
    };
}

// Add smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Only apply smooth scroll for same-page links
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add header shadow on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle (if you add a mobile menu button later)
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
}

// Optional: Add touch support for image sliders
function addTouchSupport(slider) {
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swipe left, show next image
                slider.querySelector('.next-image').click();
            } else {
                // Swipe right, show previous image
                slider.querySelector('.prev-image').click();
            }
        }
    }
}

// Initialize touch support for all image sliders
document.querySelectorAll('.image-slider').forEach(addTouchSupport);

// Dynamically update the year in the footer
document.getElementById('current-year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    const yearButtons = document.querySelectorAll('.year-button');
    const galleries = document.querySelectorAll('.gallery');

    function showGallery(year) {
        galleries.forEach(gallery => {
            gallery.classList.remove('active');
            if (gallery.dataset.year === year) {
                gallery.classList.add('active');
            }
        });
    }

    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            yearButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const year = this.dataset.year;
            showGallery(year);
        });
    });
});