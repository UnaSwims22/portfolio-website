const nav_items = [
    {label: 'Home', href: '/portfolio-website/index.html'},
    {label: 'Work', href: '/portfolio-website/html/work.html'},
    {label: 'About', href: '/portfolio-website/html/about.html'},
    {label: 'Contact', href: '/portfolio-website/html/contact.html'},
];

function resolveHref(rootRelativeHref) {
    const currentPath = window.location.pathname;
    const depth = (currentPath.match(/\//g) || []).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
 
    return prefix + rootRelativeHref;
}




function buildNavHTML() {
    const links = nav_items
    .map(function (item){
        const href = resolveHref(item.href);
        return '<a href="' + href + '" class="nav-link" data-root-href="' + item.href + '">'
        + item.label
        + '</a>';
    }).join('');

    return ''
        + '<nav id="main-nav">'
        +   '<div class="nav-wrapper">'
        +     '<div class="pill-container" id="nav-pill">'
        +       links
        +     '</div>'
        +     '<button class="mobile-menu-toggle" id="mobile-toggle" '
        +             'aria-label="Toggle navigation menu" aria-expanded="false">'
        +       '<span></span>'
        +       '<span></span>'
        +       '<span></span>'
        +     '</button>'
 
        +   '</div>'
        + '</nav>';

} 


function injectNav() {
        const root = document.getElementById('nav-root');

        if (root) {
            root.innerHTML = buildNavHTML();
        } else {
            document.body.insertAdjacentHTML('afterbegin', buildNavHTML());
        }
}

function setActiveLink() {
    const currentPath = window.location.pathname;
 
    document.querySelectorAll('.nav-link').forEach(function (link) {
        const rootHref = link.getAttribute('data-root-href');

        function normalise(path) {
            return path.replace(/^\//, '').replace(/\/$/, '').replace(/\.html$/, '');
        }
 
        const normCurrent = normalise(currentPath);
        const normHref    = normalise(rootHref);
        const isHome = (normCurrent === '' || normCurrent === 'index')
                    && (normHref    === '' || normHref    === 'index');
 
        const isActive = isHome || normCurrent.endsWith(normHref);
 
        link.classList.toggle('active', isActive);
        link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
}

function initScrollState() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
 
    function onScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }
 
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function initMobileToggle() {
    const toggle  = document.getElementById('mobile-toggle');
    const pill    = document.getElementById('nav-pill');
    if (!toggle || !pill) return;
 
    toggle.addEventListener('click', function () {
        const isOpen = pill.classList.toggle('open');
        toggle.classList.toggle('active', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    pill.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            pill.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

     window.addEventListener('resize', function () {
        if (window.innerWidth > 767) {
            pill.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
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
 
window.navigateTo    = navigateTo;
window.getCurrentPage = getCurrentPage;
window.isOnPage      = isOnPage;

document.addEventListener('DOMContentLoaded', function () {
    injectNav();
    setActiveLink();
    initScrollState();
    initMobileToggle();
});
 


    

