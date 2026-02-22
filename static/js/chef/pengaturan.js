// ── SELECTED ICON ──

let selectedIcon = 'fa-utensils';
const iconColors = ['#8b5cf6','#dc2626','#059669','#d97706','#0891b2','#ec4899','#f59e0b','#7c3aed'];
let colorIndex = 0;

function selectIcon(btn) {
  document.querySelectorAll('.icon-opt').forEach(b => {
    b.style.border = '2px solid var(--gray-md)';
    b.style.background = 'var(--gray-lt)';
  });
  btn.style.border = '2px solid var(--primary)';
  btn.style.background = 'var(--primary-bg)';
  selectedIcon = btn.dataset.icon;
}

// ── TAB SWITCH ──
function switchTab(name, btn) {
  document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.snav-item').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
}

// ── DIRTY STATE ──
let isDirty = false;
function markDirty() { isDirty = true; document.getElementById('save-bar').classList.add('show'); }
function discardChanges() { isDirty = false; document.getElementById('save-bar').classList.remove('show'); showToast('Perubahan dibuang.',''); }
function saveSection(lbl) { isDirty = false; document.getElementById('save-bar').classList.remove('show'); showToast(lbl + ' berhasil disimpan!','success'); }
function resetForm() { isDirty = false; document.getElementById('save-bar').classList.remove('show'); showToast('Form direset.',''); }

// ── TOAST ──
function showToast(msg, type) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.className = 'toast ' + (type||'') + ' show';
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── AVATAR ──
function previewAvatar(input) {
  if (!input.files[0]) return;
  const r = new FileReader();
  r.onload = e => { document.getElementById('av-preview').src = e.target.result; document.getElementById('sidebar-avatar').src = e.target.result; };
  r.readAsDataURL(input.files[0]);
  markDirty();
}

// ── FILE UPLOAD ──
function handleFile(input, prevId, boxId) {
  if (!input.files[0]) return;
  const f = input.files[0];
  const p = document.getElementById(prevId);
  p.querySelector('.fp-name').textContent = f.name;
  p.querySelector('.fp-size').textContent = (f.size/1024/1024).toFixed(2) + ' MB';
  p.classList.add('show');
  document.getElementById(boxId).style.borderColor = 'var(--primary)';
  markDirty();
}
function removeFile(prevId, boxId) {
  document.getElementById(prevId).classList.remove('show');
  document.getElementById(boxId).style.borderColor = '';
  markDirty();
}

// ── PASSWORD ──
function checkStrength(v) {
  let s = 0;
  if(v.length>=8) s++; if(/[A-Z]/.test(v)) s++; if(/[0-9]/.test(v)) s++; if(/[^A-Za-z0-9]/.test(v)) s++;
  ['pb1','pb2','pb3','pb4'].forEach((id,i) => {
    const el = document.getElementById(id); el.className = 'pwd-bar';
    if(i<s) el.classList.add(s<=1?'weak':s<=2?'medium':'strong');
  });
  const labels = ['','Lemah','Sedang','Kuat','Sangat Kuat'];
  const colors = ['var(--text-ltr)','var(--danger)','var(--warning)','var(--success)','var(--success)'];
  const lbl = document.getElementById('pwd-lbl');
  lbl.textContent = v ? labels[s] : 'Masukkan password baru'; lbl.style.color = colors[s];
  markDirty();
}
function checkConfirm() {
  const n = document.getElementById('new-pwd').value, c = document.getElementById('conf-pwd').value;
  const m = document.getElementById('conf-msg');
  if(!c){m.textContent='';return;}
  m.textContent = n===c ? '✓ Password cocok' : '✗ Password tidak cocok';
  m.style.color  = n===c ? 'var(--success)' : 'var(--danger)';
  markDirty();
}

// ══════════════════════════════════
// PENDIDIKAN — CARD SYSTEM
// ══════════════════════════════════
function toggleEduForm() {
  const f = document.getElementById('edu-add-form');
  f.classList.toggle('show');
  if(f.classList.contains('show')) { document.getElementById('edu-nama').focus(); }
}

