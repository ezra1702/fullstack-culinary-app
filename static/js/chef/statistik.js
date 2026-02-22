/* ---- DATA ---- */
const months = ['Jul','Agu','Sep','Okt','Nov','Des'];
const grossData  = [28,32,30,38,42,45.75];
const netData    = [25,29,27,34,38,41.18];
const stuData    = [98,108,118,130,144,156];

const classesData = [
  {name:'Masakan Padang Autentik',  cat:'Masakan Nusantara', students:48, revenue:14400000, rating:4.9, completion:85, trend:'+12%', dir:'up'},
  {name:'Kue & Pastry Modern',      cat:'Bakeri & Pastry',   students:36, revenue:10800000, rating:4.8, completion:78, trend:'+8%',  dir:'up'},
  {name:'Sushi & Japanese Food',    cat:'Masakan Jepang',    students:29, revenue:11600000, rating:4.7, completion:72, trend:'+5%',  dir:'up'},
  {name:'BBQ & Grilling Technique', cat:'Masakan Barat',     students:22, revenue:8800000,  rating:4.6, completion:68, trend:'-2%',  dir:'down'},
  {name:'Dimsum & Chinese Cuisine', cat:'Masakan Cina',      students:21, revenue:6300000,  rating:4.5, completion:65, trend:'+3%',  dir:'up'},
];

const catData = [
  {name:'Masakan Nusantara',pct:38,color:'#2e8b57'},
  {name:'Bakeri & Pastry',  pct:28,color:'#5bc88a'},
  {name:'Masakan Jepang',   pct:18,color:'#85dba8'},
  {name:'Masakan Barat',    pct:10,color:'#f59e0b'},
  {name:'Lainnya',          pct:6, color:'#0891b2'},
];

const reviewsData = [
  {name:'Sari Wulandari',   stars:5, text:'Materi sangat detail dan mudah dipraktikkan di rumah. Chef Budi menjelaskan dengan sabar dan runtut!', date:'20 Feb 2026'},
  {name:'Hendra Kusuma',    stars:5, text:'Kelas terbaik yang pernah saya ikuti. Teknik memasak jadi lebih baik setelah ikut kelas ini.', date:'18 Feb 2026'},
  {name:'Dewi Rahayu',      stars:4, text:'Sangat bermanfaat dan informatif. Video kualitasnya jernih, penjelasannya runtut dan mudah diikuti.', date:'15 Feb 2026'},
  {name:'Andi Prasetyo',    stars:5, text:'Resep-resepnya bisa langsung dipraktikkan dan hasilnya memuaskan. Worth every penny! Highly recommended.', date:'12 Feb 2026'},
  {name:'Maya Sari',        stars:4, text:'Konten lengkap dan chef-nya responsif saat ada pertanyaan di forum diskusi. Pasti balik lagi!', date:'10 Feb 2026'},
];

const insightsData = [
  {type:'',       icon:'fas fa-rocket',             title:'Peluang Upsell',        text:'35 murid kelas Basic berpotensi upgrade ke Premium. Kirim penawaran spesial untuk meningkatkan konversi.'},
  {type:'warn',   icon:'fas fa-exclamation-triangle',title:'Completion Rate Rendah', text:'Kelas BBQ memiliki completion rate terendah (68%). Pertimbangkan menambah sesi Q&A atau materi pendukung.'},
  {type:'success',icon:'fas fa-star',               title:'Rating Meningkat!',      text:'Rating rata-rata naik dari 4.5 → 4.7 bulan ini. Murid sangat menghargai cara mengajar Anda.'},
  {type:'info',   icon:'fas fa-calendar-plus',      title:'Waktu Terbaik Rilis',    text:'Data menunjukkan engagement tertinggi di Kamis–Sabtu. Jadwalkan rilis kelas baru di hari-hari tersebut.'},
];

/* ---- CHART DEFAULTS ---- */
Chart.defaults.font.family = "'Plus Jakarta Sans',sans-serif";
Chart.defaults.font.size   = 12;
Chart.defaults.color       = '#6b8a77';
Chart.defaults.plugins.legend.display = false;
const grid = 'rgba(208,232,217,.5)';

/* ---- MINI CHARTS ---- */
function miniLine(id, data, color) {
  new Chart(document.getElementById(id), {
    type:'line',
    data:{labels:months, datasets:[{data, borderColor:color, borderWidth:2, pointRadius:0, fill:true,
      backgroundColor: c => {
        const g = c.chart.ctx.createLinearGradient(0,0,0,50);
        g.addColorStop(0,color+'44'); g.addColorStop(1,color+'00'); return g;
      }
    }]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{tooltip:{enabled:false}},
      scales:{x:{display:false},y:{display:false}}}
  });
}
miniLine('mini1',[28,32,30,38,42,45.75],'#2e8b57');
miniLine('mini2',[98,108,118,130,144,156],'#059669');
miniLine('mini3',[5,5,6,6,7,8],'#d97706');
miniLine('mini4',[72,74,73,75,77,78.5],'#0891b2');

