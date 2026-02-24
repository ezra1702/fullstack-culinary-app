/* ============================================================
   admin_dashboard.js
   Virtual Culinary Experience – Admin Panel
============================================================ */

'use strict';

/* ============================================================
   SIDEBAR HAMBURGER
============================================================ */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar      = document.querySelector('.admin-sidebar');

hamburgerBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (window.innerWidth <= 960 && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  }
});

/* ============================================================
   GLOBAL SEARCH (live filter on table rows)
============================================================ */
document.getElementById('globalSearch')?.addEventListener('input', function () {
  const q = this.value.toLowerCase().trim();
  document.querySelectorAll('#tableBody tr').forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
});

/* ============================================================
   MODAL HELPERS
============================================================ */
/** @param {string} id */
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/** @param {string} id */
function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on overlay click
document.addEventListener('click', (e) => {
  document.querySelectorAll('.modal-overlay.open').forEach(modal => {
    if (e.target === modal) closeModal(modal.id);
  });
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});

/* ============================================================
   DATA EXTRACTOR — read from row's data-* attributes
============================================================ */
function getRowData(row) {
  function safe(str, fallback) {
    try { return JSON.parse(str || ''); }
    catch { return fallback; }
  }

  const role    = (row.dataset.role || '').toLowerCase();
  const isOnline = (row.dataset.status || '').toLowerCase() === 'online';
  const namaDepan    = row.dataset.namaDepan    || '';
  const namaBelakang = row.dataset.namaBelakang || '';

  const d = {
    namaDepan,
    namaBelakang,
    fullName   : (namaDepan + ' ' + namaBelakang).trim(),
    email      : row.dataset.email        || '',
    telp       : row.dataset.telp         || '-',
    role,
    status     : row.dataset.status       || 'offline',
    isOnline,
    joined     : row.dataset.join         || '',
    lastActivity: row.dataset.lastActivity || '-',
    totalOnline : parseInt(row.dataset.totalOnline || 0),
    // For avatar initial
    initial    : (namaDepan[0] || '?').toUpperCase(),
    avaStyle   : row.querySelector('.user-ava')?.style.background || 'var(--green)',
  };

  if (role === 'murid') {
    d.murid = {
      poin            : parseInt(row.dataset.poin            || 0),
      sertifikatCount : parseInt(row.dataset.sertifikatCount || 0),
      riwayatCount    : parseInt(row.dataset.riwayatCount    || 0),
      skills          : safe(row.dataset.skills, {}),
    };
  }

  if (role === 'chef') {
    d.chef = {
      rating      : parseFloat(row.dataset.rating    || 0).toFixed(2),
      totalMurid  : parseInt(row.dataset.totalMurid  || 0),
      pendapatan  : parseInt(row.dataset.pendapatan  || 0),
      noKtp       : row.dataset.noKtp                || '-',
      spesialisasi: safe(row.dataset.spesialisasi, []),
      pendidikan  : safe(row.dataset.pendidikan,   []),
      riwayatKerja: safe(row.dataset.riwayatKerja, []),
      sosmed      : safe(row.dataset.sosmed, {}),
    };
  }

  return d;
}

/* ============================================================
   HELPERS
============================================================ */
function formatRp(n) {
  return 'Rp ' + parseInt(n || 0).toLocaleString('id-ID');
}

function formatOnline(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return `${h}j ${m}m`;
}

/** Render tag chips into a container element */
function renderTags(el, data, color) {
  if (!el) return;
  el.innerHTML = '';

  let items = [];
  if (Array.isArray(data)) {
    items = data;
  } else if (data && typeof data === 'object') {
    // Skills: { "Baking": "85", "Pastry": "70" }
    items = Object.entries(data).map(([k, v]) => `${k} (${v}%)`);
  }

  if (!items.length) {
    el.innerHTML = '<span class="vtag-empty">Belum ada data</span>';
    return;
  }
  items.forEach(t => {
    const s = document.createElement('span');
    s.className = `vtag vtag-${color || 'green'}`;
    s.textContent = t;
    el.appendChild(s);
  });
}

function getRoleClass(role) {
  return { admin: 'role-admin', chef: 'role-chef', murid: 'role-murid' }[role] || 'role-murid';
}

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/* ============================================================
   ACTIVE ROW (shared state between view/edit/delete)
============================================================ */
let _activeRow = null;

/* ============================================================
   VIEW MODAL
============================================================ */

