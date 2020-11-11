from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BlogModel

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password']

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogModel
        fields = ['title','content','author']