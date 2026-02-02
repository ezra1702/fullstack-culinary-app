from django.shortcuts import render,redirect



context = {
    'user': 'Sharleen',
    'email': 'sharleenalleta@gmail.com',
}

# Create your views here.
def usersRandom(request):
    return redirect('dashboard')


def clear_extension(request, path_html):
    return redirect(path_html.split('.')[0])

def logout(request):
    return redirect('login')
def dashboard(request):
    return render(request, 'users/dashboard.html', context)

def kelas(request):
    return render(request, 'users/kelas.html', context)

def sertifikat(request):
    return render(request, 'users/sertifikat.html', context)

def statistik(request):
    return render(request, 'users/statistik.html', context)

def pengaturan(request):
    return render(request, 'users/pengaturan.html', context)