// Tab switching inside view modal
document.querySelectorAll('.vt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.vtab;
    document.querySelectorAll('.vt-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.vt-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`vt-pane-${tab}`)?.classList.add('active');
  });
});

function openViewModal(row) {
  _activeRow = row;
  const d = getRowData(row);

  // Reset tabs
  document.querySelectorAll('.vt-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.vt-pane').forEach(p => p.classList.remove('active'));
  document.querySelector('.vt-btn[data-vtab="info"]')?.classList.add('active');
  document.getElementById('vt-pane-info')?.classList.add('active');

  // ── Banner ──
  const ava = document.getElementById('viewBannerAva');
  ava.textContent   = d.initial;
  ava.style.background = d.avaStyle;

  setText('viewBannerName', d.fullName || '—');
  setText('viewBannerEmail', d.email);

  const roleBadge = document.getElementById('viewBannerRole');
  if (roleBadge) {
    roleBadge.textContent = capitalize(d.role);
    roleBadge.className   = 'role-tag ' + getRoleClass(d.role);
  }

  const statusPill = document.getElementById('viewBannerStatus');
  if (statusPill) {
    statusPill.textContent = d.isOnline ? '● Online' : '● Offline';
    statusPill.className   = 'status-pill ' + (d.isOnline ? 'pill-online' : 'pill-offline');
  }

  // ── Info Umum Tab ──
  setText('vi-email',   d.email        || '—');
  setText('vi-telp',    d.telp         || '—');
  setText('vi-role',    capitalize(d.role) || '—');
  setText('vi-status',  capitalize(d.status) || '—');
  setText('vi-join',    d.joined       || '—');
  setText('vi-lastact', d.lastActivity || '—');

  // ── Statistik Tab ──
  setText('vs-online',  formatOnline(d.totalOnline));
  setText('vs-lastact', d.lastActivity || '—');

  // ── Profil Tab — hide all role sections ──
  hide('vp-murid'); hide('vp-chef'); hide('vp-admin');

  if (d.role === 'murid' && d.murid) {
    document.getElementById('vt-profil-label').textContent = 'Profil Murid';
    show('vp-murid');
    setText('vp-poin',   d.murid.poin);
    setText('vp-sertif', d.murid.sertifikatCount);
    setText('vp-kelas',  d.murid.riwayatCount);
    renderTags(document.getElementById('vp-skills'), d.murid.skills, 'green');

  } else if (d.role === 'chef' && d.chef) {
    document.getElementById('vt-profil-label').textContent = 'Profil Chef';
    show('vp-chef');
    setText('vp-rating',      '⭐ ' + d.chef.rating);
    setText('vp-total-murid', d.chef.totalMurid);
    setText('vp-pendapatan',  formatRp(d.chef.pendapatan));
    setText('vp-ktp',         d.chef.noKtp || '—');

    renderTags(document.getElementById('vp-spesialisasi'), d.chef.spesialisasi, 'purple');

    // Pendidikan
    const pendEl = document.getElementById('vp-pendidikan');
    if (pendEl) {
      pendEl.innerHTML = '';
      if (d.chef.pendidikan.length) {
        d.chef.pendidikan.forEach(p => {
          const li = document.createElement('li');
          li.textContent = p;
          pendEl.appendChild(li);
        });
      } else {
        pendEl.innerHTML = '<li class="vtag-empty">Belum ada data</li>';
      }
    }

    // Riwayat Kerja
    const rwEl = document.getElementById('vp-riwayat');
    if (rwEl) {
      rwEl.innerHTML = '';
      if (d.chef.riwayatKerja.length) {
        d.chef.riwayatKerja.forEach(r => {
          const div = document.createElement('div');
          div.className = 'riwayat-item';
          div.innerHTML = `
            <div class="riwayat-icon"><i class="fas fa-briefcase"></i></div>
            <div class="riwayat-body">
              <strong>${r.posisi || '—'}</strong>
              <span>${r.tempat || '—'}</span>
              ${r.tahun ? `<span class="riwayat-tahun">${r.tahun}</span>` : ''}
            </div>`;
          rwEl.appendChild(div);
        });
      } else {
        rwEl.innerHTML = '<span class="vtag-empty">Belum ada riwayat kerja</span>';
      }
    }

    // Sosmed
    const smEl = document.getElementById('vp-sosmed');
    if (smEl) {
      smEl.innerHTML = '';
      const smMap = {
        instagram: { icon: 'fab fa-instagram', color: '#e1306c', label: 'Instagram' },
        youtube  : { icon: 'fab fa-youtube',   color: '#ff0000', label: 'YouTube'   },
        tiktok   : { icon: 'fab fa-tiktok',    color: '#333',    label: 'TikTok'    },
      };
      const keys = Object.keys(d.chef.sosmed).filter(k => d.chef.sosmed[k]);
      if (keys.length) {
        keys.forEach(key => {
          const url  = d.chef.sosmed[key];
          const meta = smMap[key.toLowerCase()] || { icon: 'fas fa-link', color: '#666', label: key };
          const a = document.createElement('a');
          a.href = url; a.target = '_blank'; a.rel = 'noopener';
          a.className = 'sosmed-link';
          a.innerHTML = `
            <i class="${meta.icon}" style="color:${meta.color}"></i>
            <span>${meta.label}</span>
            <i class="fas fa-arrow-up-right-from-square sosmed-ext"></i>`;
          smEl.appendChild(a);
        });
      } else {
        smEl.innerHTML = '<span class="vtag-empty">Belum ada link sosmed</span>';
      }
    }

  } else {
    document.getElementById('vt-profil-label').textContent = 'Profil';
    show('vp-admin');
  }

  openModal('viewUserModal');
}

