from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from .views import *


urlpatterns = [
    path('posts/', Postview.as_view(),name="posts"),
    path('posts/<int:pk>/', Postview.as_view()),
    path('profile/', ProfileView.as_view()),
    path('users/', AllUsers.as_view()),
    path('friendprofile/', FriendProfile.as_view()),
    path('friendposts/', FriendPost.as_view()),
    path('addlike/', AddLikeView.as_view()),
    path('addcomment/', AddComment.as_view()),
    path('addreply/', AddReply.as_view()),
    path('delatepost/', DelatePost.as_view()),
    path('updateprofile/', UpdateProfile.as_view()),
    path('updateuser/', UpdateUser.as_view()),
    path('sendfriendrequest/', SendFriendRequest.as_view()),
    path('deletesendfriendrequest/', DeleteSendFriendRequest.as_view()),
    path('receivedfriendrequest/', ReceivedFriendRequest.as_view()),
    path('deletereceivedfriendrequest/', DeleteReceivedFriendRequest.as_view()),
    path('acceptfriendrequest/', AcceptFriendRequest.as_view()),
    path('login/', obtain_auth_token),
    path('register/', RegisterUserView.as_view()),
    path('unfriend/', UnFriendView.as_view()),
]
