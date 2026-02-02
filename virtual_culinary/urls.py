"""
URL configuration for virtual_culinary project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
# from . import views
tuple_path = (
    "html", "css", "js", "php", "ts", "jsx", "tsx", "scss",
    "jpg", "jpeg", "png", "webp", "svg", "gif", "ico", "woff", "woff2",
    "yaml", "yml", "json", "dockerfile", "tf", "sh", "bash", "pem", "crt", "log",
    "py", "c", "cpp", "h", "ino", "hex", "bin", "elf",
    "sql", "xml", "csv", "md", "pdf", "docx", "xlsx", "txt",
    "mp4", "webm", "mp3", "wav",
    "zip", "tar", "gz", "7z"
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('homepage.urls')),
    path('login/', include('login.urls')),
    path('users/', include('users.urls')),
    path('administration/', include('administration.urls')),
    path('register/', include('register.urls')),
    # re_path(r'^(?P<path_html>.*)\.(' + '|'.join(tuple_path) + ')$', views.clear_extension),
    # re_path(r'^.*$', views.randomUsers),
]
