import requests
from posts.models import Account, Post
import os

class YouTubeScraper:

    def run(self):
        self.get_accounts()
        self.add_posts_data()

    def add_posts_data(self):
        for account in self.accounts:
            url = 'https://www.googleapis.com/youtube/v3/search?key={}&channelId={}&part=snippet,id&order=date&maxResults=20'.format(
                os.getenv('YOUTUBE_KEY'),
                account.account_id
            )
            response = requests.get(url=url)
            self.add_post(response.json(), account)

    def reject_condition_exists(self, data, account):
        if account.name == 'DMG MORI':
            if 'Vendée Globe Update' not in data['snippet']['title']:
                return True
        return False

    def add_post(self, data, account):
        for item in data['items']:
            exists = Post.objects.filter(source_id=item['id']['videoId']).count()
            if exists:
                continue
            if self.reject_condition_exists(item, account):
                continue
            post = Post(
                account=account,
                title=item['snippet']['title'],
                description=item['snippet']['description'],
                created=item['snippet']['publishTime'],
                source_id=item['id']['videoId'],
                url='https://www.youtube.com/watch?v=' + item['id']['videoId']
            )
            post.save()
    def get_accounts(self):
        self.accounts = Account.objects.filter(platform='youtube')

