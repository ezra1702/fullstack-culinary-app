# G:\Projects\virtual_culinary\chef\urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='chef'), 
    path('register/', views.chef, name='registerChef'),
    path('submit/', views.register_chef, name='submitRegisterChef'),
]