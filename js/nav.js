const nav_items = [
    {label: 'Home', href: 'index.html', id: 'home'},
    {label: 'Work', href: 'work.html', id: 'work'},
    {label: 'About', href: 'about.html', id: 'about'},
    {label: 'Contact', href: 'contact.html', id: 'contact'},
];

document.addEventListener('DOMContentLoaded', function () {
    const navHTML = createNavigation();
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    setupNavigationListeners();
    setActiveNavLink();
});

function createNavigation() {
    const menuItems = nav_items
    .map(item => `
        <li>
        <a href="${item.href}" class="nav-link" data-id="${item.id}">
          ${item.label}
        </a>
        </li>
    `)
    .join('');

    const navHTML = `
       <nav>
           <ul class="nav-menu">
           ${menuItems}
           </ul>
        
           <button class="mobile-menu-toggle" aria-label="Toggle menu">
             <span></span>
             <span></span>
             <span></span>
            </button>
         </div>
      </nav>
    `;

    return navHTML
}

function setupNavigationListeners() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
           link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
    });
}

function navigateTo(url) {
  window.location.href = url;
}

function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function isOnPage(pageName) {
  return getCurrentPage() === pageName;
}

window.navigateTo = navigateTo;
window.getCurrentPage = getCurrentPage;
window.isOnPage = isOnPage;