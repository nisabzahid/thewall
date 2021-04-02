from django.contrib.auth import get_user_model

from django.urls import reverse, resolve 
import json
from django.http import response
from django.test.client import Client
from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from thewall.models import Profile, Comment, Like, FriendRequest, Post, Reply
from thewall.serializer import *





class CustomUserTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            username='testuser',
            email='testuser@email.com',
            password='testpass123'
        )
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'testuser@email.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(
            username='superadmin',
            email='superadmin@email.com',
            password='testpass123'
        )
        self.assertEqual(admin_user.username, 'superadmin')
        self.assertEqual(admin_user.email, 'superadmin@email.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
class ModelTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="testuser",password="Testuserpassword1")
        self.user2 = User.objects.create_user(username="testuser2",password="Testuserpassword2")
        self.post = Post.objects.create(profile=self.user.profile,title="test title",content="test content")
        self.friendrequest = FriendRequest.objects.create(sender=self.user.profile,receiver=self.user2.profile)
        self.like = Like.objects.create(profile = self.user.profile,post=self.post)
        self.comment = Comment.objects.create(profile=self.user.profile,post=self.post,title="test comment")
        self.reply = Reply.objects.create(profile=self.user.profile,comment=self.comment,title="test reply")
        
    
    def get_client(self):
        client = Client()
        client.login(username=self.user.username, password='Testuserpassword1')
        return client

    def test_profile_created_via_signal(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_friend_request(self):
        
        qs = FriendRequest.objects.all()
        self.assertEqual(qs.count(),1)
    
    def test_post(self):
        
        qs = Post.objects.all()
        self.assertEqual(qs.count(),1)
        post = Post.objects.get(pk=1)
        self.assertEqual(post.title,"test title")
        self.assertEqual(post.content,"test content")
    
    def test_like(self):
        qs = Like.objects.all()
        self.assertEqual(qs.count(),1)
    
    def test_reply(self):
        qs = Reply.objects.all()
        self.assertEqual(qs.count(),1)
        reply = Reply.objects.get(pk=1)
        self.assertEqual(reply.title,"test reply")

    def test_comment(self):
        qs = Comment.objects.all()
        self.assertEqual(qs.count(),1)
        comment = Comment.objects.get(pk=1)
        self.assertEqual(comment.title,"test comment")
        