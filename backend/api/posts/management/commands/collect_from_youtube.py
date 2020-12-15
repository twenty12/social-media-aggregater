from django.core.management.base import BaseCommand
from posts.management.scrapers.youtube import YouTubeScraper


class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        y = YouTubeScraper(
            mock=kwargs.get('mock'),
            account_id=kwargs.get('account_id')
            )
        y.run()
        # print('run')
    
    def add_arguments(self, parser):
        #python manage.py collect_from_youtube --mock=true
        parser.add_argument('--mock', type=bool)
        parser.add_argument('--account_id', type=str)

