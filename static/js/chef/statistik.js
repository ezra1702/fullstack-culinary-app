// ===== SAMPLE DATA =====
const statisticsData = {
    revenue: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
        gross: [3200000, 3800000, 4100000, 3900000, 4500000, 4200000, 4800000, 5100000, 4900000, 5300000, 5600000, 5900000],
        net: [2880000, 3420000, 3690000, 3510000, 4050000, 3780000, 4320000, 4590000, 4410000, 4770000, 5040000, 5310000]
    },
    
    students: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
        data: [85, 92, 98, 105, 118, 125, 132, 138, 142, 148, 152, 156]
    },
    
    classes: [
        {
            id: 1,
            name: "Masakan Italia Dasar",
            category: "Italian",
            students: 42,
            revenue: 12600000,
            rating: 4.8,
            completion: 85,
            trend: 15.2
        },
        {
            id: 2,
            name: "Pastry & Bakery Masterclass",
            category: "Baking",
            students: 38,
            revenue: 15200000,
            rating: 4.9,
            completion: 78,
            trend: 12.5
        },
        {
            id: 3,
            name: "Masakan Indonesia Modern",
            category: "Indonesian",
            students: 35,
            revenue: 10500000,
            rating: 4.7,
            completion: 82,
            trend: 8.3
        },
        {
            id: 4,
            name: "Japanese Cuisine Essentials",
            category: "Japanese",
            students: 28,
            revenue: 11200000,
            rating: 4.6,
            completion: 75,
            trend: -3.2
        },
        {
            id: 5,
            name: "French Patisserie",
            category: "French",
            students: 13,
            revenue: 6500000,
            rating: 4.9,
            completion: 88,
            trend: 22.1
        }
    ],
    
    categoryRevenue: {
        labels: ['Italian', 'Baking', 'Indonesian', 'Japanese', 'French', 'Dessert'],
        data: [12600000, 15200000, 10500000, 11200000, 6500000, 5250000],
        colors: ['#2e8b57', '#3cb371', '#28a745', '#ffc107', '#17a2b8', '#834d9b']
    },
    
    demographics: {
        levels: {
            labels: ['Beginner', 'Intermediate', 'Advanced'],
            data: [85, 52, 19]
        }
    },
    
    reviews: [
        {
            id: 1,
            student: "Andi Wijaya",
            avatar: "https://ui-avatars.com/api/?name=Andi+Wijaya&background=2e8b57&color=fff",
            rating: 5,
            class: "Masakan Italia Dasar",
            comment: "Chef Budi mengajar dengan sangat detail dan mudah dipahami. Kelas ini sangat membantu saya memahami dasar-dasar masakan Italia.",
            date: "2 hari lalu"
        },
        {
            id: 2,
            student: "Siti Nurhaliza",
            avatar: "https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=3cb371&color=fff",
            rating: 5,
            class: "Pastry & Bakery Masterclass",
            comment: "Materinya sangat lengkap dan praktis. Sekarang saya bisa membuat roti dan kue sendiri di rumah!",
            date: "3 hari lalu"
        },
        {
            id: 3,
            student: "Budi Santoso",
            avatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=28a745&color=fff",
            rating: 4,
            class: "Masakan Indonesia Modern",
            comment: "Sangat kreatif dalam mengolah masakan tradisional menjadi modern. Recommended!",
            date: "5 hari lalu"
        },
        {
            id: 4,
            student: "Dewi Lestari",
            avatar: "https://ui-avatars.com/api/?name=Dewi+Lestari&background=ffc107&color=fff",
            rating: 5,
            class: "Japanese Cuisine Essentials",
            comment: "Penjelasan Chef sangat jelas dan step-by-step. Perfect untuk pemula!",
            date: "1 minggu lalu"
        },
        {
            id: 5,
            student: "Rizki Pratama",
            avatar: "https://ui-avatars.com/api/?name=Rizki+Pratama&background=17a2b8&color=fff",
            rating: 5,
            class: "French Patisserie",
            comment: "Kelas terbaik yang pernah saya ikuti. Chef Budi adalah expert di bidangnya!",
            date: "1 minggu lalu"
        }
    ]
};

