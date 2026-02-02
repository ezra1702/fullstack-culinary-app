from django.utils import timezone
from .models import create_user

class OnlineDurationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # 1. Ambil email user dari session (pastikan pas login lo set session ini)
        user_email = request.session.get('email_user')
        
        if user_email:
            try:
                # Ambil data user dari MySQL
                user = create_user.objects.get(email=user_email)
                sekarang = timezone.now()

                if user.last_activity:
                    # 2. Hitung selisih waktu dari klik terakhir (dalam detik)
                    selisih = (sekarang - user.last_activity).total_seconds()
                    
                    # 3. LOGIKA ANTI-CURANG: 
                    # Kalau selisihnya kurang dari 30 menit (1800 detik), tambahkan ke total.
                    # Kalau lebih, berarti user ditinggal tidur/AFK, jangan ditambahin durasinya.
                    if selisih < 1800: 
                        user.total_detik_online += int(selisih)
                
                # 4. Update waktu aktivitas terakhir & pastikan status 'online'
                user.last_activity = sekarang
                user.status = 'online'
                
                # Gunakan update_fields biar lebih cepet performanya
                user.save(update_fields=['total_detik_online', 'last_activity', 'status'])
                
            except create_user.DoesNotExist:
                pass

        # Lanjutkan proses ke halaman yang dituju user
        response = self.get_response(request)
        return response