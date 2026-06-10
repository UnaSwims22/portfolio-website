document.addEventListener('DOMContentLoaded', function () {
    initializeSectionNavigation();
    initializeSmoothScroll();

    console.log('case study script loaded');
});

function initializeSectionNavigation() {
    const navLinks = document.querySelectorAll('.case-study-nav-link:not(.back-link)');
    const sections = document.querySelectorAll('.case-study-section');
    
    if (navLinks.length === 0 || sections.length === 0) {
        return;
    }
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 200;
        let currentSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.id;
            }
        });
        

        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
       
        if (currentSection) {
            const activeLink = document.querySelector(
                `.case-study-nav-link[data-section="${currentSection}"]`
            );
            
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.case-study-nav-link:not(.back-link)');
    
    if (navLinks.length === 0) {
        return;
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - 120;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                
                setTimeout(function() {
                    // Remove active class from all links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    
                    this.classList.add('active');
                }.bind(this), 100);
            }
        });
    });
}

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length === 0) {
        return;
    }
  
    const observerCallback = function(entries) {
        
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
   
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeScrollReveal();
});

function addScrollRevealStyles() {
    if (document.getElementById('scroll-reveal-styles')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'scroll-reveal-styles';
    

    style.textContent = `
        /* ========================================
           SCROLL REVEAL ANIMATIONS
           ======================================== */
        
        /* Elements with scroll-reveal class */
        .scroll-reveal {
            /* Initial state: invisible and offset */
            opacity: 0;
            transform: translateY(30px);
            /* Transition for smooth animation */
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        /* Revealed state: visible and in place */
        .scroll-reveal.revealed {
            /* Final state: visible and at normal position */
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Respect prefers-reduced-motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .scroll-reveal {
                /* Disable animations for users who prefer reduced motion */
                transition: none;
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

addScrollRevealStyles();

function initializeStaggeredAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length === 0) {
        return;
    }
    
    revealElements.forEach((element, index) => {
        const delay = index * 30;
        element.style.transitionDelay = delay + 'ms';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeStaggeredAnimations();
});

function initializeMobileNavToggle() {
    const caseStudyNav = document.querySelector('.case-study-nav');
    
    if (!caseStudyNav) {
        return;
    }
    

    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        caseStudyNav.style.display = 'none';
    }
    
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            caseStudyNav.style.display = 'none';
        } else {
            caseStudyNav.style.display = 'block';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeMobileNavToggle();
});

function enhanceSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    if (anchorLinks.length === 0) {
        return;
    }
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const targetPosition = targetElement.offsetTop - 120;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    enhanceSmoothScroll();
});
