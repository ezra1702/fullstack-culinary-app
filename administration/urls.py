from django.urls import path, re_path
from . import views

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
    path('', views.randomUsers, name='randomUsers'),
    path('admin_dashboard', views.adminDashboard, name='admin_dashboard'),
    path('manage_users', views.manageUsers, name='manage_users'),
    path('manage_content', views.manageContent, name='manage_content'),
    path('manage_courses', views.manageCourses, name='manage_courses'),
    path('laporan', views.laporan, name='admin_laporan'),
    path("manage_chefs", views.manageChefs, name='manage_chefs'),
    path('pengaturan', views.pengaturan, name='admin_pengaturan'),
    re_path(r'^(?P<path>.*)\.(' + '|'.join(tuple_path) + ')$', views.clear_extension),
    re_path(r'^.*$', views.randomUsers),
]