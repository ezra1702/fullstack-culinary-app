// ===== HAMBURGER TOGGLE =====
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.querySelector('.admin-sidebar');
        const mainContent = document.querySelector('.admin-main');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('sidebar-active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                if (!sidebar.contains(e.target) && 
                    !hamburger.contains(e.target) && 
                    !e.target.closest('.admin-sidebar')) {
                    hamburger.classList.remove('active');
                    sidebar.classList.remove('active');
                    mainContent.classList.remove('sidebar-active');
                }
            }
        });
        
        // ===== MODAL FUNCTIONS =====
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target == modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        };
        
        // ===== TABLE SORTING =====
        const table = document.getElementById('userTable');
        const headers = table.querySelectorAll('th[data-sort]');
        
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const sortBy = header.getAttribute('data-sort');
                const isAsc = header.classList.contains('sort-asc');
                
                // Remove all sort classes
                headers.forEach(h => {
                    h.classList.remove('sort-asc', 'sort-desc');
                });
                
                // Set new sort direction
                if (isAsc) {
                    header.classList.add('sort-desc');
                } else {
                    header.classList.add('sort-asc');
                }
                
                // Sort table rows
                sortTable(sortBy, isAsc);
            });
        });
        
        function sortTable(column, ascending) {
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            rows.sort((a, b) => {
                let aValue, bValue;
                
                switch(column) {
                    case 'name':
                        aValue = a.querySelector('.user-name').textContent.toLowerCase();
                        bValue = b.querySelector('.user-name').textContent.toLowerCase();
                        break;
                    case 'email':
                        aValue = a.cells[1].textContent.toLowerCase();
                        bValue = b.cells[1].textContent.toLowerCase();
                        break;
                    case 'role':
                        aValue = a.cells[2].textContent.toLowerCase();
                        bValue = b.cells[2].textContent.toLowerCase();
                        break;
                    case 'status':
                        aValue = a.cells[3].textContent.toLowerCase();
                        bValue = b.cells[3].textContent.toLowerCase();
                        break;
                    case 'joined':
                        aValue = a.cells[4].textContent.toLowerCase();
                        bValue = b.cells[4].textContent.toLowerCase();
                        break;
                    default:
                        return 0;
                }
                
                if (aValue < bValue) return ascending ? -1 : 1;
                if (aValue > bValue) return ascending ? 1 : -1;
                return 0;
            });
            
            // Reorder rows
            rows.forEach(row => tbody.appendChild(row));
        }
        
        // ===== TABLE FILTERING =====
        const filterButtons = document.querySelectorAll('.filter-btn');
        const tableRows = document.querySelectorAll('#userTable tbody tr');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                tableRows.forEach(row => {
                    if (filter === 'all') {
                        row.style.display = '';
                    } else {
                        const role = row.getAttribute('data-role');
                        row.style.display = role === filter ? '' : 'none';
                    }
                });
            });
        });
        
        // ===== FORM TOGGLE =====
        function toggleMemberType() {
            const role = document.getElementById('userRole').value;
            const memberTypeGroup = document.getElementById('memberTypeGroup');
            
            if (role === 'murid') {
                memberTypeGroup.style.display = 'block';
            } else {
                memberTypeGroup.style.display = 'none';
            }
        }
        
        // ===== ROWS PER PAGE =====
        const rowsPerPageSelect = document.getElementById('rowsPerPage');
        rowsPerPageSelect.addEventListener('change', (e) => {
            const rowsPerPage = e.target.value;
            alert(`Rows per page changed to: ${rowsPerPage}`);
            // Implement pagination logic here
        });
        
        // ===== USER ACTIONS =====
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                const userName = row.querySelector('.user-name').textContent;
                
                if (confirm(`Hapus user ${userName}?`)) {
                    row.style.opacity = '0.5';
                    setTimeout(() => {
                        row.style.display = 'none';
                        alert(`${userName} berhasil dihapus!`);
                    }, 300);
                }
            });
        });
        
        document.querySelectorAll('.btn-success').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                const userName = row.querySelector('.user-name').textContent;
                
                if (confirm(`Upgrade ${userName} ke Premium?`)) {
                    alert(`${userName} berhasil diupgrade ke Premium!`);
                    const roleBadge = row.querySelector('.role-badge');
                    roleBadge.className = 'role-badge role-premium';
                    roleBadge.textContent = 'Murid Premium';
                }
            });
        });
        
        // ===== SUBMIT FORM =====
        function submitUserForm(event) {
            event.preventDefault();
            
            // Validation
            const password = document.getElementById('userPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password.length < 8) {
                alert('Password harus minimal 8 karakter!');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Password dan konfirmasi password tidak cocok!');
                return;
            }
            
            // Simulate form submission
            alert('User berhasil ditambahkan!');
            closeModal('addUserModal');
            
            // Reset form
            document.getElementById('addUserForm').reset();
        }
        
        // ===== INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', function() {
            // Animate stats cards
            document.querySelectorAll('.stat-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            // Prevent form submission on enter
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && e.target.type !== 'textarea') {
                    e.preventDefault();
                }
            });
        });
    document.querySelector(".admin_dashboard").classList.add("active");