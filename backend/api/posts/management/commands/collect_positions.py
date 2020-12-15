from django.core.management.base import BaseCommand
from posts.management.scrapers.boat_positions import BoatPositionGetter 


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        b = BoatPositionGetter()
        b.run()