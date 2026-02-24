from django.shortcuts import render
from django.shortcuts import redirect

from . import models
# Create your views here.
def adminDashboard(request):
    users_queryset = models.create_user.objects.select_related('murid_profile', 'chef_profile').order_by('-dataJoin')
    total_users = users_queryset.count()
    total_students = users_queryset.filter(role='murid').count()    
    total_chefs = users_queryset.filter(role='chef').count()
    total_premium = users_queryset.filter(murid_profile__isnull=False).count()
    context = {
        'total_users': total_users,
        'total_students': total_students,
        'total_chefs': total_chefs,
        'total_premium': total_premium,
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

