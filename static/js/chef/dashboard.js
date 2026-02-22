// ===== DATA SAMPLE =====
const sampleCourses = [
    {
        id: 1,
        title: "Masakan Italia Dasar",
        description: "Pelajari dasar-dasar memasak pasta, pizza, dan risotto otentik Italia.",
        thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
        progress: 85,
        startDate: "15 Feb 2026",
        students: 42,
        level: "Beginner",
        category: "Italian Cuisine",
        curriculum: []
    },
    {
        id: 2,
        title: "Pastry & Bakery Masterclass",
        description: "Teknik membuat roti, kue, dan pastry profesional untuk bakery.",
        thumbnail: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
        progress: 60,
        startDate: "20 Feb 2026",
        students: 28,
        level: "Advanced",
        category: "Baking",
        curriculum: []
    },
    {
        id: 3,
        title: "Masakan Indonesia Modern",
        description: "Kreasi kontemporer dari masakan tradisional Indonesia.",
        thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
        progress: 45,
        startDate: "25 Feb 2026",
        students: 35,
        level: "Intermediate",
        category: "Indonesian",
        curriculum: [],
        premium: true
    }
];

const sampleSchedule = [
    {
        id: 1,
        kelas: "Masakan Italia Dasar",
        tanggal: "2026-02-04",
        waktu_mulai: "14:00",
        waktu_selesai: "16:00",
        peserta: 15
    },
    {
        id: 2,
        kelas: "Pastry & Bakery",
        tanggal: "2026-02-05",
        waktu_mulai: "10:00",
        waktu_selesai: "13:00",
        peserta: 12
    },
    {
        id: 3,
        kelas: "Masakan Indonesia Modern",
        tanggal: "2026-02-07",
        waktu_mulai: "15:00",
        waktu_selesai: "17:30",
        peserta: 20
    }
];

// ===== UTILITY FUNCTIONS =====
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('id-ID', { month: 'short' });
    return { day, month };
}

function getCurrentGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Pagi";
    if (hour < 15) return "Siang";
    if (hour < 18) return "Sore";
    return "Malam";
}

// ===== DOM ELEMENT REFERENCES =====
const coursesContainer = document.getElementById('courses-container');
const scheduleContainer = document.getElementById('schedule-container');
const greetingElement = document.querySelector('.greeting h1');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Update greeting with time of day
    const timeGreeting = getCurrentGreeting();
    greetingElement.textContent = `Selamat ${timeGreeting}, Chef Budi!`;
    
    // Load initial data (limit to 3 items)
    loadCourses(3);
    loadSchedule(3);
    animateProgressBars();
    
    // Simulate real-time updates
    simulateRealTimeUpdates();
    
    console.log("Dashboard Chef initialized successfully!");
});

