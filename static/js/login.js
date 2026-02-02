// Hide loading spinner when page is loaded
        window.addEventListener('load', function() {
            const loadingSpinner = document.querySelector('.loading-spinner');
            loadingSpinner.style.opacity = '0';
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
            }, 300);
        });

        // Form submission
        const loginForm = document.querySelector('.login-form');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('remember').checked;

            // Simulate loading
            const spinner = document.querySelector('.loading-spinner');
            spinner.style.display = 'flex';
            spinner.style.opacity = '1';

            // Simulate API call with delay
            setTimeout(() => {
                spinner.style.opacity = '0';
                setTimeout(() => {
                    spinner.style.display = 'none';
                    
                    // Check credentials (user: budi, pass: 123)
                    if (email === 'budi' && password === '123') {
                        // Show success animation
                        const successAnimation = document.getElementById('success-animation');
                        successAnimation.classList.add('active');
                        
                        // Redirect after showing success animation
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 1000);
                    } else if (email === 'anto' && password === '456') {
                        // Show success animation
                        const successAnimation = document.getElementById('success-animation');
                        successAnimation.classList.add('active');
                        
                        // Redirect after showing success animation
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 1000);
                    } else {
                        // Show failed animation
                        const failedAnimation = document.getElementById('failed-animation');
                        failedAnimation.classList.add('active');
                        
                        // Hide failed animation after 3 seconds
                        setTimeout(() => {
                            failedAnimation.classList.remove('active');
                        }, 1000);
                    }
                }, 300);
            }, 1000);
        });

        // Social login buttons
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const platform = this.classList.contains('google') ? 'Google' : 
                               this.classList.contains('facebook') ? 'Facebook' : 'Apple';
                               
                alert(`Logging in with ${platform} - This would normally redirect to ${platform} authentication`);
            });
        });

        // Dark mode toggle (optional - you can reuse from main page)
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        }

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }