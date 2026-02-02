document.querySelectorAll('.toggle-password').forEach(icon => {
            icon.addEventListener('click', function() {
                const input = this.previousElementSibling;
                if (input.type === 'password') {
                    input.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            });
        });

document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                  this.classList.add('active');
                document.querySelectorAll('.settings-section').forEach(section => {
                    section.classList.remove('active');
                });
                    const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId + '-section').classList.add('active');
            });
        });

document.querySelector(".pengaturan").classList.add("active");