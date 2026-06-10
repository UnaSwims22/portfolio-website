const cursor = document.querySelector('.cursor');

let mouseX = 0;
let mouseY = 0;
let isMouseActive = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = (mouseX - 15) + 'px';
    cursor.style.right = 'auto';
    cursor.style.top = (mouseY - 15) + 'px';

    if (!isMouseActive) {
        isMouseActive = true;
        document.body.classList.add('mouse-active');
    }
});

document.addEventListener('mouseleave', () => {
    isMouseActive = false;
    document.body.classList.remove('mouse-active');
});

const interactiveElements = document.querySelectorAll('a, button, .project-card, .toggle');

interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.opacity = '0.8';
    });

    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.opacity = '1';
    });
});

let targetX = 0;
let targetY = 0;
const cursorSpeed = 0.2;

function animateCursor() {
    targetX += (mouseX - targetX) * cursorSpeed;
    targetY += (mouseY - targetY) * cursorSpeed;

    cursor.style.left = (targetX - 15) + 'px';
    cursor.style.top = (targetY - 15) + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();
console.log('cursor script loaded');
