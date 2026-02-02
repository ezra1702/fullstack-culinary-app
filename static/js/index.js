window.addEventListener('load', function() {
        const loadingSpinner = document.querySelector('.loading-spinner');
        loadingSpinner.style.opacity = '0';
        loadingSpinner.style.visibility = 'hidden';
        
        // Remove spinner from DOM after fade out
        setTimeout(() => {
            loadingSpinner.remove();
        }, 300); // Match this with CSS transition duration
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('open');
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    menuOverlay.addEventListener('click', function() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Scroll down button in hero section
    const scrollDownBtn = document.querySelector('.scroll-down');
    scrollDownBtn.addEventListener('click', function() {
        window.scrollBy({
            top: window.innerHeight - 100,
            behavior: 'smooth'
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .recipe-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Fix for the incomplete testimonial card
    document.addEventListener('DOMContentLoaded', function() {
        const brokenTestimonial = document.querySelector('.testimonial-grid .testimonial-card:last-child .author-info');
        if (brokenTestimonial && !brokenTestimonial.innerHTML.trim()) {
            brokenTestimonial.innerHTML = `
                <h4>Priya Kapoor</h4>
                <p>Food Enthusiast, Joined 1 year ago</p>
            `;
        }
    });
        document.addEventListener('DOMContentLoaded', function() {
            const chatButton = document.getElementById('chatButton');
            const chatBox = document.getElementById('chatBox');
            const closeChat = document.querySelector('.close-chat');
            
            chatButton.addEventListener('click', () => {
                chatBox.classList.toggle('active');
            });
            
            closeChat.addEventListener('click', () => {
                chatBox.classList.remove('active');
            });
            
            // Auto-open chat after 30 seconds
            setTimeout(() => {
                if (!chatBox.classList.contains('active')) {
                    chatBox.classList.add('active');
                }
            }, 30000);
        });