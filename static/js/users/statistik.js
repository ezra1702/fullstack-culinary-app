const activityCtx = document.getElementById('activityChart').getContext('2d');
        const activityChart = new Chart(activityCtx, {
            type: 'bar',
            data: {
                labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
                datasets: [
                    {
                        label: 'Waktu Belajar (jam)',
                        backgroundColor: '#4e73df',
                        data: [2.5, 3, 2, 4, 3.5, 1.5, 2],
                        barPercentage: 0.5
                    },
                    {
                        label: 'Resep Dicoba',
                        backgroundColor: '#1cc88a',
                        data: [3, 4, 2, 5, 3, 1, 2],
                        barPercentage: 0.5
                    },
                    {
                        label: 'Master Class',
                        backgroundColor: '#f6d365',
                        data: [1, 2, 0, 3, 2, 0, 1],
                        barPercentage: 0.5
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + (context.datasetIndex === 0 ? ' jam' : ' resep');
                            }
                        }
                    }
                }
            }
        });

        // Grafik Progress Keahlian
        const skillCtx = document.getElementById('skillChart').getContext('2d');
        const skillChart = new Chart(skillCtx, {
            type: 'radar',
            data: {
                labels: ['Masakan Indonesia', 'Teknik Pisau', 'Memanggang', 'Plating', 'Pengolahan Sayur', 'Dessert'],
                datasets: [
                    {
                        label: 'Bulan Lalu',
                        data: [65, 40, 50, 45, 55, 30],
                        backgroundColor: 'rgba(221, 221, 221, 0.2)',
                        borderColor: 'rgba(221, 221, 221, 1)',
                        borderWidth: 1,
                        pointBackgroundColor: 'rgba(221, 221, 221, 1)'
                    },
                    {
                        label: 'Sekarang',
                        data: [85, 60, 70, 65, 75, 50],
                        backgroundColor: 'rgba(78, 115, 223, 0.2)',
                        borderColor: 'rgba(78, 115, 223, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(78, 115, 223, 1)'
                    },
                    {
                        label: 'Rata-rata Pengguna',
                        data: [70, 55, 65, 50, 60, 40],
                        backgroundColor: 'rgba(246, 211, 101, 0.2)',
                        borderColor: 'rgba(246, 211, 101, 1)',
                        borderWidth: 1,
                        pointBackgroundColor: 'rgba(246, 211, 101, 1)',
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
document.querySelector(".statistik").classList.add("active");