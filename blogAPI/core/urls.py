from django.urls import path
from .views import signin, signup, create_blog, get_all_blogs, get_one_blog

urlpatterns = [
    path('user/login/',signin),
    path('user/create/',signup),
    path('blog/create/',create_blog),
    path('blog/',get_all_blogs),
    path('blog/<int:pk>/',get_one_blog)
]