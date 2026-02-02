from django.urls import include, path, re_path

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
    
    path('', views.usersRandom, name='usersRandom'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('kelas', views.kelas, name='kelas'),
    path('sertifikat', views.sertifikat, name='sertifikat'),
    path('statistik', views.statistik, name='statistik'),
    path('pengaturan', views.pengaturan, name='pengaturan'),
    re_path(r'^(?P<path_html>.*)\.(' + '|'.join(tuple_path) + ')$', views.clear_extension),
    re_path(r'^.*$', views.usersRandom),
]