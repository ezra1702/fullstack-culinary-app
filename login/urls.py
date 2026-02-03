from django.urls import path
from . import views

urlpatterns = [
    # Nama 'login' di sini yang dicari oleh redirect('login')
    path('', views.login, name='login'), 
]