// ===== COURSE MANAGEMENT =====
function loadCourses(limit = null) {
    const coursesToShow = limit ? sampleCourses.slice(0, limit) : sampleCourses;
    
    if (coursesToShow.length === 0) {
        coursesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>Belum Ada Kelas</h3>
                <p>Mulai buat kelas pertama Anda!</p>
                <button class="btn btn-primary mt-3" onclick="createNewClass()">
                    <i class="fas fa-plus"></i> Buat Kelas Baru
                </button>
            </div>
        `;
        return;
    }

    coursesContainer.innerHTML = coursesToShow.map(course => `
        <div class="course-card fade-in ${course.premium ? 'premium-feature' : ''}">
            <div class="course-header">
                <img src="${course.thumbnail}" alt="${course.title}" class="course-thumbnail">
                ${course.premium ? '<div class="course-badge">PREMIUM</div>' : ''}
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                
                <div class="course-progress">
                    <div class="progress-label">
                        <span>Progress</span>
                        <span>${course.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" data-progress="${course.progress}"></div>
                    </div>
                </div>
                
                <div class="course-meta">
                    <div class="course-info">
                        <span class="course-info-item">
                            <i class="fas fa-calendar"></i> ${course.startDate}
                        </span>
                        <span class="course-info-item">
                            <i class="fas fa-users"></i> ${course.students}
                        </span>
                        <span class="course-info-item">
                            <i class="fas fa-signal"></i> ${course.level}
                        </span>
                    </div>
                </div>
                
                <div class="course-actions">
                    <button class="btn btn-primary" onclick="manageClass(${course.id})">
                        <i class="fas fa-edit"></i> Kelola
                    </button>
                    <button class="btn btn-outline" onclick="viewClass(${course.id})">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== SCHEDULE MANAGEMENT =====
function loadSchedule(limit = null) {
    const scheduleToShow = limit ? sampleSchedule.slice(0, limit) : sampleSchedule;
    
    if (scheduleToShow.length === 0) {
        scheduleContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <h3>Tidak ada jadwal</h3>
                <p>Tidak ada jadwal kelas untuk minggu ini</p>
            </div>
        `;
        return;
    }

    scheduleContainer.innerHTML = scheduleToShow.map(item => {
        const { day, month } = formatDate(item.tanggal);
        return `
            <div class="schedule-item slide-in">
                <div class="schedule-date">
                    <div class="date-day">${day}</div>
                    <div class="date-month">${month}</div>
                </div>
                <div class="schedule-info">
                    <h4 class="schedule-title">${item.kelas}</h4>
                    <p class="schedule-time">
                        <i class="fas fa-clock"></i> ${item.waktu_mulai} - ${item.waktu_selesai}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

// ===== ANIMATIONS =====
function animateProgressBars() {
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const progress = bar.getAttribute('data-progress') || 0;
            bar.style.width = `${progress}%`;
        });
    }, 300);
}

// ===== CREATE NEW CLASS =====
function createNewClass() {
    Swal.fire({
        title: 'Buat Kelas Baru',
        html: `
            <div class="text-start">
                <div class="form-group">
                    <label class="form-label">Judul Kelas *</label>
                    <input type="text" id="judul" class="form-control" placeholder="Contoh: Masakan Italia Dasar">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Thumbnail</label>
                    <input type="text" id="thumbnail" class="form-control" placeholder="URL gambar thumbnail">
                    <small class="text-muted">Masukkan URL gambar untuk thumbnail kelas</small>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Deskripsi *</label>
                    <textarea id="deskripsi" class="form-control" placeholder="Deskripsi lengkap kelas..." rows="4"></textarea>
                </div>
                
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label class="form-label">Kategori *</label>
                            <select id="kategori" class="form-control">
                                <option value="">Pilih Kategori</option>
                                <option value="Italian">Masakan Italia</option>
                                <option value="Indonesian">Masakan Indonesia</option>
                                <option value="Japanese">Masakan Jepang</option>
                                <option value="Baking">Baking & Pastry</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Healthy">Makanan Sehat</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label class="form-label">Level *</label>
                            <select id="level" class="form-control">
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="curriculum-section">
                    <div class="curriculum-header">
                        <h4 class="curriculum-title">Kurikulum Kelas</h4>
                        <button type="button" class="btn btn-sm btn-outline" onclick="addCurriculumItem()">
                            <i class="fas fa-plus"></i> Tambah Materi
                        </button>
                    </div>
                    <div class="curriculum-items" id="curriculum-items">
                        <div class="curriculum-item" onclick="addCurriculumItem()">
                            <i class="fas fa-plus"></i>
                            <span>Tambah materi pertama</span>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-6">
                        <div class="form-group">
                            <label class="form-label">Tanggal Mulai *</label>
                            <input type="date" id="start-date" class="form-control">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label class="form-label">Tanggal Selesai</label>
                            <input type="date" id="end-date" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Buat Kelas',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#2e8b57',
        width: 700,
        preConfirm: () => {
            const judul = document.getElementById('judul').value;
            const thumbnail = document.getElementById('thumbnail').value;
            const deskripsi = document.getElementById('deskripsi').value;
            const kategori = document.getElementById('kategori').value;
            const level = document.getElementById('level').value;
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            
            // Validation
            if (!judul.trim()) {
                Swal.showValidationMessage('Judul kelas harus diisi');
                return false;
            }
            if (!deskripsi.trim()) {
                Swal.showValidationMessage('Deskripsi harus diisi');
                return false;
            }
            if (!kategori) {
                Swal.showValidationMessage('Kategori harus dipilih');
                return false;
            }
            if (!startDate) {
                Swal.showValidationMessage('Tanggal mulai harus diisi');
                return false;
            }
            
            // Get curriculum items
            const curriculumItems = Array.from(document.querySelectorAll('#curriculum-items .curriculum-item:not(:first-child)')).map(item => {
                const type = item.getAttribute('data-type');
                const title = item.getAttribute('data-title') || 'Materi Baru';
                return { type, title };
            });
            
            return {
                judul, thumbnail, deskripsi, kategori, level,
                startDate, endDate, curriculum: curriculumItems
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            showLoading();
            
            // Simulate API call
            setTimeout(() => {
                hideLoading();
                
                // Create new course
                const newCourse = {
                    id: sampleCourses.length + 1,
                    title: result.value.judul,
                    description: result.value.deskripsi,
                    thumbnail: result.value.thumbnail || "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80",
                    progress: 0,
                    startDate: new Date(result.value.startDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    }),
                    students: 0,
                    level: result.value.level,
                    category: result.value.kategori,
                    curriculum: result.value.curriculum
                };
                
                // Add to beginning of array
                sampleCourses.unshift(newCourse);
                
                // Reload courses (limit to 3)
                loadCourses(3);
                animateProgressBars();
                
                // Update stats
                updateStatsDisplay();
                
                Swal.fire({
                    title: 'Berhasil!',
                    text: `Kelas "${result.value.judul}" berhasil dibuat`,
                    icon: 'success',
                    confirmButtonColor: '#2e8b57'
                });
            }, 1500);
        }
    });
}

function addCurriculumItem() {
    Swal.fire({
        title: 'Tambah Materi',
        html: `
            <div class="text-start">
                <div class="form-group">
                    <label class="form-label">Jenis Materi *</label>
                    <select id="materi-type" class="form-control">
                        <option value="video">Video</option>
                        <option value="pdf">PDF/Dokumen</option>
                        <option value="link">Link Eksternal</option>
                        <option value="quiz">Kuis</option>
                        <option value="assignment">Tugas</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Judul Materi *</label>
                    <input type="text" id="materi-title" class="form-control" placeholder="Contoh: Pengenalan Dasar">
                </div>
                
                <div class="form-group" id="materi-url-group">
                    <label class="form-label">URL/Konten *</label>
                    <input type="text" id="materi-url" class="form-control" placeholder="Masukkan URL atau konten">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Durasi (menit)</label>
                    <input type="number" id="materi-duration" class="form-control" placeholder="0" min="0">
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Tambah',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#2e8b57',
        preConfirm: () => {
            const type = document.getElementById('materi-type').value;
            const title = document.getElementById('materi-title').value;
            const url = document.getElementById('materi-url').value;
            const duration = document.getElementById('materi-duration').value;
            
            if (!title.trim()) {
                Swal.showValidationMessage('Judul materi harus diisi');
                return false;
            }
            
            return { type, title, url, duration };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Add curriculum item to the list
            const curriculumContainer = document.getElementById('curriculum-items');
            const newItem = document.createElement('div');
            newItem.className = 'curriculum-item';
            newItem.setAttribute('data-type', result.value.type);
            newItem.setAttribute('data-title', result.value.title);
            
            let icon = 'fa-file';
            switch(result.value.type) {
                case 'video': icon = 'fa-video'; break;
                case 'pdf': icon = 'fa-file-pdf'; break;
                case 'link': icon = 'fa-link'; break;
                case 'quiz': icon = 'fa-question-circle'; break;
                case 'assignment': icon = 'fa-tasks'; break;
            }
            
            newItem.innerHTML = `
                <i class="fas ${icon}"></i>
                <span>${result.value.title}</span>
                <span class="flex-grow"></span>
                <button class="btn btn-sm btn-outline" onclick="removeCurriculumItem(this)">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            // Insert before the "add new" button
            curriculumContainer.insertBefore(newItem, curriculumContainer.firstChild);
        }
    });
}

function removeCurriculumItem(button) {
    const item = button.closest('.curriculum-item');
    item.remove();
}

// ===== MANAGE CLASS =====
function manageClass(classId) {
    const course = sampleCourses.find(c => c.id === classId);
    
    Swal.fire({
        title: 'Kelola Kelas',
        html: `
            <div class="text-start">
                <div class="form-group">
                    <label class="form-label">Judul Kelas</label>
                    <input type="text" id="edit-judul" class="form-control" value="${course.title}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Thumbnail URL</label>
                    <input type="text" id="edit-thumbnail" class="form-control" value="${course.thumbnail}">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Deskripsi</label>
                    <textarea id="edit-deskripsi" class="form-control" rows="4">${course.description}</textarea>
                </div>
                
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label class="form-label">Kategori</label>
                            <select id="edit-kategori" class="form-control">
                                <option value="Italian" ${course.category === 'Italian' ? 'selected' : ''}>Masakan Italia</option>
                                <option value="Indonesian" ${course.category === 'Indonesian' ? 'selected' : ''}>Masakan Indonesia</option>
                                <option value="Japanese" ${course.category === 'Japanese' ? 'selected' : ''}>Masakan Jepang</option>
                                <option value="Baking" ${course.category === 'Baking' ? 'selected' : ''}>Baking & Pastry</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label class="form-label">Level</label>
                            <select id="edit-level" class="form-control">
                                <option value="Beginner" ${course.level === 'Beginner' ? 'selected' : ''}>Beginner</option>
                                <option value="Intermediate" ${course.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                                <option value="Advanced" ${course.level === 'Advanced' ? 'selected' : ''}>Advanced</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="curriculum-section">
                    <div class="curriculum-header">
                        <h4 class="curriculum-title">Kurikulum Kelas</h4>
                        <button type="button" class="btn btn-sm btn-outline" onclick="addCurriculumItem()">
                            <i class="fas fa-plus"></i> Tambah Materi
                        </button>
                    </div>
                    <div class="curriculum-items" id="edit-curriculum-items">
                        ${course.curriculum && course.curriculum.length > 0 ? 
                            course.curriculum.map(item => `
                                <div class="curriculum-item" data-type="${item.type}" data-title="${item.title}">
                                    <i class="fas fa-${getCurriculumIcon(item.type)}"></i>
                                    <span>${item.title}</span>
                                    <span class="flex-grow"></span>
                                    <button class="btn btn-sm btn-outline" onclick="removeCurriculumItem(this)">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            `).join('') : 
                            '<div class="curriculum-item" onclick="addCurriculumItem()"><i class="fas fa-plus"></i><span>Tambah materi pertama</span></div>'
                        }
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-6">
                        <div class="form-group">
                            <label class="form-label">Tanggal Mulai</label>
                            <input type="date" id="edit-start-date" class="form-control" value="${new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label class="form-label">Tanggal Selesai</label>
                            <input type="date" id="edit-end-date" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        `,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Simpan',
        denyButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#2e8b57',
        denyButtonColor: '#dc3545',
        width: 700,
        preConfirm: () => {
            const judul = document.getElementById('edit-judul').value;
            const thumbnail = document.getElementById('edit-thumbnail').value;
            const deskripsi = document.getElementById('edit-deskripsi').value;
            const kategori = document.getElementById('edit-kategori').value;
            const level = document.getElementById('edit-level').value;
            const startDate = document.getElementById('edit-start-date').value;
            const endDate = document.getElementById('edit-end-date').value;
            
            if (!judul.trim()) {
                Swal.showValidationMessage('Judul kelas harus diisi');
                return false;
            }
            
            return { judul, thumbnail, deskripsi, kategori, level, startDate, endDate };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Update course
            const courseIndex = sampleCourses.findIndex(c => c.id === classId);
            if (courseIndex !== -1) {
                sampleCourses[courseIndex] = {
                    ...sampleCourses[courseIndex],
                    title: result.value.judul,
                    description: result.value.deskripsi,
                    thumbnail: result.value.thumbnail,
                    level: result.value.level,
                    category: result.value.kategori,
                    startDate: new Date(result.value.startDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })
                };
                
                loadCourses(3);
                animateProgressBars();
                
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Kelas berhasil diperbarui',
                    icon: 'success',
                    confirmButtonColor: '#2e8b57'
                });
            }
        } else if (result.isDenied) {
            // Delete course
            Swal.fire({
                title: 'Hapus Kelas?',
                text: `Apakah Anda yakin ingin menghapus kelas "${course.title}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Ya, Hapus',
                cancelButtonText: 'Batal'
            }).then((deleteResult) => {
                if (deleteResult.isConfirmed) {
                    const courseIndex = sampleCourses.findIndex(c => c.id === classId);
                    if (courseIndex !== -1) {
                        sampleCourses.splice(courseIndex, 1);
                        loadCourses(3);
                        updateStatsDisplay();
                        
                        Swal.fire({
                            title: 'Terhapus!',
                            text: 'Kelas telah dihapus',
                            icon: 'success',
                            confirmButtonColor: '#2e8b57'
                        });
                    }
                }
            });
        }
    });
}

