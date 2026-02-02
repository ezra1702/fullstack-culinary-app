from django.shortcuts import render
from django.shortcuts import redirect

from . import models
# Create your views here.
def adminDashboard(request):
    users = models.create_user.objects.all()
    all_users = models.create_user.objects.all()
    total_students = all_users.filter(role__in='murid').count()
    total_chefs = all_users.filter(role__in='chef').count()
    total_premium = all_users.filter(role__in='murid-premium').count()
    context = {
        'users': users.order_by('-dataJoin'),
        'total_users': all_users.count(),
        'total_students': total_students,
        'total_chefs': total_chefs,
        'total_premium': total_premium
    }
    return render(request, 'administration/admin_dashboard.html', context)

def randomUsers(request):
    return redirect('admin_dashboard')

def clear_extension(request, path):
    return redirect(path.split('.')[0])

def manageChefs(request):
    return render(request, 'administration/manage_chefs.html')

def manageContent(request):
    return render(request, 'administration/manage_content.html')

def manageCourses(request):
    return render(request, 'administration/manage_courses.html')

def manageUsers(request):
    return render(request, 'administration/manage_users.html')

def laporan(request):
    return render(request, 'administration/laporan.html')

def pengaturan(request):
    return render(request, 'administration/pengaturan.html')