/** Called from "Edit User Ini" in View modal */
function switchViewToEdit() {
  closeModal('viewUserModal');
  setTimeout(() => {
    if (_activeRow) openEditModal(_activeRow);
  }, 150);
}

/* ============================================================
   EDIT MODAL
============================================================ */
function openEditModal(row) {
  _activeRow = row;
  const d = getRowData(row);

  // Preview bar
  const prevAva = document.getElementById('editPreviewAva');
  prevAva.textContent      = d.initial;
  prevAva.style.background = d.avaStyle;
  setText('editPreviewName', d.fullName);

  // Basic fields
  val('e-namaDepan',   d.namaDepan);
  val('e-namaBelakang', d.namaBelakang);
  val('e-email',       d.email);
  val('e-telp',        d.telp !== '-' ? d.telp : '');
  val('e-role',        d.role);
  val('e-status',      d.isOnline ? 'online' : 'offline');

  // Murid fields
  if (d.murid) {
    val('e-poin', d.murid.poin || 0);
    const skillArr = Array.isArray(d.murid.skills)
      ? d.murid.skills
      : Object.keys(d.murid.skills || {});
    val('e-skills', skillArr.join(', '));
  } else {
    val('e-poin', 0); val('e-skills', '');
  }

  // Chef fields
  if (d.chef) {
    val('e-ktp',         d.chef.noKtp !== '-' ? d.chef.noKtp : '');
    val('e-pendapatan',  d.chef.pendapatan || 0);
    val('e-rating',      d.chef.rating     || '0.00');
    val('e-total-murid', d.chef.totalMurid || 0);
    val('e-spesialisasi',(d.chef.spesialisasi || []).join(', '));
    val('e-pendidikan',  (d.chef.pendidikan   || []).join(', '));
    val('e-ig', d.chef.sosmed.instagram || '');
    val('e-yt', d.chef.sosmed.youtube   || '');
    val('e-tt', d.chef.sosmed.tiktok    || '');
  } else {
    ['e-ktp','e-pendapatan','e-rating','e-total-murid','e-spesialisasi','e-pendidikan','e-ig','e-yt','e-tt']
      .forEach(id => val(id, ''));
  }

  onEditRoleChange();
  openModal('editUserModal');
}

function onEditRoleChange() {
  const role = document.getElementById('e-role')?.value;
  const muridSec = document.getElementById('e-section-murid');
  const chefSec  = document.getElementById('e-section-chef');
  if (muridSec) muridSec.style.display = role === 'murid' ? 'block' : 'none';
  if (chefSec)  chefSec.style.display  = role === 'chef'  ? 'block' : 'none';
}

