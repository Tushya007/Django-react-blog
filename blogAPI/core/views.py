from .serializers import UserSerializer
from django.shortcuts import get_object_or_404
from .models import BlogModel
from .serializers import BlogSerializer
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authtoken.models import Token


# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def signin(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_207_MULTI_STATUS)

    username = serializer.data['username']
    password = serializer.data['password']
    _user = authenticate(username=username,password=password)
    user = get_object_or_404(User,username=username,password=password)
    token,created = Token.objects.get_or_create(user=user)

    if user is not None:
        login(request,user=user)
        return Response({"message":"User was logged in!","user":{"username":username,"token":token.key}},status=status.HTTP_200_OK)
    return Response({"message":"User credentials are wrong"},status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    username = serializer.data['username']
    password = serializer.data['password']
    email = serializer.data['email']
    user = User.objects.create(username=username,password=password,email=email)
    token = Token.objects.create(user=user)
    if user:
        user.save()
        return Response({
            "message":"User created successfully",
            "user":{
                "username":username,
                "token":token.key
                }
            },
            status=status.HTTP_201_CREATED)
    return Response({"message":"Please enter all details"},status=status.HTTP_401_UNAUTHORIZED)
    

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_blog(request):
    if request.method =='POST':
        serializer = BlogSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        token_req = request.headers['Authorization']
        waste, token = token_req.split(' ')
        user = Token.objects.get(key=token).user    
        if user is not None:
            title = serializer.data['title']
            content = serializer.data['content']

            blog = BlogModel.objects.create(title=title,content=content,author=user)

            if blog:
                blog.save()
            return Response({"message":"The blog was created","details":{
                "author":user.username,
                "title":title,
                "content":content,
                "created_at":blog.date_time_creates,
                "id":blog.id
            }},status=status.HTTP_201_CREATED)
        return Response({"message":"Please enter all fields!"},status=status.HTTP_400_BAD_REQUEST)

    
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_all_blogs(request):
    if request.method == 'GET':
        blogs = BlogModel.objects.all()
        serializer = BlogSerializer(data=blogs,many=True)
        if serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data,status=status.HTTP_200_OK)


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_one_blog(request,pk):
    if request.method == 'GET':
        blogs = BlogModel.objects.filter(id=pk)
        serializer = BlogSerializer(data=blogs,many=True)
        if serializer.is_valid():
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data,status=status.HTTP_200_OK)