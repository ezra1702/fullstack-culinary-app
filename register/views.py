from django.shortcuts import render, redirect
from django.contrib import messages
from administration.models import create_user

def register(request):
    return render(request, 'register.html')

def login(request):
    return render(request, 'login.html')

def submit(request):
    if request.method == "POST":
        # 1. Ambil Data dari Form
        nama_depan = request.POST.get('namaDepan')
        nama_belakang = request.POST.get('namaBelakang')
        email_user = request.POST.get('email')
        password_user = request.POST.get('password')
        password_confirm = request.POST.get('password_confirm')
        telp_user = request.POST.get('telp')
        role_user = request.POST.get('role', 'murid-basic') 

        # 2. Validasi Password
        if password_user != password_confirm:
            messages.error(request, 'Password tidak cocok!')
            return redirect('register')

        # 3. Cek Email Unik
        if create_user.objects.filter(email=email_user).exists():
            messages.error(request, 'Email sudah terdaftar!')
            return redirect('register')

        # 4. Simpan ke Database
        try:
            user_baru = create_user(
                namaDepan=nama_depan,
                namaBelakang=nama_belakang,
                email=email_user,
                password=password_user, 
                telp=telp_user,
                role=role_user,
                # total_detik_online otomatis 0 sesuai default di models
            )
            user_baru.save()
            messages.success(request, 'Registrasi Berhasil! Silakan Login.')
            return redirect('login') # Ganti dengan nama path login lo
            
        except Exception as e:
            messages.error(request, f'Terjadi kesalahan: {e}')
            return redirect('register')

    return redirect('register')