function getCurriculumIcon(type) {
    switch(type) {
        case 'video': return 'video';
        case 'pdf': return 'file-pdf';
        case 'link': return 'link';
        case 'quiz': return 'question-circle';
        case 'assignment': return 'tasks';
        default: return 'file';
    }
}

// ===== OTHER FUNCTIONS =====
function viewClass(classId) {
    const course = sampleCourses.find(c => c.id === classId);
    
    // Generate curriculum items dengan styling yang baik
    const curriculumHTML = course.curriculum && course.curriculum.length > 0 ? `
        <div class="view-curriculum-section">
            <div class="view-curriculum-header">
                <h5><i class="fas fa-graduation-cap"></i> Kurikulum Kelas</h5>
                <span class="badge">${course.curriculum.length} Materi</span>
            </div>
            <div class="view-curriculum-list">
                ${course.curriculum.map((item, index) => `
                    <div class="view-curriculum-item">
                        <div class="view-curriculum-item-header">
                            <div class="view-curriculum-item-icon ${item.type}">
                                <i class="fas ${getCurriculumIconClass(item.type)}"></i>
                            </div>
                            <div class="view-curriculum-item-info">
                                <h6>Pertemuan ${index + 1}: ${item.title}</h6>
                                <div class="view-curriculum-item-meta">
                                    <span class="badge ${item.type}-badge">${getCurriculumTypeLabel(item.type)}</span>
                                    ${item.duration ? `<span><i class="fas fa-clock"></i> ${item.duration} menit</span>` : ''}
                                </div>
                            </div>
                            <div class="view-curriculum-item-actions">
                                <button class="btn-preview" title="Preview">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        ${item.description ? `<p class="view-curriculum-item-description">${item.description}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    ` : `
        <div class="empty-curriculum">
            <i class="fas fa-book-open"></i>
            <p>Belum ada kurikulum untuk kelas ini</p>
        </div>
    `;
    
    Swal.fire({
        title: `<i class="fas fa-book"></i> ${course.title}`,
        html: `
            <div class="view-class-container">
                <!-- Header dengan Thumbnail -->
                <div class="view-class-header">
                    <div class="view-class-thumbnail">
                        <img src="${course.thumbnail}" alt="${course.title}">
                        ${course.premium ? '<div class="premium-badge-large">PREMIUM</div>' : ''}
                    </div>
                </div>
                
                <!-- Info Utama -->
                <div class="view-class-main-info">
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-icon">
                                <i class="fas fa-tag"></i>
                            </div>
                            <div class="info-content">
                                <label>Kategori</label>
                                <h4>${course.category}</h4>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-icon">
                                <i class="fas fa-signal"></i>
                            </div>
                            <div class="info-content">
                                <label>Level</label>
                                <h4>${course.level}</h4>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="info-content">
                                <label>Total Murid</label>
                                <h4>${course.students} orang</h4>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <div class="info-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="info-content">
                                <label>Rating</label>
                                <h4>${course.rating || 'Belum ada rating'}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Deskripsi -->
                <div class="view-class-description">
                    <h5><i class="fas fa-info-circle"></i> Deskripsi Kelas</h5>
                    <p>${course.description}</p>
                </div>
                
                <!-- Tanggal -->
                <div class="view-class-dates">
                    <div class="date-info">
                        <div class="date-item">
                            <i class="fas fa-calendar-plus"></i>
                            <div>
                                <label>Tanggal Mulai</label>
                                <strong>${course.startDate}</strong>
                            </div>
                        </div>
                        <div class="date-item">
                            <i class="fas fa-calendar-check"></i>
                            <div>
                                <label>Tanggal Selesai</label>
                                <strong>${course.endDate || 'Belum ditentukan'}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Kurikulum -->
                ${curriculumHTML}
                
                <!-- Progress -->
                <div class="view-class-progress">
                    <h5><i class="fas fa-chart-line"></i> Progress Kelas</h5>
                    <div class="progress-container">
                        <div class="progress-label">
                            <span>Progress Keseluruhan</span>
                            <span>${course.progress}%</span>
                        </div>
                        <div class="progress-bar-large">
                            <div class="progress-fill-large" style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '<i class="fas fa-edit"></i> Edit Kelas',
        cancelButtonText: '<i class="fas fa-times"></i> Tutup',
        confirmButtonColor: '#2e8b57',
        cancelButtonColor: '#6c757d',
        width: 800,
        customClass: {
            popup: 'view-class-popup',
            title: 'view-class-title',
            htmlContainer: 'view-class-html-container',
            confirmButton: 'view-class-confirm-btn',
            cancelButton: 'view-class-cancel-btn'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            manageClass(classId);
        }
    });
}

// Helper functions untuk kurikulum
function getCurriculumIconClass(type) {
    switch(type) {
        case 'video': return 'fa-video';
        case 'pdf': return 'fa-file-pdf';
        case 'link': return 'fa-link';
        case 'quiz': return 'fa-question-circle';
        case 'assignment': return 'fa-tasks';
        case 'article': return 'fa-file-alt';
        case 'presentation': return 'fa-file-powerpoint';
        default: return 'fa-file';
    }
}

function getCurriculumTypeLabel(type) {
    switch(type) {
        case 'video': return 'Video';
        case 'pdf': return 'PDF';
        case 'link': return 'Link';
        case 'quiz': return 'Kuis';
        case 'assignment': return 'Tugas';
        case 'article': return 'Artikel';
        case 'presentation': return 'Presentasi';
        default: return 'Materi';
    }
}

// ===== UI HELPERS =====
function showLoading() {
    document.body.classList.add('loading');
}

function hideLoading() {
    document.body.classList.remove('loading');
}

function updateStatsDisplay() {
    // Update main stats
    document.getElementById('total-students').textContent = sampleCourses.reduce((sum, course) => sum + course.students, 0);
    document.getElementById('total-courses').textContent = sampleCourses.length;
}

// ===== SIMULATION FUNCTIONS =====
function simulateRealTimeUpdates() {
    // Update stats every 30 seconds
    setInterval(() => {
        updateStatsDisplay();
    }, 30000);
    
    // Simulate new student enrollment every 2 minutes
    setInterval(() => {
        if (sampleCourses.length > 0 && Math.random() > 0.5) {
            const randomCourse = sampleCourses[Math.floor(Math.random() * sampleCourses.length)];
            randomCourse.students += 1;
            loadCourses(3);
            updateStatsDisplay();
            
            // Show notification occasionally
            if (Math.random() > 0.7) {
                Swal.fire({
                    title: 'Murid Baru!',
                    text: `Seseorang baru saja mendaftar ke kelas "${randomCourse.title}"`,
                    icon: 'info',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
            }
        }
    }, 120000);
}

// Export functions for testing
window.ChefDashboard = {
    createNewClass,
    manageClass,
    viewClass,
    loadCourses,
    loadSchedule
};

console.log("Dashboard Chef Ready!");

// adding class activate
document.querySelector(".dashboard").classList.add("active");