function submitEditUser(e) {
  e.preventDefault();

  const namaDepan    = gval('e-namaDepan').trim();
  const namaBelakang = gval('e-namaBelakang').trim();
  const email        = gval('e-email').trim();
  const telp         = gval('e-telp').trim();
  const role         = gval('e-role');
  const status       = gval('e-status');

  if (!namaDepan || !email) {
    showToast('Mohon lengkapi field yang wajib diisi!', 'error');
    return;
  }

  const row = _activeRow;
  if (!row) return;

  // ── Update row DOM ──
  // Name
  const nameEl = row.querySelector('.user-name');
  if (nameEl) nameEl.textContent = [namaDepan, namaBelakang].filter(Boolean).join(' ');
  const subEl = row.querySelector('.user-sub');
  if (subEl && telp) subEl.textContent = telp;

  // Email
  const emailCell = row.querySelector('.cell-email');
  if (emailCell) emailCell.textContent = email;

  // Role badge
  const badge = row.querySelector('.role-tag');
  if (badge) { badge.textContent = capitalize(role); badge.className = 'role-tag ' + getRoleClass(role); }

  // Status dot + text
  const dot  = row.querySelector('.status-dot');
  const stxt = row.querySelector('.status-cell span:last-child');
  const online = status === 'online';
  if (dot)  { dot.className = 'status-dot ' + (online ? 'dot-online' : 'dot-offline'); }
  if (stxt) { stxt.textContent = online ? 'Online' : 'Offline'; }

  // ── Update data-* attrs ──
  row.dataset.namaDepan    = namaDepan;
  row.dataset.namaBelakang = namaBelakang;
  row.dataset.email        = email;
  row.dataset.telp         = telp || '-';
  row.dataset.role         = role;
  row.dataset.status       = online ? 'online' : 'offline';
  row.setAttribute('data-role', role);

  if (role === 'murid') {
    row.dataset.poin   = gval('e-poin') || 0;
    const skillRaw     = gval('e-skills');
    const skillArr     = skillRaw.split(',').map(s => s.trim()).filter(Boolean);
    row.dataset.skills = JSON.stringify(skillArr);
  }
  if (role === 'chef') {
    row.dataset.noKtp       = gval('e-ktp');
    row.dataset.pendapatan  = gval('e-pendapatan') || 0;
    row.dataset.rating      = gval('e-rating')      || '0.00';
    row.dataset.totalMurid  = gval('e-total-murid') || 0;
    const spArr = gval('e-spesialisasi').split(',').map(s => s.trim()).filter(Boolean);
    const pdArr = gval('e-pendidikan').split(',').map(s => s.trim()).filter(Boolean);
    row.dataset.spesialisasi = JSON.stringify(spArr);
    row.dataset.pendidikan   = JSON.stringify(pdArr);
    row.dataset.sosmed = JSON.stringify({
      instagram: gval('e-ig'),
      youtube  : gval('e-yt'),
      tiktok   : gval('e-tt'),
    });
  }

  closeModal('editUserModal');
  showToast(`Data ${namaDepan} berhasil diperbarui ✓`, 'success');
}

/* ============================================================
   ADD USER MODAL
============================================================ */
function onAddRoleChange() {
  const role  = document.getElementById('add-role')?.value;
  const group = document.getElementById('add-member-group');
  if (group) group.style.display = role === 'murid' ? 'block' : 'none';
}

function submitAddUser(e) {
  e.preventDefault();
  const pw  = gval('add-password');
  const cpw = gval('add-confirm');
  if (pw.length < 8) { showToast('Password minimal 8 karakter!', 'error'); return; }
  if (pw !== cpw)    { showToast('Password tidak cocok!',         'error'); return; }

  closeModal('addUserModal');
  document.getElementById('addUserForm')?.reset();
  showToast('User baru berhasil ditambahkan!', 'success');
}

/* ============================================================
   DELETE MODAL
============================================================ */
function openDeleteModal(row) {
  _activeRow = row;
  const d = getRowData(row);

  const avaEl = document.getElementById('deleteAva');
  if (avaEl) { avaEl.textContent = d.initial; avaEl.style.background = d.avaStyle; }
  setText('deleteName',  d.fullName);
  setText('deleteEmail', d.email);

  const chk = document.getElementById('deleteCheck');
  const btn = document.getElementById('confirmDeleteBtn');
  if (chk) chk.checked = false;
  if (btn) btn.disabled = true;

  openModal('deleteUserModal');
}

function toggleDeleteBtn() {
  const chk = document.getElementById('deleteCheck');
  const btn = document.getElementById('confirmDeleteBtn');
  if (btn) btn.disabled = !chk?.checked;
}

function confirmDelete() {
  const row = _activeRow;
  if (!row) return;
  const name = row.querySelector('.user-name')?.textContent || 'User';

  row.style.transition = 'all 0.4s ease';
  row.style.opacity    = '0';
  row.style.transform  = 'translateX(40px)';
  setTimeout(() => { row.remove(); }, 400);

  closeModal('deleteUserModal');
  showToast(`${name} telah dihapus dari sistem.`, 'success');
}

