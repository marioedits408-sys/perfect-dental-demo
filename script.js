document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CURRENT YEAR IN FOOTER ---
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. FULLSCREEN MOBILE MENU TOGGLE ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const body = document.body;

    if(menuToggle && mobileOverlay) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if(mobileOverlay.classList.contains('active')) {
                body.classList.add('no-scroll');
            } else {
                body.classList.remove('no-scroll');
            }
        });

        // Close menu when a link is clicked
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }

    // --- 4. SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- 5. ANIMATED STATS COUNTER ---
    const counters = document.querySelectorAll('.counter');
    const counterOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const counterObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetVal = parseFloat(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const frameRate = 30; // ms per frame
                const totalFrames = Math.round(duration / frameRate);
                let currentFrame = 0;

                const counterInterval = setInterval(() => {
                    currentFrame++;
                    const progress = currentFrame / totalFrames;
                    // Easing function for smooth slowdown at the end
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentVal = targetVal * easeOutQuart;

                    if (targetVal % 1 !== 0) {
                        target.innerText = currentVal.toFixed(1); 
                    } else {
                        target.innerText = Math.round(currentVal); 
                    }

                    if (currentFrame === totalFrames) {
                        clearInterval(counterInterval);
                        target.innerText = targetVal;
                    }
                }, frameRate);

                observer.unobserve(target);
            }
        });
    }, counterOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // --- 6. FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items securely
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // --- 7. GALLERY LIGHTBOX ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.lightbox-close');

    if(galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(img => {
            img.parentElement.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                body.classList.add('no-scroll'); 
            });
        });

        const closeBox = () => {
            lightbox.classList.remove('active');
            body.classList.remove('no-scroll');
        };

        closeLightbox.addEventListener('click', closeBox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeBox();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeBox();
            }
        });
    }

    // --- 8. BOOKING FORM MOCK ---
    const bookingForm = document.getElementById('bookingForm');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Success! Your appointment request has been securely submitted. Our reception desk will contact you shortly.');
                bookingForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});