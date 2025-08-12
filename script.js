// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll indicator functionality
    const scrollCircle = document.querySelector('.scroll-circle');
    
    scrollCircle.addEventListener('click', function() {
        const aboutSection = document.querySelector('.about');
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Get in touch button functionality
    const getInTouchBtn = document.querySelector('.get-in-touch-btn');
    
    getInTouchBtn.addEventListener('click', function() {
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });

    // LinkedIn button functionality
    const linkedinBtn = document.querySelector('.linkedin-btn');
    
    linkedinBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://linkedin.com/in/aakrisht-pachhai', '_blank');
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, #2d5016, #4a7c59)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #2d5016, #4a7c59)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .experience-item, .activity-item, .hobby-item, .language-item');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag, .design-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 15px rgba(255, 184, 77, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add click effect to software icons
    const softwareIcons = document.querySelectorAll('.software-icon');
    
    softwareIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        icon.style.transition = 'transform 0.15s ease';
        icon.style.cursor = 'pointer';
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const heroText = document.querySelector('.hero-text');
        
        if (heroImage && heroText) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroText.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Contact info click handlers
    const contactInfo = document.querySelectorAll('.contact-info p');
    
    contactInfo.forEach(info => {
        info.style.cursor = 'pointer';
        info.addEventListener('click', function() {
            const text = this.textContent;
            
            if (text.includes('@')) {
                // Email
                window.location.href = `mailto:${text.split(' ')[1]}`;
            } else if (text.includes('07')) {
                // Phone
                window.location.href = `tel:${text.split(' ')[1]}`;
            }
        });
        
        info.addEventListener('mouseenter', function() {
            this.style.color = '#ffb84d';
        });
        
        info.addEventListener('mouseleave', function() {
            this.style.color = 'white';
        });
    });

    // Reveal animation for hero elements
    const revealables = document.querySelectorAll('.will-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealables.forEach(el => revealObserver.observe(el));

    // Parallax on decorative overlay in hero
    const heroEl = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        if (!heroEl) return;
        const rect = heroEl.getBoundingClientRect();
        // Only apply while hero is in view
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
            const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
            const ty = (progress * 10 - 5).toFixed(2) + 'px';
            heroEl.style.setProperty('--overlay-ty', ty);
        }
    }, { passive: true });

    // Reveal on scroll and parallax for background overlay
    (function() {
        const onReady = (fn) => {
            if (document.readyState !== 'loading') fn();
            else document.addEventListener('DOMContentLoaded', fn);
        };

        onReady(() => {
            // Intersection Observer for reveal animations
            const revealEls = document.querySelectorAll('.will-reveal');
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-in');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            revealEls.forEach(el => io.observe(el));

            // Parallax effect for big 'FOLIO' overlay via CSS var
            const hero = document.querySelector('.hero');
            if (hero) {
                const onScroll = () => {
                    const rect = hero.getBoundingClientRect();
                    const viewportH = window.innerHeight || document.documentElement.clientHeight;
                    const progress = 1 - Math.min(Math.max(rect.top / viewportH, -1), 1); // -1..1
                    const translateY = Math.round(progress * 20); // px
                    hero.style.setProperty('--overlay-ty', translateY + 'px');
                };
                window.addEventListener('scroll', onScroll, { passive: true });
                onScroll();
            }

            // Scroll indicator click -> scroll to about
            const scrollBtn = document.querySelector('.scroll-circle');
            if (scrollBtn) {
                scrollBtn.addEventListener('click', () => {
                    const about = document.getElementById('about');
                    if (about) about.scrollIntoView({ behavior: 'smooth' });
                });
            }
        });
    })();
});
