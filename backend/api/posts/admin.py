from django.contrib import admin
from posts.models import Post, Sailor, Boat, Team, Account, Event

# class AccountInline(admin.TabularInline):
#     model = Account

class PostAdmin(admin.ModelAdmin):
    list_display = ('created', 'collected', 'account', 'thumbnail')
    search_fields = ['source_id',]

class SailorAdmin(admin.ModelAdmin):
    list_display = ('name',)

class BoatAdmin(admin.ModelAdmin):
    pass

class TeamAdmin(admin.ModelAdmin):
    pass

class EventAdmin(admin.ModelAdmin):
    pass
class AccountAdmin(admin.ModelAdmin):
    list_display = ('platform', 'sailor', 'flag', )

def reg():
    to_reg = [
        (Event, EventAdmin),
        (Post, PostAdmin),
        (Sailor, SailorAdmin),
        (Boat, BoatAdmin),
        (Team, TeamAdmin),
        (Account, AccountAdmin),

    ]
    for item in to_reg:
        admin.site.register(item[0], item[1])


reg()
