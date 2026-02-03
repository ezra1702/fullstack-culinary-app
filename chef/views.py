from django.shortcuts import render
from django.http import JsonResponse
from django.db import transaction
from administration.models import create_user, ChefProfile

def chef(request):
    return render(request, 'chef/register.html')

def dashboard(request):
    return render(request, 'chef/dashboard.html')

def register_chef(request):
    """Proses pendaftaran Chef: Tanpa Verifikasi (Auto-Active)"""
    if request.method == "POST":
        try:
            # 1. Ambil Data Akun Utama
            nama_d = request.POST.get('namaDepan')
            nama_b = request.POST.get('namaBelakang')
            email = request.POST.get('email')
            password = request.POST.get('password')
            password_confirm = request.POST.get('password_confirm')
            telp = request.POST.get('telp')

            # 2. Ambil Data Portfolio & Dokumen
            ktp_num = request.POST.get('no_ktp')
            ktp_img = request.FILES.get('foto_ktp')
            cv_file = request.FILES.get('file_cv') # Pastikan name di HTML: file_cv

            # Ambil list dinamis untuk JSONField
            pendidikan = request.POST.getlist('pendidikan[]') 
            spesialisasi = request.POST.getlist('spesialisasi[]')
            
            # Mapping Riwayat Kerja ke dalam List of Dict
            posisi_list = request.POST.getlist('kerja_posisi[]')
            tempat_list = request.POST.getlist('kerja_tempat[]')
            riwayat_kerja = []
            for pos, tmp in zip(posisi_list, tempat_list):
                if pos.strip() or tmp.strip():
                    riwayat_kerja.append({"posisi": pos, "tempat": tmp})

            # 3. Validasi Logic
            if password != password_confirm:
                return JsonResponse({"message": "Password konfirmasi tidak cocok!"}, status=400)

            if create_user.objects.filter(email=email).exists():
                return JsonResponse({"message": "Email ini sudah terdaftar, Bro!"}, status=400)
            
            if ChefProfile.objects.filter(no_ktp=ktp_num).exists():
                return JsonResponse({"message": "Nomor KTP sudah terdaftar di sistem!"}, status=400)

            # 4. Simpan ke Database (Atomic Transaction)
            # Menggunakan atomic biar kalau profil gagal simpan, user-nya batal dibuat (Data Integrity)
            with transaction.atomic():
                # Simpan User Induk
                user_baru = create_user.objects.create(
                    namaDepan=nama_d,
                    namaBelakang=nama_b,
                    email=email,
                    password=password, # Akan di-hash otomatis di model.save() lo
                    telp=telp,
                    role='chef',
                    status='offline' # Default awal offline
                )

                # Simpan Profil Chef (Langsung Aktif)
                ChefProfile.objects.create(
                    user=user_baru,
                    no_ktp=ktp_num,
                    foto_ktp=ktp_img,
                    file_cv=cv_file,
                    pendidikan_json=pendidikan,
                    spesialisasi_json=spesialisasi,
                    riwayat_kerja_json=riwayat_kerja,
                    link_sosmed={
                        "instagram": request.POST.get('sosmed_ig', ''),
                        "linkedin": request.POST.get('sosmed_li', ''),
                        "youtube": request.POST.get('sosmed_yt', '')
                    },
                    rating_total=0.00,
                    total_murid=0
                )

            # 5. Return Success
            return JsonResponse({
                "message": "Selamat! Akun Chef Anda sudah aktif. Silakan login.", 
                "redirect_url": "/login?status=registered"
            }, status=200)

        except Exception as e:
            # Ini penting buat debugging di terminal Ubuntu lo
            print(f"CRASH REGISTER CHEF: {str(e)}")
            return JsonResponse({"message": f"Ada masalah server: {str(e)}"}, status=500)

    return render(request, 'chef/register.html')