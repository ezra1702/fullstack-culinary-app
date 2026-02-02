from django.shortcuts import render, redirect


def homepage(request):
    return render(request, 'index.html')

def randomUsers(request):
    return redirect('homepage')

def clear_extension(request, path):
    return redirect(path.split('.')[0])

