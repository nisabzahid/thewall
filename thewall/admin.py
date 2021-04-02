from django.contrib import admin
from .models import (
    Profile,
    Post,
    FriendRequest,
    Like,
    Comment,
    Reply
)


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'id')


admin.site.register(Profile, ProfileAdmin)

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Reply)
admin.site.register(Like)
admin.site.register(FriendRequest)
