from django.contrib import admin
from django.urls import path
from django.urls import include, path
from rest_framework import routers
from posts import views as post_views


router = routers.DefaultRouter()
router.register(r'api/posts', post_views.PostViewSet)
router.register(r'api/accounts', post_views.AccountViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += router.urls
