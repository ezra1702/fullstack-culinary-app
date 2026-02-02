from django.db import models 
from django.core.validators import RegexValidator
from django.contrib.auth.hashers import make_password

# Create your models here.
tuple_role = (('admin', 'Admin'), ('murid-basic', 'Murid Basic'), ('murid-premium', 'Murid Premium'), ('chef', 'Chef'))
tuple_status = (('online', 'Online'), ('offline', 'Offline'))
phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Harus diisi dengan nomor telepon yang valid. Contoh: +628123456789 (IDN)")
class create_user(models.Model):
   tuple_role = (('admin', 'Admin'), ('murid-basic', 'Murid Basic'), ('murid-premium', 'Murid Premium'), ('chef', 'Chef'))
   tuple_status = (('online', 'Online'), ('offline', 'Offline'))
   phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Harus diisi dengan nomor telepon yang valid. Contoh: +628123456789 (IDN)")
   namaDepan = models.CharField(max_length=256)
   namaBelakang = models.CharField(max_length=256, blank=True)
   email = models.EmailField(unique=True)
   dataJoin = models.DateTimeField(auto_now_add=True)
   role = models.CharField(max_length=20, choices=tuple_role, default='murid-basic')
   password = models.CharField(max_length=128, blank=False, null=False)   
   telp = models.CharField(max_length=15, validators=[phone_regex])
   status = models.CharField(max_length=10, choices=tuple_status, default='offline')
   bio = models.TextField(max_length=1000, blank=True)
   
   # Fungsi enkripsi password
   def save(self, *args, **kwargs):
      if self.password and not self.password.startswith('pbkdf2_sha256'):
         self.password = make_password(self.password)
      return super().save(*args, **kwargs)

   # Fungsi penampil nama (Pastikan sejajar dengan def save)
   def __str__(self):
      namaLengkap = self.namaDepan +  self.namaBelakang
      return namaLengkap
   
   