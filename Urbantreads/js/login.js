// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginFormWrapper = document.getElementById('loginFormWrapper');
    const registerFormWrapper = document.getElementById('registerFormWrapper');
    const registrationCompleteWrapper = document.getElementById('registrationCompleteWrapper');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    
    // Show registration form
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginFormWrapper.classList.add('d-none');
            registerFormWrapper.classList.remove('d-none');
        });
    }
    
    // Show login form
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerFormWrapper.classList.add('d-none');
            loginFormWrapper.classList.remove('d-none');
        });
    }
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Validate login
            if (!validateLoginForm(email, password)) {
                return;
            }
            
            // Process login
            processLogin(email, password, rememberMe);
        });
    }
    
    // Handle registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate registration
            if (!validateRegistrationForm(name, email, password, confirmPassword)) {
                return;
            }
            
            // Process registration
            processRegistration(name, email, password);
        });
    }
});

// Validate login form
function validateLoginForm(email, password) {
    // Validate email
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Validate password
    if (!password) {
        showNotification('Please enter your password', 'error');
        return false;
    }
    
    return true;
}

// Validate registration form
function validateRegistrationForm(name, email, password, confirmPassword) {
    // Validate name
    if (!name) {
        showNotification('Please enter your name', 'error');
        return false;
    }
    
    // Validate email
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Validate password
    if (!password) {
        showNotification('Please enter a password', 'error');
        return false;
    }
    
    // Password strength validation
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return false;
    }
    
    // Validate password confirmation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return false;
    }
    
    return true;
}

// Process login
function processLogin(email, password, rememberMe) {
    // In a real application, this would be an API call to your backend
    // For this demo, we'll simulate a successful login
    
    showNotification('Logging you in...', 'success');
    
    setTimeout(() => {
        // Create user object
        const userData = {
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1), // Capitalize first letter of email username
            email: email,
            isLoggedIn: true,
            firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            lastName: ''
        };
        
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect to home page
        window.location.href = 'home.html';
    }, 1500);
}

// Process registration
function processRegistration(name, email, password) {
    // In a real application, this would be an API call to your backend
    // For this demo, we'll simulate a successful registration
    
    showNotification('Creating your account...', 'success');
    
    setTimeout(() => {
        // Show registration complete message
        document.getElementById('registerFormWrapper').classList.add('d-none');
        document.getElementById('registrationCompleteWrapper').classList.remove('d-none');
        
        // Create user object
        const userData = {
            name: name,
            email: email,
            isLoggedIn: true,
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ')
        };
        
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
    }, 1500);
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}