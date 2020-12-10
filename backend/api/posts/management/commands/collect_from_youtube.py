from django.core.management.base import BaseCommand
from posts.management.scrapers.youtube import YouTubeScraper


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        y = YouTubeScraper()
        y.run()
        # print('run')