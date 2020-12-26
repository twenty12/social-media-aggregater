from posts.models import Post, Account, Boat, Team, Sailor, Event
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class BoatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boat
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    boat = BoatSerializer()

    class Meta:
        model = Team
        fields = '__all__'

class SailorSerializer(serializers.ModelSerializer):
    boat = BoatSerializer()

    class Meta:
        model = Sailor
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('name',)

class AccountSerializer(serializers.ModelSerializer):
    sailor = SailorSerializer()
    team = TeamSerializer()
    events = EventSerializer(many=True)
    class Meta:
        model = Account
        fields = '__all__'