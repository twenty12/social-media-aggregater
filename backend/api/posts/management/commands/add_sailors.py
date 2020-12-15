from django.core.management.base import BaseCommand
from posts.management.scrapers.import_sailors import SailorGetter 


class Command(BaseCommand):


    def handle(self, *args, **kwargs):
        b = SailorGetter()
        b.run()