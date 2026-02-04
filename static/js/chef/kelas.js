        // Sample Data for Classes (COPY FROM ORIGINAL - tetap sama)
        const sampleClasses = [
            {
                id: 1,
                title: "Masakan Italia Dasar",
                description: "Pelajari dasar-dasar masakan Italia dengan resep autentik dari berbagai daerah Italia. Mulai dari pasta, pizza, hingga dessert klasik. Dalam kelas ini, Anda akan mempelajari teknik-teknik memasak Italia yang autentik, mulai dari cara membuat pasta segar, saus tradisional, hingga hidangan penutup yang lezat.",
                thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
                category: "Masakan Italia",
                level: "pemula",
                status: "published",
                students: 42,
                progress: 85,
                startDate: "2024-03-01",
                endDate: "2024-04-15",
                curriculum: [
                    { type: "video", title: "Pengenalan Masakan Italia", duration: "15:30", description: "Video pengenalan tentang sejarah dan filosofi masakan Italia" },
                    { type: "pdf", title: "Bahan Dasar Italia", pages: 12, description: "Panduan lengkap bahan-bahan yang digunakan dalam masakan Italia" },
                    { type: "assignment", title: "Praktik Pasta Carbonara", description: "Tugas membuat pasta carbonara dengan teknik yang benar" },
                    { type: "quiz", title: "Kuis Materi Minggu 1", questions: 10, description: "Evaluasi pemahaman materi minggu pertama" }
                ],
                isPremium: true
            },
            {
                id: 2,
                title: "Advanced French Pastry",
                description: "Teknik pastry Prancis tingkat lanjut untuk profesional. Kuasai pembuatan croissant, macaron, dan patisserie klasik lainnya.",
                thumbnail: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
                category: "Baking",
                level: "mahir",
                status: "published",
                students: 18,
                progress: 92,
                startDate: "2024-03-15",
                endDate: "2024-05-30",
                curriculum: [
                    { type: "video", title: "Teknik Dasar Pastry", duration: "22:15" },
                    { type: "video", title: "Membuat Croissant Sempurna", duration: "35:20" },
                    { type: "pdf", title: "Resep Patisserie Klasik", pages: 25 }
                ],
                isPremium: true
            },
            {
                id: 3,
                title: "Masakan Tradisional Indonesia",
                description: "Jelajahi kekayaan kuliner Nusantara dari berbagai daerah dengan resep autentik dan teknik tradisional.",
                thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
                category: "Masakan Indonesia",
                level: "menengah",
                status: "draft",
                students: 0,
                progress: 0,
                startDate: "",
                endDate: "",
                curriculum: [],
                isPremium: false
            },
            {
                id: 4,
                title: "Sushi Masterclass",
                description: "Pelajari seni membuat sushi dari chef profesional Jepang. Teknik pemotongan ikan, pembuatan nasi sushi, dan penyajian yang elegan.",
                thumbnail: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
                category: "Masakan Asia",
                level: "menengah",
                status: "scheduled",
                students: 36,
                progress: 0,
                startDate: "2024-04-01",
                endDate: "2024-06-01",
                curriculum: [
                    { type: "video", title: "Sejarah dan Filosofi Sushi", duration: "18:45" },
                    { type: "pdf", title: "Panduan Bahan dan Peralatan", pages: 8 }
                ],
                isPremium: false
            },
            {
                id: 5,
                title: "Healthy Meal Prep",
                description: "Persiapan makanan sehat untuk gaya hidup aktif. Pelajari perencanaan menu, teknik memasak sehat, dan penyimpanan yang tepat.",
                thumbnail: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
                category: "Kesehatan",
                level: "pemula",
                status: "published",
                students: 58,
                progress: 45,
                startDate: "2024-02-15",
                endDate: "2024-03-30",
                curriculum: [
                    { type: "video", title: "Prinsip Nutrisi Dasar", duration: "20:10" },
                    { type: "video", title: "Teknik Meal Prep Efisien", duration: "25:30" },
                    { type: "assignment", title: "Rencana Makan Mingguan" },
                    { type: "quiz", title: "Kuis Nutrisi", questions: 15 }
                ],
                isPremium: false
            },
            {
                id: 6,
                title: "Artisan Bread Baking",
                description: "Teknik pembuatan roti artisan dengan fermentasi alami. Kuasai pembuatan sourdough, baguette, dan roti artisan lainnya.",
                thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
                category: "Baking",
                level: "menengah",
                status: "archived",
                students: 29,
                progress: 100,
                startDate: "2023-11-01",
                endDate: "2023-12-15",
                curriculum: [
                    { type: "video", title: "Pengenalan Ragi dan Fermentasi", duration: "28:15" },
                    { type: "pdf", title: "Resep Roti Artisan", pages: 18 },
                    { type: "assignment", title: "Praktik Sourdough Starter" }
                ],
                isPremium: false
            },
            {
                id: 7,
                title: "Street Food Asia",
                description: "Eksplorasi street food terpopuler dari berbagai negara Asia. Dari Thailand, Vietnam, hingga Korea dengan teknik otentik.",
                thumbnail: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
                category: "Masakan Asia",
                level: "menengah",
                status: "published",
                students: 33,
                progress: 68,
                startDate: "2024-02-01",
                endDate: "2024-03-31",
                curriculum: [
                    { type: "video", title: "Street Food Thailand", duration: "24:20" },
                    { type: "video", title: "Street Food Vietnam", duration: "19:45" },
                    { type: "article", title: "Sejarah Street Food Asia" },
                    { type: "assignment", title: "Praktik Pad Thai" }
                ],
                isPremium: true
            },
            {
                id: 8,
                title: "Dasar Memasak untuk Pemula",
                description: "Kelas dasar untuk pemula yang ingin belajar memasak. Teknik dasar, pengetahuan bahan, dan resep sederhana yang lezat.",
                thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80",
                category: "Dasar Memasak",
                level: "pemula",
                status: "published",
                students: 75,
                progress: 72,
                startDate: "2024-01-10",
                endDate: "2024-02-28",
                curriculum: [
                    { type: "video", title: "Teknik Memotong Dasar", duration: "16:30" },
                    { type: "video", title: "Metode Memasak Dasar", duration: "22:10" },
                    { type: "pdf", title: "Panduan Bahan Dapur", pages: 10 },
                    { type: "quiz", title: "Kuis Teknik Dasar", questions: 12 }
                ],
                isPremium: false
            }
        ];

        // Sample student data (COPY FROM ORIGINAL - tetap sama)
        const sampleStudents = [
            { id: 1, name: 'Ahmad Rizki', email: 'ahmad@example.com', joinDate: '2024-02-15', progress: 85, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'Aktif' },
            { id: 2, name: 'Siti Aisyah', email: 'aisyah@example.com', joinDate: '2024-02-16', progress: 92, avatar: 'https://randomuser.me/api/portraits/women/44.jpg', status: 'Aktif' },
            { id: 3, name: 'Budi Santoso', email: 'budi@example.com', joinDate: '2024-02-18', progress: 45, avatar: 'https://randomuser.me/api/portraits/men/67.jpg', status: 'Aktif' },
            { id: 4, name: 'Dewi Lestari', email: 'dewi@example.com', joinDate: '2024-02-20', progress: 78, avatar: 'https://randomuser.me/api/portraits/women/68.jpg', status: 'Aktif' },
            { id: 5, name: 'Eko Prasetyo', email: 'eko@example.com', joinDate: '2024-02-22', progress: 60, avatar: 'https://randomuser.me/api/portraits/men/75.jpg', status: 'Aktif' },
            { id: 6, name: 'Fitriani', email: 'fitri@example.com', joinDate: '2024-02-25', progress: 90, avatar: 'https://randomuser.me/api/portraits/women/26.jpg', status: 'Aktif' },
            { id: 7, name: 'Gunawan', email: 'gunawan@example.com', joinDate: '2024-02-28', progress: 30, avatar: 'https://randomuser.me/api/portraits/men/81.jpg', status: 'Aktif' },
            { id: 8, name: 'Hana Sari', email: 'hana@example.com', joinDate: '2024-03-01', progress: 65, avatar: 'https://randomuser.me/api/portraits/women/33.jpg', status: 'Aktif' }
        ];

        // Store classes in localStorage for persistence
        let classes = JSON.parse(localStorage.getItem('chefClasses')) || sampleClasses;
        
        // Store curriculum items temporarily during form editing
        let tempCurriculum = [];
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            checkURLParams();
            initializePage();
            setupEventListeners();
            renderClassesCards();
        });

        // Check URL parameters for class ID
        function checkURLParams() {
            const urlParams = new URLSearchParams(window.location.search);
            const classId = urlParams.get('id');
            
            if (classId) {
                showClassDetail(parseInt(classId));
            }
        }

        // Update URL without page reload
        function updateURL(classId) {
            const url = classId ? `?id=${classId}` : 'kelas.html';
            window.history.pushState({classId: classId}, '', url);
        }

        // Handle browser back/forward buttons
        window.addEventListener('popstate', function(event) {
            if (event.state && event.state.classId) {
                showClassDetail(event.state.classId);
            } else {
                showListView();
            }
        });
        
        function initializePage() {
            // Set active tab
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    switchTab(tabId);
                });
            });
            
            // Set up filter event listeners
            document.querySelectorAll('.filter-select').forEach(select => {
                select.addEventListener('change', filterClasses);
            });
            
            document.getElementById('search-input').addEventListener('input', filterClasses);
        }
        
        function setupEventListeners() {
            // Tambah Kelas Button
            document.getElementById('btn-tambah-kelas').addEventListener('click', showAddClassModal);
            document.getElementById('btn-empty-add')?.addEventListener('click', showAddClassModal);

            // Back to list button
            document.getElementById('back-to-list').addEventListener('click', function(e) {
                e.preventDefault();
                showListView();
                updateURL(null);
            });

            // Detail view buttons
            document.getElementById('detail-btn-edit').addEventListener('click', function() {
                const urlParams = new URLSearchParams(window.location.search);
                const classId = urlParams.get('id');
                if (classId) {
                    editClass(parseInt(classId));
                }
            });

            document.getElementById('detail-btn-delete').addEventListener('click', function() {
                const urlParams = new URLSearchParams(window.location.search);
                const classId = urlParams.get('id');
                if (classId) {
                    deleteClass(parseInt(classId), true);
                }
            });
            
            // Logout
            document.getElementById('logout-link').addEventListener('click', function(e) {
                e.preventDefault();
                Swal.fire({
                    title: 'Konfirmasi Keluar',
                    text: 'Apakah Anda yakin ingin keluar dari sistem?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Keluar',
                    cancelButtonText: 'Batal'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'login.html';
                    }
                });
            });
        }

        // Show list view
        function showListView() {
            document.getElementById('list-view').classList.remove('d-none');
            document.getElementById('detail-view').classList.add('d-none');
            renderClassesCards();
        }

        // Show class detail
        function showClassDetail(classId) {
            const classItem = classes.find(c => c.id === classId);
            if (!classItem) {
                Swal.fire('Error', 'Kelas tidak ditemukan', 'error');
                showListView();
                return;
            }

            // Hide list, show detail
            document.getElementById('list-view').classList.add('d-none');
            document.getElementById('detail-view').classList.remove('d-none');

            // Update detail content
            renderClassDetail(classItem);
        }

        // Render class detail
        function renderClassDetail(classItem) {
            // Thumbnail
            document.getElementById('detail-thumbnail').src = classItem.thumbnail;
            document.getElementById('detail-title').textContent = classItem.title;

            // Badges
            const metaBadges = document.getElementById('detail-meta-badges');
            metaBadges.innerHTML = '';

            const statusBadge = getStatusBadge(classItem.status);
            const levelBadge = getLevelBadge(classItem.level);

            metaBadges.innerHTML = `
                <span class="class-detail-badge">${statusBadge.text}</span>
                <span class="class-detail-badge">${levelBadge.text}</span>
                <span class="class-detail-badge">${classItem.category}</span>
                ${classItem.isPremium ? '<span class="class-detail-badge"><i class="fas fa-crown"></i> PREMIUM</span>' : ''}
            `;

            // Info Grid
            const infoGrid = document.getElementById('detail-info-grid');
            const startDate = classItem.startDate ? new Date(classItem.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
            const endDate = classItem.endDate ? new Date(classItem.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';

            infoGrid.innerHTML = `
                <div class="class-info-item">
                    <div class="class-info-icon"><i class="fas fa-users"></i></div>
                    <div class="class-info-label">Jumlah Murid</div>
                    <div class="class-info-value">${classItem.students} Murid</div>
                </div>
                <div class="class-info-item">
                    <div class="class-info-icon"><i class="fas fa-chart-bar"></i></div>
                    <div class="class-info-label">Progress</div>
                    <div class="class-info-value">${classItem.progress}%</div>
                </div>
                <div class="class-info-item">
                    <div class="class-info-icon"><i class="fas fa-calendar-plus"></i></div>
                    <div class="class-info-label">Tanggal Mulai</div>
                    <div class="class-info-value">${startDate}</div>
                </div>
                <div class="class-info-item">
                    <div class="class-info-icon"><i class="fas fa-calendar-check"></i></div>
                    <div class="class-info-label">Tanggal Selesai</div>
                    <div class="class-info-value">${endDate}</div>
                </div>
            `;

            // Description
            document.getElementById('detail-description').textContent = classItem.description;

            // Curriculum
            const curriculumList = document.getElementById('detail-curriculum');
            document.getElementById('detail-curriculum-count').textContent = `${classItem.curriculum?.length || 0} Materi`;

            if (classItem.curriculum && classItem.curriculum.length > 0) {
                curriculumList.innerHTML = classItem.curriculum.map(item => {
                    const iconMap = {
                        'video': 'fas fa-play-circle',
                        'pdf': 'fas fa-file-pdf',
                        'assignment': 'fas fa-tasks',
                        'quiz': 'fas fa-question-circle',
                        'article': 'fas fa-newspaper',
                        'link': 'fas fa-link'
                    };

                    let metaHTML = '';
                    if (item.duration) metaHTML += `<span><i class="fas fa-clock"></i> ${item.duration}</span>`;
                    if (item.pages) metaHTML += `<span><i class="fas fa-file"></i> ${item.pages} halaman</span>`;
                    if (item.questions) metaHTML += `<span><i class="fas fa-question"></i> ${item.questions} soal</span>`;

                    return `
                        <div class="curriculum-item">
                            <div class="curriculum-icon ${item.type}">
                                <i class="${iconMap[item.type] || 'fas fa-file'}"></i>
                            </div>
                            <div class="curriculum-info">
                                <h3 class="curriculum-title">${item.title}</h3>
                                ${item.description ? `<p style="font-size: 0.9rem; color: var(--text-light); margin: 5px 0;">${item.description}</p>` : ''}
                                <div class="curriculum-meta">${metaHTML}</div>
                            </div>
                        </div>
                    `;
                }).join('');
            } else {
                curriculumList.innerHTML = '<div class="empty-state-large"><i class="fas fa-book-open"></i><h3>Belum Ada Kurikulum</h3><p>Kurikulum untuk kelas ini belum ditambahkan.</p></div>';
            }

            // Students
            const studentsTable = document.getElementById('detail-students-table');
            document.getElementById('detail-students-count').textContent = `${sampleStudents.length} Murid`;

            studentsTable.innerHTML = sampleStudents.map(student => {
                const joinDate = new Date(student.joinDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                return `
                    <tr>
                        <td>
                            <div class="student-name-cell">
                                <img src="${student.avatar}" alt="${student.name}" class="student-avatar-small">
                                <div class="student-name-info">
                                    <h4>${student.name}</h4>
                                </div>
                            </div>
                        </td>
                        <td>${student.email}</td>
                        <td>${joinDate}</td>
                        <td>
                            <div style="min-width: 120px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.85rem;">
                                    <span>Progress</span>
                                    <span style="font-weight: 600;">${student.progress}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${student.progress}%"></div>
                                </div>
                            </div>
                        </td>
                        <td><span class="class-category-badge">${student.status}</span></td>
                    </tr>
                `;
            }).join('');
        }
        
        function switchTab(tabId) {
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
            
            // Update active tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
            
            // Render appropriate cards
            filterClasses();
        }
        
        function filterClasses() {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const categoryFilter = document.getElementById('filter-kategori').value;
            const levelFilter = document.getElementById('filter-level').value;
            const statusFilter = document.getElementById('filter-status').value;
            
            const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
            let filteredClasses = classes;
            
            // Apply tab filter
            switch(activeTab) {
                case 'tab-active':
                    filteredClasses = classes.filter(c => c.status === 'published' || c.status === 'scheduled');
                    break;
                case 'tab-draft':
                    filteredClasses = classes.filter(c => c.status === 'draft');
                    break;
                case 'tab-archived':
                    filteredClasses = classes.filter(c => c.status === 'archived');
                    break;
            }
            
            // Apply other filters
            if (searchTerm) {
                filteredClasses = filteredClasses.filter(c => 
                    c.title.toLowerCase().includes(searchTerm) || 
                    c.description.toLowerCase().includes(searchTerm) ||
                    c.category.toLowerCase().includes(searchTerm)
                );
            }
            
            if (categoryFilter) {
                filteredClasses = filteredClasses.filter(c => 
                    c.category.toLowerCase().includes(categoryFilter.toLowerCase())
                );
            }
            
            if (levelFilter) {
                filteredClasses = filteredClasses.filter(c => c.level === levelFilter);
            }
            
            if (statusFilter) {
                filteredClasses = filteredClasses.filter(c => c.status === statusFilter);
            }
            
            renderFilteredClasses(filteredClasses, activeTab);
        }
        
        function renderClassesCards() {
            const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
            let filteredClasses = classes;
            
            switch(activeTab) {
                case 'tab-active':
                    filteredClasses = classes.filter(c => c.status === 'published' || c.status === 'scheduled');
                    break;
                case 'tab-draft':
                    filteredClasses = classes.filter(c => c.status === 'draft');
                    break;
                case 'tab-archived':
                    filteredClasses = classes.filter(c => c.status === 'archived');
                    break;
            }
            
            renderFilteredClasses(filteredClasses, activeTab);
        }
        
        function renderFilteredClasses(filteredClasses, tabId) {
            const gridId = `grid-${tabId.replace('tab-', '')}-classes`;
            const emptyId = `empty-${tabId.replace('tab-', '')}`;
            const grid = document.getElementById(gridId);
            const emptyState = document.getElementById(emptyId);
            
            // Clear grid
            grid.innerHTML = '';
            
            if (filteredClasses.length === 0) {
                grid.style.display = 'none';
                emptyState.classList.remove('d-none');
                return;
            }
            
            // Show grid, hide empty state
            grid.style.display = 'grid';
            emptyState.classList.add('d-none');
            
            // Render class cards
            filteredClasses.forEach(classItem => {
                const card = createClassCard(classItem);
                grid.appendChild(card);
            });
        }
        
        function createClassCard(classItem) {
            // Format dates
            const startDate = classItem.startDate ? new Date(classItem.startDate).toLocaleDateString('id-ID') : '-';
            const endDate = classItem.endDate ? new Date(classItem.endDate).toLocaleDateString('id-ID') : '-';
            
            // Get status badge
            const statusBadge = getStatusBadge(classItem.status);
            
            // Get level badge
            const levelBadge = getLevelBadge(classItem.level);
            
            const card = document.createElement('div');
            card.className = 'class-card';
            card.setAttribute('data-class-id', classItem.id);
            
            card.innerHTML = `
                <div class="class-card-header">
                    <img src="${classItem.thumbnail}" alt="${classItem.title}" class="class-thumbnail">
                    <div class="class-badges">
                        <span class="class-status-badge ${statusBadge.class}">${statusBadge.text}</span>
                        ${classItem.isPremium ? '<span class="class-premium-badge"><i class="fas fa-crown"></i> PREMIUM</span>' : ''}
                    </div>
                </div>
                
                <div class="class-card-content">
                    <h3 class="class-title">${classItem.title}</h3>
                    <p class="class-description">${classItem.description}</p>
                    
                    <div class="class-meta">
                        <span class="class-category-badge">${classItem.category}</span>
                        <span class="class-level-badge ${levelBadge.class}">${levelBadge.text}</span>
                    </div>
                    
                    <div class="class-stats">
                        <div class="class-stat-item">
                            <div class="class-stat-value">${classItem.students}</div>
                            <div class="class-stat-label">Murid</div>
                        </div>
                        <div class="class-stat-item">
                            <div class="class-stat-value">${classItem.progress}%</div>
                            <div class="class-stat-label">Progress</div>
                        </div>
                    </div>
                    
                    <div class="class-dates">
                        <div class="class-date-item">
                            <span class="class-date-label">Mulai:</span>
                            <span class="class-date-value">${startDate}</span>
                        </div>
                        <div class="class-date-item">
                            <span class="class-date-label">Selesai:</span>
                            <span class="class-date-value">${endDate}</span>
                        </div>
                    </div>
                    
                    <div class="class-card-actions">
                        <button class="btn-icon btn-view" onclick="viewClassDetail(${classItem.id}); event.stopPropagation();" title="Lihat Detail">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon btn-edit" onclick="editClass(${classItem.id}); event.stopPropagation();" title="Edit Kelas">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteClass(${classItem.id}, false); event.stopPropagation();" title="Hapus Kelas">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;

            // Make card clickable to view detail
            card.addEventListener('click', function() {
                viewClassDetail(classItem.id);
            });
            
            return card;
        }

        // View class detail (navigate to detail page)
        function viewClassDetail(classId) {
            updateURL(classId);
            showClassDetail(classId);
        }
        
        function getStatusBadge(status) {
            const statusMap = {
                'draft': { class: 'status-draft', text: 'Draft' },
                'scheduled': { class: 'status-scheduled', text: 'Dijadwalkan' },
                'published': { class: 'status-published', text: 'Berjalan' },
                'archived': { class: 'status-archived', text: 'Diarsipkan' }
            };
            return statusMap[status] || { class: 'status-draft', text: 'Draft' };
        }
        
        function getLevelBadge(level) {
            const levelMap = {
                'pemula': { class: 'level-beginner', text: 'Pemula' },
                'menengah': { class: 'level-intermediate', text: 'Menengah' },
                'mahir': { class: 'level-advanced', text: 'Mahir' }
            };
            return levelMap[level] || { class: 'level-beginner', text: 'Pemula' };
        }
        
        // ===== MODAL FUNCTIONS =====
        
        function showAddClassModal() {
            tempCurriculum = []; // Reset curriculum array
            
            Swal.fire({
                title: 'Tambah Kelas Baru',
                html: getClassFormHTML(),
                width: '900px',
                showCancelButton: true,
                confirmButtonText: 'Simpan Kelas',
                cancelButtonText: 'Batal',
                didOpen: () => {
                    initializeClassForm();
                },
                preConfirm: () => {
                    return saveClass(null);
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    Swal.fire('Berhasil!', 'Kelas berhasil ditambahkan.', 'success');
                    renderClassesCards();
                }
            });
        }
        
        function editClass(classId) {
            const classItem = classes.find(c => c.id === classId);
            if (!classItem) return;
            
            tempCurriculum = [...(classItem.curriculum || [])]; // Copy existing curriculum
            
            Swal.fire({
                title: 'Edit Kelas',
                html: getClassFormHTML(classItem),
                width: '900px',
                showCancelButton: true,
                confirmButtonText: 'Update Kelas',
                cancelButtonText: 'Batal',
                didOpen: () => {
                    initializeClassForm();
                    renderCurriculumItems();
                },
                preConfirm: () => {
                    return saveClass(classId);
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    Swal.fire('Berhasil!', 'Kelas berhasil diperbarui.', 'success');
                    
                    // Check if we're in detail view
                    const urlParams = new URLSearchParams(window.location.search);
                    const currentId = urlParams.get('id');
                    
                    if (currentId && parseInt(currentId) === classId) {
                        showClassDetail(classId);
                    } else {
                        renderClassesCards();
                    }
                }
            });
        }
        
        function deleteClass(classId, fromDetail = false) {
            Swal.fire({
                title: 'Hapus Kelas?',
                text: 'Apakah Anda yakin ingin menghapus kelas ini? Tindakan ini tidak dapat dibatalkan.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Hapus',
                cancelButtonText: 'Batal',
                confirmButtonColor: '#dc3545'
            }).then((result) => {
                if (result.isConfirmed) {
                    classes = classes.filter(c => c.id !== classId);
                    localStorage.setItem('chefClasses', JSON.stringify(classes));
                    
                    Swal.fire('Berhasil!', 'Kelas berhasil dihapus.', 'success');
                    
                    if (fromDetail) {
                        showListView();
                        updateURL(null);
                    } else {
                        renderClassesCards();
                    }
                }
            });
        }
        
        // ===== FORM FUNCTIONS =====
        
        function getClassFormHTML(classData = null) {
            const isEdit = classData !== null;
            
            return `
                <div style="max-height: 70vh; overflow-y: auto; padding: 20px;">
                    <div class="form-row">
                        <div class="form-full-width">
                            <label class="form-label">Judul Kelas *</label>
                            <input type="text" class="form-control" id="class-title" value="${isEdit ? classData.title : ''}" placeholder="Masukkan judul kelas yang menarik">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-full-width">
                            <label class="form-label">Thumbnail Kelas</label>
                            <div class="thumbnail-upload" id="thumbnail-upload-area">
                                <i class="fas fa-cloud-upload-alt" style="font-size: 2.5rem; color: var(--primary-color); margin-bottom: 15px;"></i>
                                <p style="font-weight: 600; margin-bottom: 5px;">Klik untuk mengunggah thumbnail kelas</p>
                                <p style="font-size: 0.9rem; color: var(--text-light);">Rekomendasi: 1280x720px, format JPG/PNG</p>
                            </div>
                            <div class="thumbnail-preview" id="thumbnail-preview" ${isEdit && classData.thumbnail ? 'style="display: block;"' : ''}>
                                <img src="${isEdit ? classData.thumbnail : ''}" alt="Preview Thumbnail">
                            </div>
                            <input type="hidden" id="class-thumbnail" value="${isEdit ? classData.thumbnail : ''}">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-full-width">
                            <label class="form-label">Deskripsi Kelas *</label>
                            <textarea class="form-control" id="class-description" rows="4" placeholder="Deskripsikan kelas Anda secara detail...">${isEdit ? classData.description : ''}</textarea>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Kategori *</label>
                            <select class="form-control" id="class-category">
                                <option value="">Pilih Kategori</option>
                                <option value="Masakan Italia" ${isEdit && classData.category === 'Masakan Italia' ? 'selected' : ''}>Masakan Italia</option>
                                <option value="Masakan Indonesia" ${isEdit && classData.category === 'Masakan Indonesia' ? 'selected' : ''}>Masakan Indonesia</option>
                                <option value="Masakan Asia" ${isEdit && classData.category === 'Masakan Asia' ? 'selected' : ''}>Masakan Asia</option>
                                <option value="Baking" ${isEdit && classData.category === 'Baking' ? 'selected' : ''}>Baking & Pastry</option>
                                <option value="Kesehatan" ${isEdit && classData.category === 'Kesehatan' ? 'selected' : ''}>Masakan Sehat</option>
                                <option value="Dasar Memasak" ${isEdit && classData.category === 'Dasar Memasak' ? 'selected' : ''}>Dasar Memasak
                                    <option value="Dasar Memasak" ${isEdit && classData.category === 'Dasar Memasak' ? 'selected' : ''}>Dasar Memasak</option>
                                <option value="Spesialis" ${isEdit && classData.category === 'Spesialis' ? 'selected' : ''}>Spesialis</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Level *</label>
                            <select class="form-control" id="class-level">
                                <option value="">Pilih Level</option>
                                <option value="pemula" ${isEdit && classData.level === 'pemula' ? 'selected' : ''}>Pemula</option>
                                <option value="menengah" ${isEdit && classData.level === 'menengah' ? 'selected' : ''}>Menengah</option>
                                <option value="mahir" ${isEdit && classData.level === 'mahir' ? 'selected' : ''}>Mahir</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Tanggal Mulai *</label>
                            <input type="date" class="form-control" id="class-start-date" value="${isEdit ? classData.startDate : ''}">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Tanggal Selesai *</label>
                            <input type="date" class="form-control" id="class-end-date" value="${isEdit ? classData.endDate : ''}">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Kelas Premium</label>
                            <select class="form-control" id="class-premium">
                                <option value="false" ${isEdit && !classData.isPremium ? 'selected' : ''}>Kelas Regular</option>
                                <option value="true" ${isEdit && classData.isPremium ? 'selected' : ''}>Kelas Premium</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Status Kelas</label>
                            <select class="form-control" id="class-status">
                                <option value="draft" ${isEdit && classData.status === 'draft' ? 'selected' : ''}>Draft</option>
                                <option value="scheduled" ${isEdit && classData.status === 'scheduled' ? 'selected' : ''}>Dijadwalkan</option>
                                <option value="published" ${isEdit && classData.status === 'published' ? 'selected' : ''}>Publikasikan</option>
                                ${isEdit && classData.status === 'archived' ? '<option value="archived" selected>Diarsipkan</option>' : ''}
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-full-width">
                            <div class="section-header">
                                <h4 class="section-title">Kurikulum Kelas</h4>
                                <button type="button" class="btn btn-outline btn-sm" id="btn-add-curriculum">
                                    <i class="fas fa-plus"></i> Tambah Materi
                                </button>
                            </div>
                            
                            <div class="curriculum-container" id="curriculum-container">
                                <div class="curriculum-empty" id="curriculum-empty">
                                    <i class="fas fa-book-open" style="font-size: 2rem; margin-bottom: 10px;"></i>
                                    <p>Belum ada materi kurikulum. Tambahkan materi pertama Anda.</p>
                                </div>
                                <div id="curriculum-items"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        function initializeClassForm() {
            // Thumbnail upload handling
            const uploadArea = document.getElementById('thumbnail-upload-area');
            const thumbnailInput = document.getElementById('class-thumbnail');
            const thumbnailPreview = document.getElementById('thumbnail-preview');
            
            if (uploadArea) {
                uploadArea.addEventListener('click', function() {
                    Swal.fire({
                        title: 'Pilih Thumbnail',
                        html: `
                            <div style="text-align: left;">
                                <p style="margin-bottom: 15px;">Masukkan URL gambar untuk thumbnail kelas:</p>
                                <input type="url" id="thumbnail-url-input" class="swal2-input" placeholder="https://example.com/image.jpg" style="width: 90%;">
                                <p style="margin-top: 15px; font-size: 0.85rem; color: #666;">
                                    Atau pilih dari template:
                                </p>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 10px;">
                                    <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300" style="width: 100%; height: 80px; object-fit: cover; cursor: pointer; border-radius: 8px;" class="thumbnail-template" data-url="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80">
                                    <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300" style="width: 100%; height: 80px; object-fit: cover; cursor: pointer; border-radius: 8px;" class="thumbnail-template" data-url="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80">
                                    <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300" style="width: 100%; height: 80px; object-fit: cover; cursor: pointer; border-radius: 8px;" class="thumbnail-template" data-url="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80">
                                </div>
                            </div>
                        `,
                        showCancelButton: true,
                        confirmButtonText: 'Gunakan URL',
                        cancelButtonText: 'Batal',
                        didOpen: () => {
                            const templates = document.querySelectorAll('.thumbnail-template');
                            const urlInput = document.getElementById('thumbnail-url-input');
                            
                            templates.forEach(template => {
                                template.addEventListener('click', function() {
                                    urlInput.value = this.getAttribute('data-url');
                                });
                            });
                        },
                        preConfirm: () => {
                            const url = document.getElementById('thumbnail-url-input').value;
                            if (!url) {
                                Swal.showValidationMessage('Masukkan URL gambar');
                                return false;
                            }
                            return url;
                        }
                    }).then((result) => {
                        if (result.isConfirmed && result.value) {
                            thumbnailInput.value = result.value;
                            thumbnailPreview.querySelector('img').src = result.value;
                            thumbnailPreview.style.display = 'block';
                        }
                    });
                });
            }
            
            // Add curriculum button
            const btnAddCurriculum = document.getElementById('btn-add-curriculum');
            if (btnAddCurriculum) {
                btnAddCurriculum.addEventListener('click', function(e) {
                    e.preventDefault();
                    showAddCurriculumModal();
                });
            }
        }
        
        function showAddCurriculumModal() {
            Swal.fire({
                title: 'Tambah Materi Kurikulum',
                html: `
                    <div style="text-align: left; padding: 10px;">
                        <div class="form-group">
                            <label class="form-label">Jenis Materi </label>
                            <select class="form-control" id="curriculum-type">
                                <option value="">Pilih Jenis Materi</option>
                                <option value="video">Video</option>
                                <option value="pdf">PDF / Dokumen</option>
                                <option value="article">Artikel</option>
                                <option value="Quiz">Kuis</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Judul Materi *</label>
                            <input type="text" class="form-control" id="curriculum-title" placeholder="Contoh: Pengenalan Dasar Memasak">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Deskripsi Materi</label>
                            <textarea class="form-control" id="curriculum-description" rows="3" placeholder="Deskripsikan materi ini..."></textarea>
                        </div>

                         <div class="form-group">
                            <label class="form-label">Link Materi *</label>
                            <input type="text" class="form-control" id="curriculum-link" placeholder="Contoh:Link Materi">
                        </div>
                        
                        <div id="curriculum-extra-fields"></div>
                    </div>
                `,
                width: '600px',
                showCancelButton: true,
                confirmButtonText: 'Tambahkan',
                cancelButtonText: 'Batal',
                didOpen: () => {
                    const typeSelect = document.getElementById('curriculum-type');
                    const extraFields = document.getElementById('curriculum-extra-fields');
                    
                    typeSelect.addEventListener('change', function() {
                        const type = this.value;
                        let fieldsHTML = '';
        
                        
                        extraFields.innerHTML = fieldsHTML;
                    });
                },
                preConfirm: () => {
                    const type = document.getElementById('curriculum-type').value;
                    const title = document.getElementById('curriculum-title').value;
                    const description = document.getElementById('curriculum-description').value;
                    const link = document.getElementById('curriculum-link').value;
                    
                    if (!type || !title || !description || !link) {
                        Swal.showValidationMessage('Mohon diisi semuanya!');
                        return false;
                    }
                    
                    const item = {
                        type: type,
                        title: title,
                    };
                    
                    return item;
                }
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    tempCurriculum.push(result.value);
                    renderCurriculumItems();
                }
            });
        }
        
        function renderCurriculumItems() {
            const curriculumItemsContainer = document.getElementById('curriculum-items');
            const curriculumEmpty = document.getElementById('curriculum-empty');
            
            if (!curriculumItemsContainer) return;
            
            if (tempCurriculum.length === 0) {
                curriculumEmpty.style.display = 'block';
                curriculumItemsContainer.innerHTML = '';
                return;
            }
            
            curriculumEmpty.style.display = 'none';
            
            const iconMap = {
                'video': 'fas fa-play-circle',
                'pdf': 'fas fa-file-pdf',
                'assignment': 'fas fa-tasks',
                'quiz': 'fas fa-question-circle',
                'article': 'fas fa-newspaper',
                'link': 'fas fa-link'
            };
            
            curriculumItemsContainer.innerHTML = tempCurriculum.map((item, index) => {
                let metaHTML = '';
                if (item.duration) metaHTML += `<span><i class="fas fa-clock"></i> ${item.duration}</span>`;
                if (item.pages) metaHTML += `<span><i class="fas fa-file"></i> ${item.pages} halaman</span>`;
                if (item.questions) metaHTML += `<span><i class="fas fa-question"></i> ${item.questions} soal</span>`;
                
                return `
                    <div class="curriculum-editor-item">
                        <div class="curriculum-item-header">
                            <div class="curriculum-item-type">
                                <i class="${iconMap[item.type] || 'fas fa-file'}"></i>
                                <span>${item.title}</span>
                            </div>
                            <button type="button" class="btn-icon btn-delete" onclick="removeCurriculumItem(${index})" title="Hapus Materi">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        ${item.description ? `<p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 10px;">${item.description}</p>` : ''}
                        ${metaHTML ? `<div class="curriculum-meta">${metaHTML}</div>` : ''}
                    </div>
                `;
            }).join('');
        }
        
        function removeCurriculumItem(index) {
            tempCurriculum.splice(index, 1);
            renderCurriculumItems();
        }
        
        function saveClass(classId) {
            const title = document.getElementById('class-title').value;
            const thumbnail = document.getElementById('class-thumbnail').value;
            const description = document.getElementById('class-description').value;
            const category = document.getElementById('class-category').value;
            const level = document.getElementById('class-level').value;
            const startDate = document.getElementById('class-start-date').value;
            const endDate = document.getElementById('class-end-date').value;
            const isPremium = document.getElementById('class-premium').value === 'true';
            const status = document.getElementById('class-status').value;
            
            // Validation
            if (!title || !description || !category || !level) {
                Swal.showValidationMessage('Mohon isi semua field yang wajib (*)');
                return false;
            }
            
            const classData = {
                title,
                thumbnail: thumbnail || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
                description,
                category,
                level,
                startDate,
                endDate,
                isPremium,
                status,
                curriculum: tempCurriculum,
                students: 0,
                progress: 0
            };
            
            if (classId) {
                // Update existing class
                const index = classes.findIndex(c => c.id === classId);
                if (index !== -1) {
                    classes[index] = { ...classes[index], ...classData };
                }
            } else {
                // Add new class
                const newId = Math.max(...classes.map(c => c.id), 0) + 1;
                classes.push({ id: newId, ...classData });
            }
            
            // Save to localStorage
            localStorage.setItem('chefClasses', JSON.stringify(classes));
            
            return true;
        }
document.querySelector(".kelas").classList.add("active");