/* ---- REVENUE CHART ---- */
let revChart;
function buildRevChart(type='line') {
  const ctx = document.getElementById('revenueChart');
  if(revChart) revChart.destroy();
  const mkGrad = (c, col) => {
    const g = c.createLinearGradient(0,0,0,360);
    g.addColorStop(0,col+'55'); g.addColorStop(1,col+'00'); return g;
  };
  revChart = new Chart(ctx, {
    type,
    data:{labels:months, datasets:[
      {label:'Pendapatan Kotor', data:grossData,
       borderColor:'#2e8b57', borderWidth:2.5, pointRadius:4, pointHoverRadius:7, tension:.35, fill:true,
       backgroundColor: type==='line' ? c=>mkGrad(c.chart.ctx,'#2e8b57') : 'rgba(46,139,87,.75)'},
      {label:'Pendapatan Bersih', data:netData,
       borderColor:'#059669', borderWidth:2.5, pointRadius:4, pointHoverRadius:7, tension:.35, fill:true,
       backgroundColor: type==='line' ? c=>mkGrad(c.chart.ctx,'#059669') : 'rgba(5,150,105,.6)'},
    ]},
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{display:true, position:'bottom', labels:{usePointStyle:true,padding:20,font:{size:12,weight:'600'}}},
        tooltip:{mode:'index',intersect:false, callbacks:{label: c=>` ${c.dataset.label}: Rp ${c.parsed.y.toFixed(2)}jt`}}
      },
      scales:{
        x:{grid:{color:grid,drawTicks:false},ticks:{padding:8}},
        y:{grid:{color:grid},ticks:{callback:v=>`Rp ${v}jt`,padding:8},beginAtZero:false}
      }
    }
  });
}
buildRevChart('line');
function toggleChart(btn, type) {
  document.querySelectorAll('.btn-toggle').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); buildRevChart(type);
}

/* ---- STUDENT CHART ---- */
new Chart(document.getElementById('studentChart'), {
  type:'bar',
  data:{labels:months, datasets:[{label:'Murid', data:stuData,
    backgroundColor: c=>{const g=c.chart.ctx.createLinearGradient(0,0,0,360); g.addColorStop(0,'#2e8b57'); g.addColorStop(1,'#85dba8'); return g;},
    borderRadius:8, borderSkipped:false
  }]},
  options:{responsive:true,maintainAspectRatio:false,
    plugins:{tooltip:{callbacks:{label:c=>` ${c.parsed.y} murid`}}},
    scales:{x:{grid:{display:false},ticks:{padding:8}},y:{grid:{color:grid},beginAtZero:false,ticks:{padding:8}}}
  }
});

/* ---- PIE CHART ---- */
new Chart(document.getElementById('pieChart'), {
  type:'doughnut',
  data:{labels:catData.map(c=>c.name), datasets:[{data:catData.map(c=>c.pct), backgroundColor:catData.map(c=>c.color), borderWidth:0, hoverOffset:8}]},
  options:{responsive:true,maintainAspectRatio:false,cutout:'65%',
    plugins:{legend:{display:true,position:'right',labels:{usePointStyle:true,padding:12,font:{size:11}}},
      tooltip:{callbacks:{label:c=>` ${c.label}: ${c.parsed}%`}}}
  }
});
const catList = document.getElementById('cat-list');
catData.forEach(c=>{
  catList.innerHTML+=`<div class="cat-item">
    <div class="cat-top"><span class="cat-name">${c.name}</span><span class="cat-pct">${c.pct}%</span></div>
    <div class="cat-bar"><div class="cat-fill" style="width:${c.pct}%;background:${c.color}"></div></div>
  </div>`;
});

/* ---- DEMOGRAPHICS ---- */
new Chart(document.getElementById('demoChart'), {
  type:'bar',
  data:{labels:['18-24','25-34','35-44','45-54','55+'],
    datasets:[
      {label:'Perempuan',data:[18,32,24,12,6],backgroundColor:'rgba(46,139,87,.8)',borderRadius:6,borderSkipped:false},
      {label:'Laki-laki',data:[12,28,20,16,8],backgroundColor:'rgba(92,200,138,.65)',borderRadius:6,borderSkipped:false},
    ]},
  options:{responsive:true,maintainAspectRatio:false,barPercentage:.6,
    plugins:{legend:{display:true,position:'bottom',labels:{usePointStyle:true,padding:16,font:{size:11,weight:'600'}}}},
    scales:{x:{grid:{display:false},ticks:{padding:8}},y:{grid:{color:grid},ticks:{padding:8}}}
  }
});

