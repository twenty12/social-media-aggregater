from django.contrib.auth.models import User, Group
from rest_framework import viewsets, pagination
from posts.serializers import PostSerializer, AccountSerializer
from posts.models import Post, Account


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created')
    serializer_class = PostSerializer


class AccountPagination(pagination.PageNumberPagination):       
       page_size = 10000

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    pagination_class = AccountPagination