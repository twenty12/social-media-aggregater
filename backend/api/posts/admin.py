from django.contrib import admin
from posts.models import Post, Sailor, Boat, Team, Account


class PostAdmin(admin.ModelAdmin):
    list_display = ('created', 'collected')
    search_fields = ['account']

class SailorAdmin(admin.ModelAdmin):
    list_display = ('name',)

class BoatAdmin(admin.ModelAdmin):
    pass

class TeamAdmin(admin.ModelAdmin):
    pass

class AccountAdmin(admin.ModelAdmin):
    list_display = ('platform', 'sailor', 'team', )

def reg():
    to_reg = [
        (Post, PostAdmin),
        (Sailor, SailorAdmin),
        (Boat, BoatAdmin),
        (Team, TeamAdmin),
        (Account, AccountAdmin),

    ]
    for item in to_reg:
        admin.site.register(item[0], item[1])


reg()