/* ---- RANKING ---- */
function updateRanking(metric) {
  const sorted = [...classesData].sort((a,b)=>
    metric==='revenue' ? b.revenue-a.revenue : metric==='rating' ? b.rating-a.rating : b.students-a.students
  );
  const el = document.getElementById('ranking-list');
  el.innerHTML = sorted.map((c,i)=>{
    let val, sub;
    if(metric==='revenue'){val=`Rp ${(c.revenue/1e6).toFixed(1)}jt`;sub=`${c.students} murid`;}
    else if(metric==='rating'){val=`${c.rating} ⭐`;sub=`${c.students} murid`;}
    else{val=`${c.students} murid`;sub=`Rating ${c.rating}`;}
    return `<div class="rank-item">
      <div class="rank-num">${i+1}</div>
      <div class="rank-info"><div class="rank-name">${c.name}</div><div class="rank-meta">${sub}</div></div>
      <div class="rank-val">${val}</div>
    </div>`;
  }).join('');
}
updateRanking('students');

/* ---- REVIEWS ---- */
const revList = document.getElementById('reviews-list');
reviewsData.forEach(r=>{
  const stars  = '<i class="fas fa-star"></i>'.repeat(r.stars) + '<i class="far fa-star"></i>'.repeat(5-r.stars);
  const init   = r.name.charAt(0);
  const colors = ['#2e8b57','#059669','#0891b2','#d97706','#5bc88a'];
  const bg     = colors[Math.floor(Math.random()*colors.length)];
  revList.innerHTML += `<div class="rev-item">
    <div class="rev-top">
      <div class="rev-user">
        <div class="rev-avatar" style="background:${bg}">${init}</div>
        <div><div class="rev-name">${r.name}</div><div class="rev-date">${r.date}</div></div>
      </div>
      <div class="rev-stars-right">${stars}</div>
    </div>
    <div class="rev-text">${r.text}</div>
  </div>`;
});

/* ---- TABLE ---- */
function buildTable(data) {
  document.getElementById('tbl-body').innerHTML = data.map(c=>{
    const cc = c.completion>=80?'high':c.completion>=65?'med':'low';
    const ci = c.completion>=80?'✓':c.completion>=65?'!':'↓';
    return `<tr>
      <td class="td-name">${c.name}</td>
      <td><span class="td-cat">${c.cat}</span></td>
      <td><i class="fas fa-user" style="color:var(--green-400);font-size:.78rem;margin-right:5px"></i>${c.students}</td>
      <td class="td-rev">Rp ${(c.revenue/1e6).toFixed(1)}jt</td>
      <td><span class="td-stars">${'★'.repeat(Math.round(c.rating))}</span> ${c.rating}</td>
      <td><span class="td-completion ${cc}">${ci} ${c.completion}%</span></td>
      <td><span class="td-trend ${c.dir}">${c.dir==='up'?'↑':'↓'} ${c.trend}</span></td>
      <td><button class="btn-view" onclick="alert('📚 ${c.name}')"><i class="fas fa-eye"></i> Detail</button></td>
    </tr>`;
  }).join('');
}
buildTable(classesData);
function filterTable(q) { buildTable(classesData.filter(c=>c.name.toLowerCase().includes(q.toLowerCase()))); }

/* ---- INSIGHTS ---- */
const ig = document.getElementById('insights-grid');
insightsData.forEach(ins=>{
  ig.innerHTML+=`<div class="insight-card ${ins.type}">
    <div class="ins-top"><div class="ins-icon"><i class="${ins.icon}"></i></div><div class="ins-title">${ins.title}</div></div>
    <div class="ins-text">${ins.text}</div>
    <button class="ins-btn">Lihat Detail <i class="fas fa-arrow-right" style="margin-left:4px;font-size:.72rem"></i></button>
  </div>`;
});

/* ---- ACTIONS ---- */
function exportReport() { alert('📊 Laporan sedang disiapkan...'); }
function requestPayout() { if(confirm('Request payout Rp 8.250.000?')) alert('✅ Request payout berhasil!'); }
function confirmLogout(e) { e.preventDefault(); if(confirm('Yakin ingin keluar?')) alert('Sampai jumpa!'); }
function refreshSpin(btn) {
  btn.style.transition='transform .6s ease'; btn.style.transform='rotate(360deg)';
  setTimeout(()=>{btn.style.transform='';btn.style.transition='';},700);
}
