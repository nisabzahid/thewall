from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password',
                  'first_name', 'last_name', 'email',)
        extra_kwargs = {'password': {"write_only": True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ['user']

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response

    def get_photo_url(self, car):
        request = self.context.get('request')
        photo_url = car.photo.url
        return request.build_absolute_uri(image)


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ['profile']
        # depth = 1

    def validate(self, attrs):
        attrs['profile'] = self.context['request'].user.profile
        return attrs

    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['profile'] = ProfileSerializer(
            instance.profile, context={'request': request}).data
        return response


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['profile'] = ProfileSerializer(
            instance.profile, context={'request': request}).data
        return response


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['profile'] = ProfileSerializer(
            instance.profile, context={'request': request}).data
        return response


class FrieendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['sender'] = ProfileSerializer(
            instance.sender, context={'request': request}).data
        response['receiver'] = ProfileSerializer(
            instance.receiver, context={'request': request}).data
        return response
