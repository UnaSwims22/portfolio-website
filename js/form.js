document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    document.querySelectorAll('.error-message').forEach(function (el) {
        el.style.display = 'none';
        el.textContent = '';
    });

    [nameField, emailField, messageField].forEach(function (field) {
            field.style.borderColor = '';
            field.style.backgroundColor = '';
    });

    if (!nameField.value.trim()) {
        showError(nameField, 'Please enter your name');
        return;
    }

    if (!emailField.value.trim()) {
        showError(emailField, 'Please enter your email');
        return;
    }

    if (!isValidEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
        return;
    }

    if (!messageField.value.trim()) {
        showError(messageField, 'Please enter a message');
        return;
    }

       showSuccessMessage();
       contactForm.reset();
   });
});



function showError(field, message) {
    const errorEl = field.parentElement.querySelector('.error-message');
    if (!errorEl) return;
      
    errorEl.textContent = message;
    errorEl.style.display = 'block';
   
    field.style.borderColor = 'var(--color-error)';
    field.style.backgroundColor = 'rgba(244, 67, 54, 0.05)';
    
    field.addEventListener('input', function() {
        field.style.borderColor = '';
        field.style.backgroundColor = '';
        errorEl.style.display = 'none';
    }, { once: true });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
    
    
function showSuccessMessage() {
    const successMsg = document.getElementById('successMessage');
    if (!successMsg) return;
      
    successMsg.style.display = 'block';
    successMsg.style.opacity = '0';
    successMsg.style.animation = 'fadeIn 0.3s ease-out forwards';
      
    
    setTimeout(function () {
    successMsg.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(function () {
        successMsg.style.display = 'none';
    }, 300);
    }, 5000);
}




    

