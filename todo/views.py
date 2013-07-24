from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from models import Todo
from serializers import UserSerializer, TodoSerializer
from permissions import IsOwner


class TodoViewSet(viewsets.ModelViewSet):
    model = Todo
    serializer_class = TodoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwner)
    fields = ('id', 'description', 'priority', 'done')

    def get_queryset(self):
        if self.request.user.is_authenticated():
            return Todo.objects.filter(user=self.request.user)
        else:
            return Todo.objects.none()

    def pre_save(self, obj):
        obj.user = self.request.user


@api_view(['POST'])
def login(request):
    email = request.DATA.get('email', None)
    password = request.DATA.get('password', None)

    user = authenticate(username=email, password=password)
    if user is not None:
        if user.is_active:
            django_login(request, user)
            return Response("Login successful", status=status.HTTP_200_OK)
        else:
            return Response({"message": "Your account is not active."}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"message": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def logout(request):
    django_logout(request)
    return Response("Logout successful", status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    serialized = UserSerializer(data=request.DATA)
    if serialized.is_valid():
        get_user_model().objects.create_user(
            serialized.init_data['email'],
            serialized.init_data['password']
        )
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)