function addEdu() {
  const nama   = document.getElementById('edu-nama').value.trim();
  const jurusan= document.getElementById('edu-jurusan').value.trim();
  const masuk  = document.getElementById('edu-masuk').value;
  const lulus  = document.getElementById('edu-lulus').value || 'Sekarang';
  if (!nama) { showToast('Nama institusi wajib diisi!','error'); return; }

  const card = document.createElement('div');
  card.className = 'edu-card';
  const tahun = masuk ? ` ${masuk} – ${lulus}` : '';
  card.innerHTML = `
    <div class="edu-card-body">
      <div class="edu-card-icon"><i class="fas fa-university"></i></div>
      <div class="edu-card-info">
        <div class="edu-card-institusi">${nama}</div>
        <div class="edu-card-detail">
          ${jurusan ? `<span><i class="fas fa-award" style="margin-right:3px;color:var(--primary)"></i>${jurusan}</span>` : ''}
          ${tahun ? `<span class="edu-badge"><i class="fas fa-calendar-alt"></i>${tahun}</span>` : ''}
        </div>
      </div>
    </div>
    <div class="edu-card-actions">
      <button class="btn-action-sm btn-edit-card" onclick="toggleEduEdit(this)"><i class="fas fa-pen"></i> Edit</button>
      <button class="btn-action-sm btn-del-card" onclick="deleteEduCard(this)"><i class="fas fa-trash"></i> Hapus</button>
    </div>
    <div class="edu-edit-form">
      <div class="form-grid g2">
        <div class="form-group full"><label class="form-label">Nama Institusi <span class="req">*</span></label><input type="text" class="form-control" value="${nama}"></div>
        <div class="form-group full"><label class="form-label">Jurusan / Program Studi</label><input type="text" class="form-control" value="${jurusan}"></div>
        <div class="form-group"><label class="form-label">Tahun Masuk</label><input type="number" class="form-control" value="${masuk}" min="1980" max="2030"></div>
        <div class="form-group"><label class="form-label">Tahun Lulus</label><input type="number" class="form-control" value="${document.getElementById('edu-lulus').value}" min="1980" max="2030" placeholder="Kosong = Sekarang"></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:6px">
        <button class="btn btn-primary btn-sm" onclick="saveEduEdit(this)"><i class="fas fa-check"></i> Simpan</button>
        <button class="btn btn-outline btn-sm" onclick="toggleEduEdit(this)"><i class="fas fa-times"></i> Batal</button>
      </div>
    </div>`;
  document.getElementById('edu-list').appendChild(card);

  // Clear form
  ['edu-nama','edu-jurusan','edu-masuk','edu-lulus'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('edu-add-form').classList.remove('show');
  markDirty();
  showToast('Pendidikan berhasil ditambahkan!','success');
}

function toggleEduEdit(btn) {
  const card = btn.closest('.edu-card');
  const form = card.querySelector('.edu-edit-form');
  form.classList.toggle('show');
}

function saveEduEdit(btn) {
  const form = btn.closest('.edu-edit-form');
  const card = form.closest('.edu-card');
  const inputs = form.querySelectorAll('input');
  const nama    = inputs[0].value.trim();
  const jurusan = inputs[1].value.trim();
  const masuk   = inputs[2].value;
  const lulus   = inputs[3].value || 'Sekarang';
  if(!nama){showToast('Nama institusi wajib!','error');return;}

  card.querySelector('.edu-card-institusi').textContent = nama;
  const detail = card.querySelector('.edu-card-detail');
  detail.innerHTML = `
    ${jurusan?`<span><i class="fas fa-award" style="margin-right:3px;color:var(--primary)"></i>${jurusan}</span>`:''}
    ${masuk?`<span class="edu-badge"><i class="fas fa-calendar-alt"></i> ${masuk} – ${lulus}</span>`:''}`;
  form.classList.remove('show');
  markDirty(); showToast('Pendidikan diperbarui!','success');
}

function deleteEduCard(btn) {
  if(!confirm('Hapus data pendidikan ini?')) return;
  btn.closest('.edu-card').remove();
  markDirty(); showToast('Pendidikan dihapus.','');
}

// ══════════════════════════════════
// SPESIALISASI — CARD SYSTEM
// ══════════════════════════════════
function toggleSpecForm() {
  const f = document.getElementById('spec-add-form');
  f.classList.toggle('show');
  if(f.classList.contains('show')) document.getElementById('spec-nama-inp').focus();
}

const levelConfig = {
  beginner:     { label:'Pemula',   color:'var(--success)', dots:[true,false,false] },
  intermediate: { label:'Menengah', color:'var(--warning)', dots:[true,true,false] },
  expert:       { label:'Ahli',     color:'var(--primary)', dots:[true,true,true] },
};

function buildDots(level) {
  const cfg = levelConfig[level];
  return cfg.dots.map(f => `<div class="level-dot${f?' filled '+level:''}"></div>`).join('');
}

function addSpec() {
  const nama  = document.getElementById('spec-nama-inp').value.trim();
  const level = document.getElementById('spec-level-inp').value;
  const exp   = document.getElementById('spec-exp-inp').value;
  if(!nama){showToast('Nama spesialisasi wajib diisi!','error');return;}

  const cfg   = levelConfig[level];
  const color = iconColors[colorIndex % iconColors.length]; colorIndex++;
  const icon  = selectedIcon;

  const card = document.createElement('div');
  card.className = 'spec-card';
  card.innerHTML = `
    <div class="spec-card-top">
      <div class="spec-icon-wrap" style="background:${color}"><i class="fas ${icon}"></i></div>
      <div class="spec-card-menu">
        <button class="spec-card-btn edit" onclick="toggleSpecEdit(this)" title="Edit"><i class="fas fa-pen"></i></button>
        <button class="spec-card-btn del" onclick="deleteSpecCard(this)" title="Hapus"><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <div class="spec-nama">${nama}</div>
    <div class="spec-meta">
      <div class="spec-level">
        <div class="level-dots">${buildDots(level)}</div>
        <span style="font-size:.73rem;color:${cfg.color};font-weight:700">${cfg.label}</span>
      </div>
      ${exp ? `<div class="spec-exp"><i class="fas fa-clock"></i> ${exp} tahun pengalaman</div>` : ''}
    </div>
    <div class="spec-edit-form">
      <div class="sef-title"><i class="fas fa-pen"></i> Edit Spesialisasi</div>
      <input type="text" class="form-control" value="${nama}" placeholder="Nama spesialisasi">
      <select class="form-control">
        <option value="beginner"${level==='beginner'?' selected':''}>Pemula</option>
        <option value="intermediate"${level==='intermediate'?' selected':''}>Menengah</option>
        <option value="expert"${level==='expert'?' selected':''}>Ahli</option>
      </select>
      <input type="number" class="form-control" value="${exp}" placeholder="Tahun pengalaman" min="0" max="50">
      <div class="spec-edit-actions">
        <button class="btn btn-primary btn-xs" onclick="saveSpecEdit(this)"><i class="fas fa-check"></i> Simpan</button>
        <button class="btn btn-outline btn-xs" onclick="toggleSpecEdit(this)"><i class="fas fa-times"></i></button>
      </div>
    </div>`;

  document.getElementById('spec-grid').appendChild(card);
  document.getElementById('spec-nama-inp').value = '';
  document.getElementById('spec-exp-inp').value  = '';
  document.getElementById('spec-add-form').classList.remove('show');
  markDirty(); showToast('Spesialisasi berhasil ditambahkan!','success');
}

function toggleSpecEdit(btn) {
  const card = btn.closest('.spec-card');
  const form = card.querySelector('.spec-edit-form');
  // close others in same card
  form.classList.toggle('show');
}

function saveSpecEdit(btn) {
  const form  = btn.closest('.spec-edit-form');
  const card  = form.closest('.spec-card');
  const inputs = form.querySelectorAll('input,select');
  const nama   = inputs[0].value.trim();
  const level  = inputs[1].value;
  const exp    = inputs[2].value;
  if(!nama){showToast('Nama spesialisasi wajib!','error');return;}

  const cfg = levelConfig[level];
  card.querySelector('.spec-nama').textContent = nama;
  card.querySelector('.spec-level').innerHTML =
    `<div class="level-dots">${buildDots(level)}</div>
     <span style="font-size:.73rem;color:${cfg.color};font-weight:700">${cfg.label}</span>`;
  const expEl = card.querySelector('.spec-exp');
  if(expEl) expEl.innerHTML = exp ? `<i class="fas fa-clock"></i> ${exp} tahun pengalaman` : '';
  form.classList.remove('show');
  markDirty(); showToast('Spesialisasi diperbarui!','success');
}

function deleteSpecCard(btn) {
  if(!confirm('Hapus spesialisasi ini?')) return;
  btn.closest('.spec-card').remove();
  markDirty(); showToast('Spesialisasi dihapus.','');
}

// ══════════════════════════════════
// RIWAYAT KERJA
// ══════════════════════════════════
function toggleWorkForm() {
  const f = document.getElementById('work-add-form');
  f.classList.toggle('show');
  if(f.classList.contains('show')) document.getElementById('wk-posisi').focus();
}
function toggleWorkEdit(btn) {
  btn.closest('.work-card').querySelector('.work-edit-form').classList.toggle('show');
}
function saveWorkEdit(btn) {
  const form   = btn.closest('.work-edit-form');
  const card   = form.closest('.work-card');
  const inputs = form.querySelectorAll('input');
  const posisi = inputs[0].value.trim(), tempat = inputs[1].value.trim();
  const mulai  = inputs[2].value, selesai = inputs[3].value || 'Sekarang';
  if(!posisi||!tempat){showToast('Posisi dan tempat wajib!','error');return;}
  card.querySelector('.work-posisi').textContent = posisi;
  card.querySelector('.work-tempat').textContent = `${tempat}${mulai?' ('+mulai+' – '+selesai+')':''}`;
  form.classList.remove('show');
  markDirty(); showToast('Riwayat kerja diperbarui!','success');
}
function deleteWorkCard(btn) {
  if(!confirm('Hapus riwayat kerja ini?')) return;
  btn.closest('.work-card').remove();
  markDirty(); showToast('Riwayat kerja dihapus.','');
}
function addWork() {
  const posisi  = document.getElementById('wk-posisi').value.trim();
  const tempat  = document.getElementById('wk-tempat').value.trim();
  const mulai   = document.getElementById('wk-mulai').value;
  const selesai = document.getElementById('wk-selesai').value || 'Sekarang';
  if(!posisi||!tempat){showToast('Posisi dan tempat wajib!','error');return;}

  const card = document.createElement('div');
  card.className = 'work-card';
  card.innerHTML = `
    <div class="work-card-body">
      <div class="work-icon"><i class="fas fa-utensils"></i></div>
      <div class="work-info">
        <div class="work-posisi">${posisi}</div>
        <div class="work-tempat">${tempat}${mulai?' ('+mulai+' – '+selesai+')':''}</div>
      </div>
    </div>
    <div class="work-card-actions">
      <button class="btn-action-sm btn-edit-card" onclick="toggleWorkEdit(this)"><i class="fas fa-pen"></i> Edit</button>
      <button class="btn-action-sm btn-del-card" onclick="deleteWorkCard(this)"><i class="fas fa-trash"></i> Hapus</button>
    </div>
    <div class="work-edit-form">
      <div class="form-grid g2">
        <div class="form-group"><label class="form-label">Posisi <span class="req">*</span></label><input type="text" class="form-control" value="${posisi}"></div>
        <div class="form-group"><label class="form-label">Tempat <span class="req">*</span></label><input type="text" class="form-control" value="${tempat}"></div>
        <div class="form-group"><label class="form-label">Tahun Mulai</label><input type="number" class="form-control" value="${mulai}"></div>
        <div class="form-group"><label class="form-label">Tahun Selesai</label><input type="number" class="form-control" value="${document.getElementById('wk-selesai').value}"></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:6px">
        <button class="btn btn-primary btn-sm" onclick="saveWorkEdit(this)"><i class="fas fa-check"></i> Simpan</button>
        <button class="btn btn-outline btn-sm" onclick="toggleWorkEdit(this)"><i class="fas fa-times"></i> Batal</button>
      </div>
    </div>`;
  document.getElementById('work-list').appendChild(card);
  ['wk-posisi','wk-tempat','wk-mulai','wk-selesai'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('work-add-form').classList.remove('show');
  markDirty(); showToast('Riwayat kerja ditambahkan!','success');
}

// ── LOGOUT ──
function confirmLogout(e) { e.preventDefault(); if(confirm('Yakin ingin keluar?')) showToast('Sampai jumpa, Chef! 👋',''); }

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ktp-prev').classList.add('show');
  document.getElementById('cv-prev').classList.add('show');
});
document.querySelector(".pengaturan").classList.add("active");