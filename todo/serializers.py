from django.contrib.auth import get_user_model
from rest_framework import serializers
from models import Todo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'password')


class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'description', 'priority', 'done')
