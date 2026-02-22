# G:\Projects\virtual_culinary\chef\urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.dashboard, name='chef'), 
    path('register/', views.chef, name='registerChef'),
    path('submit/', views.register_chef, name='submitRegisterChef'),
    path('pengaturan/', views.pengaturan, name='pengaturanChef'),
    path('kelas/', views.kelas, name='kelasChef'),
    path('murid/', views.murid, name='muridChef'),
    path('statistik/', views.statistik, name='statistikChef'),
    path('pengaturan/', views.pengaturan, name='pengaturanChef'),
    path('logout/', views.logoutChef, name='logoutChef'),
]