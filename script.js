// Smooth Scrolling Intersection Observer for Animations
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(el => observer.observe(el));

    // Functional Appointment Buttons
    const bookApptBtns = document.querySelectorAll('.book-appt-btn');
    const nameInput = document.getElementById('nameInput');

    bookApptBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Give the browser time to complete the smooth scroll down to the form
            setTimeout(() => {
                nameInput.focus();
                // Optional: Flash a subtle background to draw the eye to the input
                nameInput.style.backgroundColor = '#fff0f0';
                setTimeout(() => {
                    nameInput.style.backgroundColor = '#fff';
                }, 800);
            }, 800); 
        });
    });
});

// Form Submission Handler
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! Your appointment request has been received. Our team will contact you shortly to confirm the time.');
    this.reset();
});

// Basic Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'flex';
    navLinks.style.display = isVisible ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = '#fff';
    navLinks.style.padding = '20px';
    navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
});