from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from posts.serializers import PostSerializer, AccountSerializer
from posts.models import Post, Account


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created')
    serializer_class = PostSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

