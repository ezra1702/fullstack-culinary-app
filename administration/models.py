from django.db import models 
from django.core.validators import RegexValidator
from django.contrib.auth.hashers import make_password
from django.utils import timezone

# Validator & Tuple (Biar rapi ditaruh di luar class atau di dalam boleh)
phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Format: +628123456789")

class create_user(models.Model):
    tuple_role = (('admin', 'Admin'), ('murid-basic', 'Murid Basic'), ('murid-premium', 'Murid Premium'), ('chef', 'Chef'))
    tuple_status = (('online', 'Online'), ('offline', 'Offline'))

    namaDepan = models.CharField(max_length=256)
    namaBelakang = models.CharField(max_length=256, blank=True)
    email = models.EmailField(unique=True)
    dataJoin = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=20, choices=tuple_role, default='murid-basic')
    password = models.CharField(max_length=128)   
    telp = models.CharField(max_length=15, validators=[phone_regex])
    status = models.CharField(max_length=10, choices=tuple_status, default='offline')
    bio = models.TextField(max_length=1000, blank=True)
    kelas = models.IntegerField(default=0, blank=True)

    # --- FITUR DURASI ONLINE ---
    total_detik_online = models.PositiveIntegerField(default=0)
    last_activity = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_sha256'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.namaDepan} {self.namaBelakang}"

    # Fungsi untuk tampil di HTML
    def get_durasi_online(self):
        total_menit = self.total_detik_online // 60
        jam = total_menit // 60
        menit = total_menit % 60
        if jam > 0:
            return f"{jam} jam {menit} menit"
        return f"{menit} menit"