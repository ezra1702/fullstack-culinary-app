document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('userPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthBarInner = document.querySelector('.strength-bar-inner');
    const strengthText = document.getElementById('strengthText');
    const matchText = document.getElementById('matchText');
    const passwordMatchIndicator = document.querySelector('.password-match');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const successAnimation = document.getElementById('success-animation');
    const failedAnimation = document.getElementById('failed-animation');
    const errorMessage = document.getElementById('error-message');
    const googleSignInBtn = document.getElementById('googleSignInBtn');
    const facebookSignInBtn = document.getElementById('facebookSignInBtn');

    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
        FB.init({
            appId: 'YOUR_FACEBOOK_APP_ID', // Ganti dengan Facebook App ID Anda
            cookie: true,
            xfbml: true,
            version: 'v18.0'
        });
    };

    // Password strength checker
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);
        
        // Update strength bar
        strengthBarInner.style.width = strength.width;
        strengthBarInner.style.backgroundColor = strength.color;
        
        // Update strength text
        strengthText.textContent = strength.text;
        strengthText.style.color = strength.color;
        
        // Check password match
        checkPasswordMatch();
    });

    // Password match checker
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);

    function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword === '') {
            passwordMatchIndicator.style.opacity = '0';
            return;
        }
        
        if (password === confirmPassword && password.length > 0) {
            passwordMatchIndicator.classList.remove('error');
            passwordMatchIndicator.classList.add('success');
            passwordMatchIndicator.style.opacity = '1';
            passwordMatchIndicator.querySelector('i').className = 'fas fa-check-circle';
            matchText.textContent = 'Password cocok';
        } else {
            passwordMatchIndicator.classList.remove('success');
            passwordMatchIndicator.classList.add('error');
            passwordMatchIndicator.style.opacity = '1';
            passwordMatchIndicator.querySelector('i').className = 'fas fa-times-circle';
            matchText.textContent = 'Password tidak cocok';
        }
    }

    function checkPasswordStrength(password) {
        let score = 0;
        
        // Length check
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        
        // Complexity checks
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        // Determine strength level
        if (score === 0) return { width: '10%', color: '#ff4444', text: 'Sangat Lemah' };
        if (score === 1) return { width: '30%', color: '#ff4444', text: 'Lemah' };
        if (score === 2) return { width: '50%', color: '#ffaa00', text: 'Cukup' };
        if (score === 3) return { width: '70%', color: '#ffff00', text: 'Baik' };
        if (score === 4) return { width: '90%', color: '#99ff00', text: 'Kuat' };
        if (score >= 5) return { width: '100%', color: '#4bb71b', text: 'Sangat Kuat' };
    }

    // Form validation
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        input.classList.add('error');
        input.classList.remove('success');
        
        // Show error message in tooltip
        input.title = message;
    }

    function showSuccess(inputId) {
        const input = document.getElementById(inputId);
        input.classList.remove('error');
        input.classList.add('success');
        input.title = '';
    }

    // Real-time validation
    const inputsToValidate = ['firstName', 'lastName', 'userEmail', 'userPhone'];
    
    inputsToValidate.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('blur', function() {
            validateField(inputId);
        });
    });

    function validateField(inputId) {
        const input = document.getElementById(inputId);
        const value = input.value.trim();
        
        switch(inputId) {
            case 'firstName':
            case 'lastName':
                if (value.length < 2) {
                    showError(inputId, 'Minimal 2 karakter');
                    return false;
                }
                break;
            case 'userEmail':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(inputId, 'Email tidak valid');
                    return false;
                }
                break;
            case 'userPhone':
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
                if (!phoneRegex.test(value)) {
                    showError(inputId, 'Nomor telepon tidak valid');
                    return false;
                }
                break;
        }
        
        showSuccess(inputId);
        return true;
    }

    // Form submission
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'userEmail', 'userPhone'];
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                showError(field, 'Field ini wajib diisi');
                isValid = false;
            } else {
                if (validateField(field)) {
                    showSuccess(field);
                } else {
                    isValid = false;
                }
            }
        });
        
        // Validate email format
        const email = document.getElementById('userEmail').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('userEmail', 'Email tidak valid');
            isValid = false;
        }
        
        // Validate password
        const password = passwordInput.value;
        if (password.length < 8) {
            showError('userPassword', 'Minimal 8 karakter');
            isValid = false;
        }
        
        // Validate password match
        if (password !== confirmPasswordInput.value) {
            showError('confirmPassword', 'Password tidak cocok');
            isValid = false;
        }
        
        // Validate terms
        if (!document.getElementById('terms').checked) {
            alert('Anda harus menyetujui Syarat Layanan dan Kebijakan Privasi');
            isValid = false;
        }
        
        if (!isValid) {
            showFailedAnimation('Harap perbaiki kesalahan di atas');
            return;
        }
        
        // Show loading spinner
        loadingSpinner.classList.add('active');
        
        // Prepare data
        const userData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('userEmail').value,
            phone: document.getElementById('userPhone').value,
            password: password,
            registrationMethod: 'manual'
        };
        
        try {
            // Simulate API call (replace with actual API call)
            const response = await simulateApiCall(userData);
            
            loadingSpinner.classList.remove('active');
            
            if (response.success) {
                showSuccessAnimation();
                
                // Redirect to login page after success
                setTimeout(() => {
                    window.location.href = '/login?registered=true';
                }, 2000);
            } else {
                showFailedAnimation(response.message || 'Registrasi gagal');
            }
        } catch (error) {
            loadingSpinner.classList.remove('active');
            showFailedAnimation('Terjadi kesalahan. Silakan coba lagi.');
            console.error('Registration error:', error);
        }
    });

    // Simulate API call
    async function simulateApiCall(userData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate success (replace with actual API logic)
                const isSuccess = Math.random() > 0.3; // 70% success rate
                
                if (isSuccess) {
                    // Save to localStorage (for demo purposes)
                    const users = JSON.parse(localStorage.getItem('users') || '[]');
                    users.push({
                        ...userData,
                        id: Date.now(),
                        createdAt: new Date().toISOString()
                    });
                    localStorage.setItem('users', JSON.stringify(users));
                    
                    resolve({
                        success: true,
                        message: 'Registrasi berhasil!'
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Email sudah terdaftar'
                    });
                }
            }, 1500);
        });
    }

    // Google Sign In
    googleSignInBtn.addEventListener('click', function() {
        loadingSpinner.classList.add('active');
        
        // Initialize Google Sign In
        const clientId = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'; // Ganti dengan Client ID Anda
        
        // Create Google OAuth URL
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${clientId}&` +
            `redirect_uri=${encodeURIComponent(window.location.origin)}&` +
            `response_type=code&` +
            `scope=email profile&` +
            `access_type=offline&` +
            `state=google_signup`;
        
        // For demo purposes, simulate Google sign up
        setTimeout(() => {
            loadingSpinner.classList.remove('active');
            
            // Simulate Google user data
            const googleUser = {
                firstName: 'Google',
                lastName: 'User',
                email: 'googleuser@example.com',
                phone: '',
                password: 'google-auth-' + Date.now(),
                registrationMethod: 'google'
            };
            
            // Auto-fill form with Google data
            document.getElementById('firstName').value = googleUser.firstName;
            document.getElementById('lastName').value = googleUser.lastName;
            document.getElementById('userEmail').value = googleUser.email;
            
            showSuccessAnimation();
            setTimeout(() => {
                alert('Informasi dari Google telah diisi. Silakan lengkapi nomor telepon dan klik "Daftar Sekarang".');
            }, 500);
            
            // In production, you would:
            // 1. Redirect to Google OAuth
            // 2. Handle callback
            // 3. Get user data from Google API
            // 4. Auto-fill form or create account automatically
            
        }, 1000);
    });

    // Facebook Sign In
    facebookSignInBtn.addEventListener('click', function() {
        loadingSpinner.classList.add('active');
        
        // For demo purposes, simulate Facebook sign up
        setTimeout(() => {
            loadingSpinner.classList.remove('active');
            
            // Simulate Facebook user data
            const facebookUser = {
                firstName: 'Facebook',
                lastName: 'User',
                email: 'facebookuser@example.com',
                phone: '',
                password: 'facebook-auth-' + Date.now(),
                registrationMethod: 'facebook'
            };
            
            // Auto-fill form with Facebook data
            document.getElementById('firstName').value = facebookUser.firstName;
            document.getElementById('lastName').value = facebookUser.lastName;
            document.getElementById('userEmail').value = facebookUser.email;
            
            showSuccessAnimation();
            setTimeout(() => {
                alert('Informasi dari Facebook telah diisi. Silakan lengkapi nomor telepon dan klik "Daftar Sekarang".');
            }, 500);
            
            // In production, you would use Facebook SDK:
            // FB.login(function(response) {
            //     if (response.authResponse) {
            //         // Get user info
            //         FB.api('/me', { fields: 'name,email' }, function(userInfo) {
            //             // Auto-fill form
            //         });
            //     }
            // }, { scope: 'email,public_profile' });
            
        }, 1000);
    });

    // Animation functions
    function showSuccessAnimation() {
        successAnimation.classList.add('active');
        
        // Hide after 2 seconds
        setTimeout(() => {
            successAnimation.classList.remove('active');
        }, 2000);
    }

    function showFailedAnimation(message = 'Registrasi gagal! Silakan coba lagi.') {
        errorMessage.textContent = message;
        failedAnimation.classList.add('active');
        
        // Hide after 3 seconds
        setTimeout(() => {
            failedAnimation.classList.remove('active');
        }, 3000);
    }

    // Initialize
    checkPasswordMatch();
});