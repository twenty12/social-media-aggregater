import requests
from posts.models import Account, Post
import json
import os

def write_dict_to_file(data, file_name):
    path = "/data/youtube/{}.txt".format(file_name)
    file_to_open = os.path.dirname(__file__) + path
    with open(file_to_open, 'w') as outfile:
        json.dump(data, outfile)

def load_data_from_file(file_name):
    path = "/data/youtube/{}.txt".format(file_name)
    file_to_open = os.path.dirname(__file__) + path
    with open(file_to_open) as json_file:
        data = json.load(json_file)
    return data

def get_youtube_account_data(account_id):
    url = 'https://www.googleapis.com/youtube/v3/search?key={}&channelId={}&part=snippet,id&order=date&maxResults=20'.format(
        os.getenv('YOUTUBE_KEY'),
        account_id
    )
    response = requests.get(url=url)
    return response.json()

class YouTubeScraper:
    def __init__(self, mock=False, account_id=None):
        self.account_id = account_id
        self.main_channel_id = 'UC0pdv_hgDx7oTT3kJAMnd5A'
        self.main_channel_data = None
        self.mock = mock
        self.mockable_accounts = [
            'Charlie Dalin'
        ]
    def run(self):
        self.get_accounts()
        self.add_posts_data()
        self.check_main_account_for_onboard_uploads()

    def check_main_account_for_onboard_uploads(self):
        data = load_data_from_file('mock_data_for_vendee_account')
        # data = get_youtube_account_data(self.main_channel_id)
        for account in self.accounts:
            for video in data['items']:
                title = video['snippet']['title'].lower()
                if account.sailor.name.lower() in title:
                    _video_item_dict_to_post(video, account)

    def get_data(self, account):
        if self.mock:
            if account.sailor.name in self.mockable_accounts:
                return
            file_name = 'mock_data_for' + account.sailor.name.replace(' ', '_').lower()
            return load_data_from_file(file_name)
        else:
            if account.account_id == self.main_channel_id:
                return
            return get_youtube_account_data(account.account_id)

    def add_posts_data(self):
        for account in self.accounts:
            data = self.get_data(account)
            if not data:
                # happens when data is mocked
                continue
            self.add_post(data, account)
        print('Completed YouTube collection.')

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
            _video_item_dict_to_post(item, account)

    def get_accounts(self):
        if self.account_id:
            self.accounts = Account.objects.filter(acccount_id=self.account_id)
        else:
            self.accounts = Account.objects.filter(platform='youtube')

def _video_item_dict_to_post(video, account):
    post = Post(
        account=account,
        title=video['snippet']['title'],
        description=video['snippet']['description'],
        created=video['snippet']['publishTime'],
        source_id=video['id']['videoId'],
        url='https://www.youtube.com/watch?v=' + video['id']['videoId']
    )
    print('Adding {}\'s  -  {}'.format(
        account.name,
        post.title))
    post.save()