// ===== CHART INSTANCES =====
let revenueChart = null;
let studentGrowthChart = null;
let categoryRevenueChart = null;
let demographicsChart = null;
const miniCharts = {};

// ===== CHART CONFIGURATION =====
const chartColors = {
    primary: '#2e8b57',
    primaryLight: '#3cb371',
    success: '#28a745',
    warning: '#ffc107',
    info: '#17a2b8',
    danger: '#dc3545'
};

const defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            borderRadius: 8,
            titleFont: {
                size: 14,
                weight: 'bold'
            },
            bodyFont: {
                size: 13
            },
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0
                        }).format(context.parsed.y);
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value) {
                    return 'Rp ' + (value / 1000000) + 'jt';
                }
            },
            grid: {
                color: 'rgba(0, 0, 0, 0.05)'
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    loadTopClasses();
    loadReviews();
    loadPerformanceTable();
    loadCategoryBreakdown();
    initializeEngagementRings();
    loadInsights();
    initializeEventListeners();
    
    // Activate sidebar
    const statsLink = document.querySelector('.nav-link[href*="statistik"]');
    if (statsLink) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        statsLink.classList.add('active');
    }
    
    console.log("Statistics Dashboard initialized successfully!");
});

// ===== CHART INITIALIZATION =====
function initializeCharts() {
    createRevenueChart();
    createStudentGrowthChart();
    createCategoryRevenueChart();
    createDemographicsChart();
    createMiniCharts();
}

function createRevenueChart() {
    const ctx = document.getElementById('revenue-chart');
    if (!ctx) return;
    
    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: statisticsData.revenue.labels,
            datasets: [
                {
                    label: 'Pendapatan Kotor',
                    data: statisticsData.revenue.gross,
                    borderColor: chartColors.primary,
                    backgroundColor: 'rgba(46, 139, 87, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: chartColors.primary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Pendapatan Bersih',
                    data: statisticsData.revenue.net,
                    borderColor: chartColors.success,
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: chartColors.success,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: defaultChartOptions
    });
}

function createStudentGrowthChart() {
    const ctx = document.getElementById('student-growth-chart');
    if (!ctx) return;
    
    studentGrowthChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: statisticsData.students.labels,
            datasets: [{
                label: 'Jumlah Murid',
                data: statisticsData.students.data,
                backgroundColor: function(context) {
                    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(46, 139, 87, 0.8)');
                    gradient.addColorStop(1, 'rgba(46, 139, 87, 0.3)');
                    return gradient;
                },
                borderColor: chartColors.primary,
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            ...defaultChartOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' murid';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                ...defaultChartOptions.plugins,
                tooltip: {
                    ...defaultChartOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' murid';
                        }
                    }
                }
            }
        }
    });
}

