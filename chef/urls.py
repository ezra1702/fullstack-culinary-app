# G:\Projects\virtual_culinary\chef\urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.chef, name='chef'), 
    path('submit/', views.register_chef, name='submitRegisterChef'),
]