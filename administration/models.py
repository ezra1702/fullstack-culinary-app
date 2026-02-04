from django.db import models 
from django.core.validators import RegexValidator
from django.contrib.auth.hashers import make_password
from django.utils import timezone

# VALIDATORS & TUPLES 
phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Format: +628123456789")
tuple_role = (('admin', 'Admin'), ('murid', 'Murid'), ('chef', 'Chef'))

# CLASS INDUK (Identity & Session) 
class create_user(models.Model):
    namaDepan = models.CharField(max_length=256)
    namaBelakang = models.CharField(max_length=256, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128) 
    telp = models.CharField(max_length=15, validators=[phone_regex])
    dataJoin = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=20, choices=tuple_role, default='murid')
    status = models.CharField(max_length=10, default='offline')
    
    # Statistik Global
    total_detik_online = models.PositiveIntegerField(default=0)
    last_activity = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_sha256'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.namaDepan} {self.namaBelakang}"

# CLASS KELAS 
class Kelas(models.Model):
    chef = models.ForeignKey('ChefProfile', on_delete=models.CASCADE, related_name='kelas_diajar')
    judul = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True) 
    thumbnail = models.ImageField(upload_to='kelas/thumbnails/')
    deskripsi = models.TextField(max_length=500)
    deskripsi_lengkap = models.TextField()
    BasicPremium = models.BooleanField(default=False)
    kategori = models.CharField(max_length=100)
    level = models.CharField(max_length=20, choices=[('Beginner', 'Beginner'), ('Intermediate', 'Intermediate'), ('Advanced', 'Advanced')])
    
    kurikulum_json = models.JSONField(default=list, blank=True)
    
    # Penjadwalan
    tanggal_mulai = models.DateField(default=timezone.now)
    total_durasi_jam = models.PositiveIntegerField(default=0)
    tanggal_selesai = models.DateField(null=True, blank=True)

    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.judul

# CLASS MURID
class murid(models.Model):
    user = models.OneToOneField(create_user, on_delete=models.CASCADE, related_name='murid_profile')
    
    riwayat_belajar_json = models.JSONField(default=list, blank=True)
    
    sertifikat_koleksi = models.JSONField(default=list, blank=True)
    
    poin_belajar = models.PositiveIntegerField(default=0)
    skills = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"Murid: {self.user.namaDepan}"

# CLASS CHEF 
class ChefProfile(models.Model):
    user = models.OneToOneField(create_user, on_delete=models.CASCADE, related_name='chef_profile')
    
    # Form Registrasi Profesional
    no_ktp = models.CharField(max_length=16, unique=True)
    foto_ktp = models.ImageField(upload_to='chef/verifikasi/')
    file_cv = models.FileField(upload_to='chef/cv/')
    pendapatan = models.PositiveIntegerField(default=0)
    # Portfolio Profesional
    pendidikan_json = models.JSONField(default=list, blank=True) # ["Culinary Arts School"]
    spesialisasi_json = models.JSONField(default=list, blank=True) # ["Pastry", "Japanese"]
    riwayat_kerja_json = models.JSONField(default=list, blank=True) # [{"posisi": "Head Chef", "tempat": "Hotel X"}]
    
    # Statistik Bisnis
    rating_total = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_murid = models.PositiveIntegerField(default=0)
    
    link_sosmed = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"Chef: {self.user.namaDepan}"