function createCategoryRevenueChart() {
    const ctx = document.getElementById('category-revenue-chart');
    if (!ctx) return;
    
    categoryRevenueChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: statisticsData.categoryRevenue.labels,
            datasets: [{
                data: statisticsData.categoryRevenue.data,
                backgroundColor: statisticsData.categoryRevenue.colors,
                borderWidth: 3,
                borderColor: '#fff',
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    borderRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0
                            }).format(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function createDemographicsChart() {
    const ctx = document.getElementById('demographics-chart');
    if (!ctx) return;
    
    demographicsChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: statisticsData.demographics.levels.labels,
            datasets: [{
                data: statisticsData.demographics.levels.data,
                backgroundColor: [
                    'rgba(46, 139, 87, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(220, 53, 69, 0.7)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    borderRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed.r} murid`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    ticks: {
                        display: false
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

function createMiniCharts() {
    // Revenue mini chart
    createMiniChart('revenue-mini-chart', statisticsData.revenue.gross.slice(-7), chartColors.primary);
    
    // Students mini chart
    createMiniChart('students-mini-chart', statisticsData.students.data.slice(-7), chartColors.success);
    
    // Classes mini chart
    const classesData = [6, 6, 7, 7, 7, 8, 8];
    createMiniChart('classes-mini-chart', classesData, chartColors.warning);
    
    // Completion mini chart
    const completionData = [72, 74, 75, 76, 77, 78, 78.5];
    createMiniChart('completion-mini-chart', completionData, chartColors.info);
}

function createMiniChart(canvasId, data, color) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    miniCharts[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
                data: data,
                borderColor: color,
                backgroundColor: `${color}20`,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

// ===== TOP CLASSES =====
function loadTopClasses(metric = 'students') {
    const container = document.getElementById('top-classes');
    if (!container) return;
    
    // Sort classes based on selected metric
    let sortedClasses = [...statisticsData.classes];
    sortedClasses.sort((a, b) => b[metric] - a[metric]);
    
    // Take top 5
    sortedClasses = sortedClasses.slice(0, 5);
    
    container.innerHTML = sortedClasses.map((cls, index) => {
        let displayValue;
        switch(metric) {
            case 'students':
                displayValue = cls.students + ' murid';
                break;
            case 'revenue':
                displayValue = formatCurrency(cls.revenue);
                break;
            case 'rating':
                displayValue = cls.rating.toFixed(1) + ' ⭐';
                break;
            case 'completion':
                displayValue = cls.completion + '%';
                break;
        }
        
        return `
            <div class="ranking-item fade-in">
                <div class="ranking-position">${index + 1}</div>
                <div class="ranking-info">
                    <div class="ranking-title">${cls.name}</div>
                    <div class="ranking-meta">
                        <span><i class="fas fa-tag"></i> ${cls.category}</span>
                        <span><i class="fas fa-star"></i> ${cls.rating}</span>
                    </div>
                </div>
                <div class="ranking-value">${displayValue}</div>
            </div>
        `;
    }).join('');
}

// ===== CATEGORY BREAKDOWN =====
function loadCategoryBreakdown() {
    const container = document.getElementById('category-breakdown');
    if (!container) return;
    
    const total = statisticsData.categoryRevenue.data.reduce((a, b) => a + b, 0);
    
    container.innerHTML = statisticsData.categoryRevenue.labels.map((label, index) => {
        const value = statisticsData.categoryRevenue.data[index];
        const percentage = ((value / total) * 100).toFixed(1);
        
        return `
            <div class="category-item">
                <div class="category-color" style="background: ${statisticsData.categoryRevenue.colors[index]}"></div>
                <div class="category-name">${label}</div>
                <div class="category-value">
                    ${formatCurrency(value)}
                    <span class="category-percentage">(${percentage}%)</span>
                </div>
            </div>
        `;
    }).join('');
}

// ===== REVIEWS =====
function loadReviews() {
    const container = document.getElementById('recent-reviews');
    if (!container) return;
    
    container.innerHTML = statisticsData.reviews.map(review => {
        const stars = '⭐'.repeat(review.rating);
        
        return `
            <div class="review-item fade-in">
                <div class="review-header">
                    <div class="reviewer-info">
                        <img src="${review.avatar}" alt="${review.student}" class="reviewer-avatar">
                        <div>
                            <div class="reviewer-name">${review.student}</div>
                            <div class="review-date">${review.date}</div>
                        </div>
                    </div>
                    <div class="review-rating">
                        <div class="stars">${stars}</div>
                    </div>
                </div>
                <div class="review-class">
                    <i class="fas fa-book"></i> ${review.class}
                </div>
                <p class="review-content">${review.comment}</p>
            </div>
        `;
    }).join('');
}

// ===== PERFORMANCE TABLE =====
function loadPerformanceTable() {
    const tbody = document.getElementById('performance-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = statisticsData.classes.map(cls => {
        const completionClass = cls.completion >= 80 ? 'high' : cls.completion >= 60 ? 'medium' : 'low';
        const trendClass = cls.trend > 0 ? 'up' : 'down';
        const trendIcon = cls.trend > 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        
        return `
            <tr class="fade-in">
                <td>
                    <div class="class-name">${cls.name}</div>
                </td>
                <td>
                    <span class="class-category">${cls.category}</span>
                </td>
                <td>
                    <span class="student-count">
                        <i class="fas fa-users"></i> ${cls.students}
                    </span>
                </td>
                <td>
                    <span class="revenue-amount">${formatCurrency(cls.revenue)}</span>
                </td>
                <td>
                    <div class="rating-display">
                        <span class="rating-value">${cls.rating}</span>
                        <div class="stars">⭐⭐⭐⭐⭐</div>
                    </div>
                </td>
                <td>
                    <span class="completion-badge ${completionClass}">
                        ${cls.completion}%
                    </span>
                </td>
                <td>
                    <span class="trend-indicator ${trendClass}">
                        <i class="fas ${trendIcon}"></i>
                        ${Math.abs(cls.trend)}%
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action view" onclick="viewClassDetails(${cls.id})">
                            <i class="fas fa-eye"></i> Detail
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ===== ENGAGEMENT RINGS =====
function initializeEngagementRings() {
    setProgressRing('active-ring', 85);
    setProgressRing('completion-ring', 78);
    setProgressRing('satisfaction-ring', 92);
}

function setProgressRing(elementId, percentage) {
    const circle = document.getElementById(elementId);
    if (!circle) return;
    
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);
}

// ===== INSIGHTS =====
function loadInsights() {
    const container = document.getElementById('insights-container');
    if (!container) return;
    
    const insights = [
        {
            type: 'success',
            icon: 'fa-trophy',
            title: 'Performa Excellent!',
            content: 'Kelas "Pastry & Bakery Masterclass" mencapai rating 4.9 dengan 38 murid aktif. Pertahankan kualitas mengajar Anda!',
            action: 'Lihat Detail'
        },
        {
            type: 'warning',
            icon: 'fa-chart-line',
            title: 'Peluang Pertumbuhan',
            content: 'Kelas "Japanese Cuisine" mengalami penurunan 3.2%. Pertimbangkan untuk update materi atau promosi khusus.',
            action: 'Analisis Lebih Lanjut'
        },
        {
            type: 'info',
            icon: 'fa-lightbulb',
            title: 'Rekomendasi',
            content: 'Kategori "Baking" menghasilkan pendapatan tertinggi. Pertimbangkan membuat kelas lanjutan di kategori ini.',
            action: 'Buat Kelas Baru'
        },
        {
            type: 'success',
            icon: 'fa-users',
            title: 'Target Tercapai',
            content: 'Anda telah mencapai 102.9% dari target pendapatan bulanan. Luar biasa!',
            action: 'Lihat Laporan'
        }
    ];
    
    container.innerHTML = insights.map(insight => `
        <div class="insight-card ${insight.type} fade-in">
            <div class="insight-header">
                <div class="insight-icon">
                    <i class="fas ${insight.icon}"></i>
                </div>
                <h4 class="insight-title">${insight.title}</h4>
            </div>
            <p class="insight-content">${insight.content}</p>
            <button class="insight-action" onclick="handleInsightAction('${insight.type}')">
                ${insight.action} <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `).join('');
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Performance metric selector
    const performanceMetric = document.getElementById('performance-metric');
    if (performanceMetric) {
        performanceMetric.addEventListener('change', function() {
            loadTopClasses(this.value);
        });
    }
    
    // Date range selector
    const dateRange = document.getElementById('date-range');
    if (dateRange) {
        dateRange.addEventListener('change', function() {
            refreshAllData(this.value);
        });
    }
    
    // Class search
    const classSearch = document.getElementById('class-search');
    if (classSearch) {
        classSearch.addEventListener('input', function() {
            filterPerformanceTable(this.value);
        });
    }
    
    // Chart type toggles
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const chartName = this.getAttribute('data-chart');
            const chartType = this.getAttribute('data-type');
            
            // Update active state
            this.parentElement.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart type
            if (chartName === 'revenue' && revenueChart) {
                revenueChart.config.type = chartType;
                revenueChart.update();
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);
}

function filterPerformanceTable(searchTerm) {
    const tbody = document.getElementById('performance-table-body');
    const rows = tbody.getElementsByTagName('tr');
    
    const term = searchTerm.toLowerCase();
    
    Array.from(rows).forEach(row => {
        const className = row.querySelector('.class-name').textContent.toLowerCase();
        const category = row.querySelector('.class-category').textContent.toLowerCase();
        
        if (className.includes(term) || category.includes(term)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function refreshAllData(period) {
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        // Update charts with new data
        console.log(`Refreshing data for period: ${period} days`);
        
        hideLoading();
        
        Swal.fire({
            title: 'Data Diperbarui',
            text: `Statistik telah diperbarui untuk ${period} hari terakhir`,
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });
    }, 1000);
}

function refreshStudentData() {
    const btn = event.currentTarget;
    const icon = btn.querySelector('i');
    
    icon.classList.add('fa-spin');
    
    setTimeout(() => {
        icon.classList.remove('fa-spin');
        
        Swal.fire({
            title: 'Data Diperbarui',
            text: 'Data pertumbuhan murid telah diperbarui',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
        });
    }, 1500);
}

function viewClassDetails(classId) {
    const classData = statisticsData.classes.find(c => c.id === classId);
    
    Swal.fire({
        title: `Detail Kelas: ${classData.name}`,
        html: `
            <div style="text-align: left; padding: 20px;">
                <h4 style="margin-bottom: 15px;">Statistik Kelas</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <strong>Kategori:</strong> ${classData.category}<br>
                        <strong>Total Murid:</strong> ${classData.students}<br>
                        <strong>Rating:</strong> ${classData.rating} ⭐
                    </div>
                    <div>
                        <strong>Pendapatan:</strong> ${formatCurrency(classData.revenue)}<br>
                        <strong>Completion Rate:</strong> ${classData.completion}%<br>
                        <strong>Trend:</strong> ${classData.trend > 0 ? '+' : ''}${classData.trend}%
                    </div>
                </div>
            </div>
        `,
        width: 600,
        confirmButtonText: 'Tutup',
        confirmButtonColor: '#2e8b57'
    });
}

function requestPayout() {
    Swal.fire({
        title: 'Request Payout',
        html: `
            <div style="text-align: left;">
                <p>Anda akan melakukan request payout sebesar:</p>
                <h3 style="color: #2e8b57; margin: 20px 0;">Rp 8.250.000</h3>
                <p style="font-size: 0.9rem; color: #666;">Dana akan ditransfer ke rekening terdaftar dalam 2-3 hari kerja.</p>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Proses Payout',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#2e8b57',
        cancelButtonColor: '#6c757d'
    }).then((result) => {
        if (result.isConfirmed) {
            showLoading();
            
            setTimeout(() => {
                hideLoading();
                
                Swal.fire({
                    title: 'Request Berhasil',
                    text: 'Request payout Anda sedang diproses. Anda akan menerima notifikasi setelah dana ditransfer.',
                    icon: 'success',
                    confirmButtonColor: '#2e8b57'
                });
            }, 1500);
        }
    });
}

function handleInsightAction(type) {
    Swal.fire({
        title: 'Insight Action',
        text: `Menampilkan detail untuk insight tipe: ${type}`,
        icon: 'info',
        confirmButtonColor: '#2e8b57'
    });
}

function exportReport() {
    Swal.fire({
        title: 'Export Report',
        html: `
            <div style="text-align: left;">
                <p>Pilih format export:</p>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                    <button class="btn btn-primary" style="width: 100%;" onclick="exportAs('pdf')">
                        <i class="fas fa-file-pdf"></i> Export as PDF
                    </button>
                    <button class="btn btn-success" style="width: 100%;" onclick="exportAs('excel')">
                        <i class="fas fa-file-excel"></i> Export as Excel
                    </button>
                    <button class="btn btn-info" style="width: 100%;" onclick="exportAs('csv')">
                        <i class="fas fa-file-csv"></i> Export as CSV
                    </button>
                </div>
            </div>
        `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Tutup',
        width: 400
    });
}

function exportAs(format) {
    Swal.close();
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        Swal.fire({
            title: 'Export Berhasil',
            text: `Report telah di-export dalam format ${format.toUpperCase()}`,
            icon: 'success',
            confirmButtonColor: '#2e8b57'
        });
    }, 2000);
}

function showLoading() {
    Swal.fire({
        title: 'Memproses...',
        html: 'Mohon tunggu sebentar',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

function hideLoading() {
    Swal.close();
}

// Export functions for global access
window.ChefStatistics = {
    viewClassDetails,
    requestPayout,
    handleInsightAction,
    exportReport,
    exportAs,
    refreshStudentData
};

console.log("Chef Statistics Module Loaded!");