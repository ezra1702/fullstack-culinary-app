document.addEventListener('DOMContentLoaded', function() {
    // Current step
    let currentStep = 1;
    const totalSteps = 3;
    
    // Form elements
    const registerForm = document.getElementById('registerForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.step');
    
    // Password elements
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthBarInner = document.querySelector('.strength-bar-inner');
    const strengthText = document.getElementById('strengthText');
    const matchText = document.getElementById('matchText');
    const passwordMatchIndicator = document.querySelector('.password-match');
    
    // Loading & feedback
    const loadingSpinner = document.querySelector('.loading-spinner');
    const successAnimation = document.getElementById('success-animation');
    const failedAnimation = document.getElementById('failed-animation');
    const errorMessage = document.getElementById('error-message');
    
    // File upload elements
    const ktpUploadArea = document.getElementById('ktpUploadArea');
    const fotoKtpInput = document.getElementById('foto_ktp');
    const ktpPreview = document.getElementById('ktpPreview');
    const cvUploadArea = document.getElementById('cvUploadArea');
    const fileCvInput = document.getElementById('file_cv');
    const cvPreview = document.getElementById('cvPreview');
    
    // Initialize form
    showStep(currentStep);
    
    // Step navigation functions - EKSPOR KE WINDOW OBJECT
    window.nextStep = function() {
        console.log('Next step clicked, current step:', currentStep);
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
                return true;
            }
        }
        return false;
    };
    
    window.prevStep = function() {
        console.log('Prev step clicked, current step:', currentStep);
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            return true;
        }
        return false;
    };
    
    // Function to show specific step
    function showStep(stepNumber) {
        console.log('Showing step:', stepNumber);
        steps.forEach(step => {
            step.classList.remove('active');
        });
        const currentStepElement = document.getElementById(`step${stepNumber}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        progressSteps.forEach((step, index) => {
            const stepNumberAttr = parseInt(step.getAttribute('data-step'));
            if (stepNumberAttr <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        window.scrollTo({
            top: registerForm.offsetTop - 100,
            behavior: 'smooth'
        });
        updateFormHeight();
    }
    
    function updateFormHeight() {
        const activeStep = document.querySelector('.form-step.active');
        if (activeStep && registerForm) {
            registerForm.style.minHeight = activeStep.offsetHeight + 'px';
        }
    }

    // Validate current step
    function validateCurrentStep() {
        let isValid = true;
        const errorMessages = [];
        
        if (currentStep === 1) {
            console.log('Validating step 1');
            const requiredFields = ['namaDepan', 'email', 'telp', 'password'];
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    errorMessages.push(`${field} harus diisi`);
                    isValid = false;
                } else {
                    showSuccess(input);
                }
            });
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value && !emailRegex.test(email.value)) {
                errorMessages.push('Format email tidak valid');
                isValid = false;
            }
            const telp = document.getElementById('telp');
            const phoneRegex = /^\+?[1-9]\d{9,14}$/;
            if (telp.value && !phoneRegex.test(telp.value)) {
                errorMessages.push('Format nomor telepon tidak valid');
                isValid = false;
            }
            const password = document.getElementById('password');
            if (password.value && password.value.length < 8) {
                errorMessages.push('Password minimal 8 karakter');
                isValid = false;
            }
            const confirmPassword = document.getElementById('confirmPassword');
            if (password.value !== confirmPassword.value) {
                errorMessages.push('Password tidak cocok');
                isValid = false;
            }
        } else if (currentStep === 2) {
            console.log('Validating step 2');
            const noKtp = document.getElementById('no_ktp');
            if (!noKtp.value.trim()) {
                errorMessages.push('Nomor KTP harus diisi');
                isValid = false;
            } else if (!/^\d{16}$/.test(noKtp.value)) {
                errorMessages.push('Nomor KTP harus 16 digit');
                isValid = false;
            } else {
                showSuccess(noKtp);
            }
            if (!fotoKtpInput.files[0]) {
                ktpUploadArea.style.borderColor = 'var(--error-color)';
                errorMessages.push('Foto KTP harus diupload');
                isValid = false;
            } else {
                ktpUploadArea.style.borderColor = '';
            }
            if (!fileCvInput.files[0]) {
                cvUploadArea.style.borderColor = 'var(--error-color)';
                errorMessages.push('CV harus diupload');
                isValid = false;
            } else {
                cvUploadArea.style.borderColor = '';
            }
        } else if (currentStep === 3) {
            console.log('Validating step 3');
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                const termsLabel = termsCheckbox.closest('.checkbox-label');
                termsLabel.style.color = 'var(--error-color)';
                errorMessages.push('Harus menyetujui syarat dan ketentuan');
                isValid = false;
            } else {
                const termsLabel = termsCheckbox.closest('.checkbox-label');
                termsLabel.style.color = '';
            }
        }
        if (!isValid && errorMessages.length > 0) {
            showFailedAnimation(errorMessages.join(', '));
        }
        return isValid;
    }

    // File upload handlers (Pake ID lo yang lama)
    ktpUploadArea.addEventListener('click', () => fotoKtpInput.click());
    ktpUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        ktpUploadArea.style.borderColor = 'var(--primary-color)';
        ktpUploadArea.style.backgroundColor = 'rgba(46, 139, 87, 0.1)';
    });
    ktpUploadArea.addEventListener('dragleave', () => {
        ktpUploadArea.style.borderColor = '';
        ktpUploadArea.style.backgroundColor = '';
    });
    ktpUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        ktpUploadArea.style.borderColor = '';
        ktpUploadArea.style.backgroundColor = '';
        if (e.dataTransfer.files[0]) {
            fotoKtpInput.files = e.dataTransfer.files;
            previewFile(e.dataTransfer.files[0], 'ktp');
        }
    });
    fotoKtpInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            previewFile(e.target.files[0], 'ktp');
            ktpUploadArea.style.borderColor = '';
        }
    });

    cvUploadArea.addEventListener('click', () => fileCvInput.click());
    cvUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        cvUploadArea.style.borderColor = 'var(--primary-color)';
        cvUploadArea.style.backgroundColor = 'rgba(46, 139, 87, 0.1)';
    });
    cvUploadArea.addEventListener('dragleave', () => {
        cvUploadArea.style.borderColor = '';
        cvUploadArea.style.backgroundColor = '';
    });
    cvUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        cvUploadArea.style.borderColor = '';
        cvUploadArea.style.backgroundColor = '';
        if (e.dataTransfer.files[0]) {
            fileCvInput.files = e.dataTransfer.files;
            previewFile(e.dataTransfer.files[0], 'cv');
        }
    });
    fileCvInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            previewFile(e.target.files[0], 'cv');
            cvUploadArea.style.borderColor = '';
        }
    });

    function previewFile(file, type) {
        const preview = type === 'ktp' ? ktpPreview : cvPreview;
        preview.innerHTML = '';
        preview.style.display = 'block';
        const maxSize = type === 'ktp' ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
        if (file.size > maxSize) {
            preview.innerHTML = `<div style="color: var(--error-color);"><div class="file-name">File terlalu besar</div></div>`;
            return;
        }
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        } else {
            const icon = document.createElement('i');
            icon.className = 'fas fa-file-pdf';
            icon.style.fontSize = '3rem';
            preview.appendChild(icon);
        }
    }

    // Dynamic inputs
    window.addInput = function(type) {
        const container = document.getElementById(`${type}Container`);
        const index = container.children.length;
        if (type === 'riwayat') {
            const div = document.createElement('div');
            div.className = 'riwayat-input-group';
            div.dataset.index = index;
            div.innerHTML = `
                <div class="form-row">
                    <div class="form-group half"><input type="text" name="kerja_posisi[]" class="riwayat-posisi" placeholder="Posisi"></div>
                    <div class="form-group half"><input type="text" name="kerja_tempat[]" class="riwayat-tempat" placeholder="Tempat"></div>
                </div>
                <button type="button" class="btn-remove-input" onclick="removeInput('${type}', ${index})"><i class="fas fa-times"></i></button>`;
            container.appendChild(div);
        } else {
            const div = document.createElement('div');
            div.className = 'input-group';
            div.innerHTML = `<input type="text" name="${type}[]" class="${type}-input" placeholder="Isi data..." data-index="${index}">
                             <button type="button" class="btn-remove-input" onclick="removeInput('${type}', ${index})"><i class="fas fa-times"></i></button>`;
            container.appendChild(div);
        }
    };

    window.removeInput = function(type, index) {
        const container = document.getElementById(`${type}Container`);
        const elementToRemove = container.querySelector(`[data-index="${index}"]`) || container.children[index];
        if (elementToRemove) container.removeChild(elementToRemove);
    };

    // Password Visual Logic
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const score = (password.length >= 8) + (/[A-Z]/.test(password)) + (/[0-9]/.test(password));
        const colors = ['#ff4444', '#ffaa00', '#4bb71b'];
        const widths = ['33%', '66%', '100%'];
        if (strengthBarInner) {
            strengthBarInner.style.width = widths[score-1] || '0%';
            strengthBarInner.style.backgroundColor = colors[score-1] || '#ddd';
        }
        checkPasswordMatch();
    });

    confirmPasswordInput.addEventListener('input', checkPasswordMatch);

    function checkPasswordMatch() {
        if (passwordInput.value === confirmPasswordInput.value && passwordInput.value !== '') {
            passwordMatchIndicator.style.opacity = '1';
            matchText.textContent = 'Password cocok';
        } else {
            passwordMatchIndicator.style.opacity = '0';
        }
    }

    // ==========================================
    // FORM SUBMISSION (INI YANG KE MYSQL)
    // ==========================================
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Form submission started');

        // Validasi Akhir
        let allValid = true;
        for (let i = 1; i <= totalSteps; i++) {
            currentStep = i;
            if (!validateCurrentStep()) {
                allValid = false;
                showStep(i);
                break;
            }
        }

        if (!allValid) return;

        // Tampilkan Spinner
        if (loadingSpinner) loadingSpinner.classList.add('active');

        // Bungkus semua data (Teks & Files)
        const formData = new FormData(this);

        try {
            // Tembak ke Django URL
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });

            const result = await response.json();

            if (response.ok) {
                if (loadingSpinner) loadingSpinner.classList.remove('active');
                showSuccessAnimation();
                // Redirect ke dashboard/login
                setTimeout(() => {
                    window.location.href = result.redirect_url || '/login';
                }, 2000);
            } else {
                throw new Error(result.message || 'Registrasi gagal.');
            }
        } catch (error) {
            if (loadingSpinner) loadingSpinner.classList.remove('active');
            showFailedAnimation(error.message);
        }
    });

    // CSRF Helper
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function showSuccessAnimation() {
        if (successAnimation) successAnimation.classList.add('active');
    }

    function showFailedAnimation(message) {
        if (errorMessage) errorMessage.textContent = message;
        if (failedAnimation) failedAnimation.classList.add('active');
        setTimeout(() => failedAnimation.classList.remove('active'), 3000);
    }

    function showSuccess(input) {
        input.classList.add('success');
    }
});