/* ============================================================
   BIND ACTION BUTTONS (re-usable for dynamically added rows)
============================================================ */
function bindRowButtons(scope) {
  const root = scope || document;

  root.querySelectorAll('.act-view').forEach(btn => {
    const fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);
    fresh.addEventListener('click', function (e) {
      e.stopPropagation();
      openViewModal(this.closest('tr'));
    });
  });

  root.querySelectorAll('.act-edit').forEach(btn => {
    const fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);
    fresh.addEventListener('click', function (e) {
      e.stopPropagation();
      openEditModal(this.closest('tr'));
    });
  });

  root.querySelectorAll('.act-delete').forEach(btn => {
    const fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);
    fresh.addEventListener('click', function (e) {
      e.stopPropagation();
      openDeleteModal(this.closest('tr'));
    });
  });
}

/* ============================================================
   FILTER TABS
============================================================ */
document.querySelectorAll('.ftab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('#tableBody tr').forEach(row => {
      row.style.display = (filter === 'all' || row.dataset.role === filter) ? '' : 'none';
    });
  });
});

/* ============================================================
   TABLE SORTING
============================================================ */
document.querySelectorAll('.data-table th[data-sort]').forEach(th => {
  th.addEventListener('click', () => {
    const col  = th.dataset.sort;
    const isAsc = th.dataset.dir !== 'asc';
    document.querySelectorAll('.data-table th[data-sort]').forEach(h => { h.dataset.dir = ''; });
    th.dataset.dir = isAsc ? 'asc' : 'desc';

    const tbody = document.querySelector('#tableBody');
    const rows  = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
      let av = '', bv = '';
      switch (col) {
        case 'name'  : av = a.querySelector('.user-name')?.textContent.toLowerCase() || ''; bv = b.querySelector('.user-name')?.textContent.toLowerCase() || ''; break;
        case 'email' : av = a.querySelector('.cell-email')?.textContent.toLowerCase() || ''; bv = b.querySelector('.cell-email')?.textContent.toLowerCase() || ''; break;
        case 'role'  : av = a.dataset.role || ''; bv = b.dataset.role || ''; break;
        case 'status': av = a.dataset.status || ''; bv = b.dataset.status || ''; break;
        case 'joined': av = a.querySelector('.cell-date')?.textContent || ''; bv = b.querySelector('.cell-date')?.textContent || ''; break;
      }
      if (av < bv) return isAsc ? -1 : 1;
      if (av > bv) return isAsc ?  1 : -1;
      return 0;
    });

    rows.forEach(r => tbody.appendChild(r));
  });
});

/* ============================================================
   TOAST NOTIFICATIONS
============================================================ */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${icons[type] || icons.info}"></i>
    <span>${message}</span>
    <button class="toast-close" onclick="this.closest('.toast-item').remove()">
      <i class="fas fa-xmark"></i>
    </button>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity    = '0';
    toast.style.transform  = 'translateX(70px) scale(0.85)';
    setTimeout(() => toast.remove(), 320);
  }, 3800);
}

/* ============================================================
   UTIL SHORTCUTS
============================================================ */
function setText(id, val)  { const el = document.getElementById(id); if (el) el.textContent = val; }
function show(id)          { const el = document.getElementById(id); if (el) el.style.display = 'block'; }
function hide(id)          { const el = document.getElementById(id); if (el) el.style.display = 'none'; }
function val(id, v)        { const el = document.getElementById(id); if (el) el.value = v; }
function gval(id)          { return document.getElementById(id)?.value || ''; }

/* ============================================================
   ENTRY ANIMATIONS (stat cards stagger-in)
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stat-card').forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(22px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
      card.style.opacity    = '1';
      card.style.transform  = 'translateY(0)';
    }, i * 110 + 80);
  });

  // Table rows stagger-in
  document.querySelectorAll('#tableBody tr').forEach((row, i) => {
    row.style.opacity   = '0';
    row.style.transform = 'translateX(-16px)';
    setTimeout(() => {
      row.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
      row.style.opacity    = '1';
      row.style.transform  = 'translateX(0)';
    }, i * 80 + 300);
  });

  // Activity items stagger
  document.querySelectorAll('.activity-item').forEach((item, i) => {
    item.style.opacity   = '0';
    item.style.transform = 'translateY(12px)';
    setTimeout(() => {
      item.style.transition = 'all 0.4s ease';
      item.style.opacity    = '1';
      item.style.transform  = 'translateY(0)';
    }, i * 100 + 600);
  });

  bindRowButtons();
});