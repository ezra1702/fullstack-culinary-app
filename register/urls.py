from django.urls import path
from . import views

urlpatterns = [
    # Path untuk nampilin halaman form register
    path('', views.register, name='register'),
    
    # Path untuk proses simpan data (target action di form HTML)
    path('submit/', views.submit, name='submit'),
]