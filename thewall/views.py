from rest_framework.response import Response
from rest_framework import views, viewsets, generics, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import LimitOffsetPagination
from django.contrib.auth.models import User
from .models import *
from .serializer import *


def commonPost(post_serializer, request):
    posts = []
    for post in post_serializer:
        like_obj = Like.objects.filter(
            post=post['id']).filter(profile=request.user.profile).first()
        if like_obj:
            post['like'] = like_obj.like
        else:
            post['like'] = False
        like_count = Like.objects.filter(
            post=post['id']).filter(like=True).count()
        post['totallike'] = like_count

        comment_obj = Comment.objects.filter(post=post['id']).order_by('-id')
        comment_serializer = CommentSerializer(
            comment_obj, many=True, context={'request': request})
        comment_data = []
        for comment in comment_serializer.data:
            reply_query = Reply.objects.filter(
                comment=comment['id']).order_by('-id')
            reply_serializer = ReplySerializer(
                reply_query, many=True, context={'request': request})
            comment['reply'] = reply_serializer.data
            comment_data.append(comment)
        post['comment'] = comment_data
        posts.append(post)
    return posts


class Postview(views.APIView, LimitOffsetPagination):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, pk=None):
        if pk:
            try:
                query = Post.objects.filter(pk=pk)
                # print(query)
                print("in post get")
                serializer = PostSerializer(
                    query, many=True, context={'request': request})
                data = commonPost(serializer.data, request)
                return Response(data)
            except:
                return Response({"message": "No Data found"})
        else:
            query = Post.objects.all().order_by('-id')
            serializer = PostSerializer(
                query, many=True, context={'request': request})
            data = commonPost(serializer.data, request)
            return Response(data)

    def post(self, request, pk=None):
        if pk:
            snapshot = Post.objects.get(pk=pk)
            serializers = PostSerializer(
                snapshot, data=request.data, context={'request': request})
            if serializers.is_valid():
                serializers.save()
                return Response({'error': False})
            return Response({'error': True})
        else:
            serializer = PostSerializer(
                data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response({'error': False})
            return Response({'error': True})

    def delete(self, request, pk):
        try:
            snippet = Post.objects.get(pk=pk)
            if snippet.profile.id == request.user.profile.id:
                snippet.delete()
                return Response({"error": False})
            else:
                return Response({"error": True})
        except:
            return Response({"message": "No data found for this ID"})


class ProfileView(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user = request.user
        query = Profile.objects.get(user=user)
        data = []
        serializer = ProfileSerializer(query, context={"request": request})
        p_data = serializer.data
        myfriends_query = Profile.objects.filter(friends=user)
        myfriends_serializer = ProfileSerializer(myfriends_query, many=True)
        friends_all = []
        for friend in myfriends_serializer.data:
            profile_obj = Profile.objects.get(user=friend['id'])
            profile_serializer = ProfileSerializer(
                profile_obj, context={'request': request})
            friend = profile_serializer.data
            friends_all.append(friend)
        post_obj = Post.objects.filter(profile=query)
        post_serializer = PostSerializer(
            post_obj, many=True, context={'request': request})
        p_data['posts'] = commonPost(post_serializer.data, request)
        p_data['friends'] = friends_all
        data.append(p_data)
        return Response(data)


class AllUsers(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def get(self, request):
        myfriends_profiles = Profile.objects.exclude(
            friends=request.user).exclude(user=request.user)
        serializer = ProfileSerializer(
            myfriends_profiles, many=True, context={'request': request})
        return Response(serializer.data)


class FriendProfile(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        data = request.data
        friend_profile_id = data['id']
        profile = Profile.objects.get(id=friend_profile_id)
        data = []
        serializer = ProfileSerializer(profile, context={"request": request})
        p_data = serializer.data
        myfriends_query = Profile.objects.filter(friends=profile.user)
        myfriends_serializer = ProfileSerializer(myfriends_query, many=True)
        friends_all = []
        for friend in myfriends_serializer.data:
            profile_obj = Profile.objects.get(user=friend['id'])
            profile_serializer = ProfileSerializer(
                profile_obj, context={'request': request})
            friend = profile_serializer.data
            friends_all.append(friend)
        post_obj = Post.objects.filter(profile=profile).order_by('-id')
        post_serializer = PostSerializer(
            post_obj, many=True, context={'request': request})
        posts = commonPost(post_serializer.data, request)
        # ######
        # print(profile, 'profile')
        myfriendsssss = Profile.objects.filter(
            friends=request.user)
        ismyfriend = myfriendsssss.filter(user=profile.user).first()
        if ismyfriend:
            p_data['myfriend'] = True
        else:
            p_data['myfriend'] = False
        # print(myfriendsssss, 'myfriendsssss')
        # print(ismyfriend, 'ismyfriend')
        # ######

        p_data['posts'] = posts
        p_data['friends'] = friends_all
        data.append(p_data)
        return Response(data)


class FriendPost(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def get(self, request):
        posts_obj = Post.objects.filter(
            profile__friends__profile=request.user.profile).order_by('-id')
        post_serializer = PostSerializer(
            posts_obj, many=True, context={'request': request})
        posts = commonPost(post_serializer.data, request)
        return Response(posts)


class AddLikeView(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            post_id = request.data['id']
            post_obj = Post.objects.get(id=post_id)
            print(post_id)
            user = request.user.profile
            like_obj = Like.objects.filter(
                profile=user).filter(post=post_obj).first()
            if like_obj:
                old_like = like_obj.like
                like_obj.like = not old_like
                like_obj.save()
            else:
                Like.objects.create(
                    post=post_obj, profile=user, like=True,
                )
            response_msg = {'error': False}
        except:
            response_msg = {'error': True}
        return Response(response_msg)


class AddComment(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            user = request.user.profile
            data = request.data
            post_id = data['postid']
            post_obj = Post.objects.get(id=post_id)
            title = request.data['title']
            Comment.objects.create(
                post=post_obj,
                title=title,
                profile=user
            )
            response_msg = {'error': False, 'postid': post_id}
        except:
            response_msg = {'error': True}
        return Response(response_msg)


class AddReply(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            user = request.user.profile
            comment_id = request.data['commentid']
            reply_msg = request.data['text']
            comment_obj = Comment.objects.get(id=comment_id)
            reply_obj = Reply.objects.create(
                profile=user,
                title=reply_msg,
                comment=comment_obj,
            )
            response_msg = {'error': False, 'commentid': comment_id}
        except:
            response_msg = {'error': False}
        return Response(response_msg)


class DelatePost(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        profile = request.user.profile
        postid = request.data['postid']
        post_obj = Post.objects.get(id=postid)
        if profile.id == post_obj.profile.id:
            post_obj.delete()
            return Response({'error': False})
        else:
            return Response({'error': True})


class UpdateProfile(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            profile_obj = Profile.objects.get(user=request.user)
            serializers = ProfileSerializer(
                profile_obj, data=request.data, context={"request": request})
            serializers.is_valid(raise_exception=True)
            serializers.save()
            response_msg = {'error': False}
        except:
            response_msg = {'error': True}
        return Response(response_msg)


class UpdateUser(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            user_obj = User.objects.get(username=request.user.username)
            data = request.data
            user_obj.first_name = data['firstname']
            user_obj.last_name = data['lastname']
            user_obj.email = data['email']
            user_obj.save()
            response_msg = {'error': False}
        except:
            response_msg = {'error': True}
        return Response(response_msg)


class SendFriendRequest(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def get(self, request):
        fri_req_obj = FriendRequest.objects.filter(sender=request.user.profile)
        fri_req_serializer = FrieendRequestSerializer(
            fri_req_obj, many=True, context={'request': request})
        return Response(fri_req_serializer.data)

    def post(self, request):
        try:
            sender = request.user.profile
            receiver = Profile.objects.get(id=request.data['id'])
            oldobj, created = FriendRequest.objects.get_or_create(
                sender=sender, receiver=receiver)
            response_msg = {'error': False}
        except:
            response_msg = {'error': True}
        return Response(response_msg)


class DeleteSendFriendRequest(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            data = request.data
            obj = FriendRequest.objects.filter(
                sender__id=data['sender'], receiver__id=data['receiver']).first()
            obj.delete()
            print(obj)
            response_msg = {'error': False}
        except:
            response_msg = {'error': True}
        return Response(response_msg)


class ReceivedFriendRequest(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def get(self, request):
        fri_req_obj = FriendRequest.objects.filter(
            receiver=request.user.profile)
        fri_req_serializer = FrieendRequestSerializer(
            fri_req_obj, many=True, context={'request': request})
        return Response(fri_req_serializer.data)


class DeleteReceivedFriendRequest(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            data = request.data
            obj = FriendRequest.objects.filter(
                sender__id=data['sender'], receiver__id=data['receiver']).first()
            obj.delete()
            print(obj)
            response_msg = {'error': False}
        except:
            response_msg = {'error': True}
        return Response(response_msg)


class AcceptFriendRequest(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            receiver_obj = request.user.profile
            sender_id = request.data['senderid']
            print(sender_id)
            sender_obj = Profile.objects.get(id=sender_id)
            friendRequest = FriendRequest.objects.filter(
                receiver=receiver_obj, sender=sender_obj).first()
            if friendRequest:
                sender_obj.friends.add(receiver_obj.user)
                receiver_obj.friends.add(sender_obj.user)
                print(friendRequest)
                friendRequest.delete()
                response_msg = {'error': False}
            else:
                response_msg = {'error': True}
        except:
            response_msg = {'error': True}
        return Response(response_msg)


class RegisterUserView(views.APIView):
    def post(self, request):
        serializers = UserSerializer(data=request.data)
        username = request.data['username']
        if serializers.is_valid():
            serializers.save()
            
            return Response({'error': False, 'message': f"A user has been created for username {username}"})
        return Response({'error': True, 'message': f"A user with username {username} already exists."})


class UnFriendView(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]

    def post(self, request):
        try:
            friend_profile_id = request.data['id']
            friend_user = User.objects.get(profile__id=friend_profile_id)
            user = request.user
            friend_user.profile.friends.remove(user)
            user.profile.friends.remove(friend_user)
            print(friend_user, "friend_user")
            print(user, 'user')
            response_msg = {'error': False}
        except:
            response_msg = {'error': True}
        return Response(response_msg)

