function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
 
  if (revealElements.length === 0) {
    return;
  }
  
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };
  
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      
      if (entry.isIntersecting) {
       
        entry.target.classList.add('visible');
      }
    });
  };
  
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

function initStaggeredAnimation(containerSelector, itemSelector, delayMs = 100) {
  
  const container = document.querySelector(containerSelector);
  
  
  if (!container) {
    return;
  }
  
  
  const items = container.querySelectorAll(itemSelector);
  
  
  if (items.length === 0) {
    return;
  }
  
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };
  
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      
      if (entry.isIntersecting) {
        
        items.forEach((item, index) => {
          
          const delay = index * delayMs;
          
          
          item.style.animationDelay = `${delay}ms`;
          item.classList.add('animate-stagger');
        });
        
        
        observer.unobserve(entry.target);
      }
    });
  };
  
 
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  observer.observe(container);
}

function initFadeOnLoad() {
  
  const fadeElements = document.querySelectorAll('.fade-on-load');
  
  if (fadeElements.length === 0) {
    return;
  }
  
  
  fadeElements.forEach((element, index) => {
    const delay = index * 100;
  
    element.style.animationDelay = `${delay}ms`;
    
    element.classList.add('animate-fade-in');
  });
}

function initHeroAnimation() {
  const hero = document.querySelector('.hero');
  
  if (!hero) {
    return;
  }
  

  const heroLeft = hero.querySelector('.hero-left');
  const heroRight = hero.querySelector('.hero-right');
  
 
  if (heroLeft) {
    heroLeft.style.opacity = '0';
    heroLeft.style.transform = 'translateY(20px)';
    
    
    setTimeout(() => {
      heroLeft.style.transition = 'all 0.8s ease-out';
      heroLeft.style.opacity = '1';
      heroLeft.style.transform = 'translateY(0)';
    }, 100);
  }
  
  if (heroRight) {
    heroRight.style.opacity = '0';
    heroRight.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      heroRight.style.transition = 'all 0.8s ease-out';
      heroRight.style.opacity = '1';
      heroRight.style.transform = 'scale(1)';
    }, 300);
  }
}

function initSmoothScroll() {
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
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

function initCounterAnimation() {
 
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) {
    return;
  }
  
  function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    let current = 0;
    
    
    const increment = target / 50; 
   
    function updateCounter() {
      current += increment;
      
      if (current < target) {
        counter.textContent = Math.floor(current);
        
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }
    
    updateCounter();
  }
  

  const observerOptions = {
    threshold: 0.5,
  };
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        
        observer.unobserve(entry.target);
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

document.addEventListener('DOMContentLoaded', function() {
 
  initScrollReveal();
  initFadeOnLoad();
  initHeroAnimation();
  initSmoothScroll();
  initCounterAnimation();
  initStaggeredAnimation('.projects-grid', '.project-card', 100);
  initStaggeredAnimation('.skills-grid', '.skill-group', 80);
});


window.initScrollReveal = initScrollReveal;
window.initStaggeredAnimation = initStaggeredAnimation;
