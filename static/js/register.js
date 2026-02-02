document.addEventListener('DOMContentLoaded', function() {
    // 1. Inisialisasi Elemen Form
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('userPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthBarInner = document.querySelector('.strength-bar-inner');
    const strengthText = document.getElementById('strengthText');
    const matchText = document.getElementById('matchText');
    const passwordMatchIndicator = document.querySelector('.password-match');
    const loadingSpinner = document.querySelector('.loading-spinner');

    // 2. Fungsi Cek Kekuatan Password (Real-time Visual)
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);
        
        if (strengthBarInner) {
            strengthBarInner.style.width = strength.width;
            strengthBarInner.style.backgroundColor = strength.color;
            strengthText.textContent = strength.text;
            strengthText.style.color = strength.color;
        }
        checkPasswordMatch();
    });

    // 3. Fungsi Cek Password Match (Real-time Visual)
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);

    function checkPasswordMatch() {
        const p1 = passwordInput.value;
        const p2 = confirmPasswordInput.value;
        
        if (p2 === '') {
            passwordMatchIndicator.style.opacity = '0';
            return;
        }
        
        passwordMatchIndicator.style.opacity = '1';
        if (p1 === p2 && p1.length > 0) {
            passwordMatchIndicator.className = 'password-match success';
            passwordMatchIndicator.querySelector('i').className = 'fas fa-check-circle';
            matchText.textContent = 'Password cocok';
        } else {
            passwordMatchIndicator.className = 'password-match error';
            passwordMatchIndicator.querySelector('i').className = 'fas fa-times-circle';
            matchText.textContent = 'Password tidak cocok';
        }
    }

    function checkPasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        if (score <= 1) return { width: '25%', color: '#ff4444', text: 'Lemah' };
        if (score === 2) return { width: '50%', color: '#ffaa00', text: 'Cukup' };
        if (score === 3) return { width: '75%', color: '#ffff00', text: 'Baik' };
        return { width: '100%', color: '#4bb71b', text: 'Sangat Kuat' };
    }

    // 4. Handle Submit ke Django (Bukan API Dummy lagi)
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            // Validasi Frontend Sebelum Kirim
            let isValid = true;
            const p1 = passwordInput.value;
            const p2 = confirmPasswordInput.value;

            // Cek Kesamaan Password
            if (p1 !== p2) {
                alert('Password tidak cocok, Ezra!');
                isValid = false;
            }

            // Cek Panjang Password
            if (p1.length < 8) {
                alert('Password minimal 8 karakter!');
                isValid = false;
            }

            // Cek Terms
            if (!document.getElementById('terms').checked) {
                alert('Anda harus menyetujui Syarat Layanan!');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault(); // Gagalkan pengiriman ke Django
            } else {
                // Jika VALID, munculkan spinner dan biarkan Django bekerja
                if (loadingSpinner) loadingSpinner.classList.add('active');
                // Form akan otomatis terkirim ke action="{% url 'submit' %}"
            }
        });
    }
});