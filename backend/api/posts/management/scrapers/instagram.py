import subprocess
import re
import requests
import json

from bs4 import BeautifulSoup
from fake_headers import Headers
from utils.soup_utils import get_soup

def write_to_clipboard(output):
    process = subprocess.Popen(
        'pbcopy', env={'LANG': 'en_US.UTF-8'}, stdin=subprocess.PIPE)
    process.communicate(output.encode('utf-8'))


def get_ig_account_soup(account_name):
    url = 'https://www.instagram.com/{}/'.format(
        account_name
    )
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'}
    header = Headers(
        browser="chrome",  # Generate only Chrome UA
        os="win",  # Generate ony Windows platform
        headers=True  # generate misc headers
    )
    print(header.generate())
    # response = requests.get(url=url, headers=header.generate())
    # print(response)
    # write_to_clipboard(str(response.content))

    # return BeautifulSoup(response.content)
    soup, driver = get_soup(url, proxy=True)
    write_to_clipboard(str(soup.html))
    return soup

class IgGetter():
    def __init__(self):
        self.run()

    def run(self):
        self.soup = get_ig_account_soup('piphareoceanracing')
        self.get_json_data()
        for item in self.data['entry_data']['ProfilePage'][0]['graphql']['user']['edge_felix_video_timeline']['edges']:
            print(item['display_url'])
            print('item')
        # write_to_clipboard(str(self.data['entry_data']['ProfilePage']))

    def get_json_data(self):
        script = self.soup.find(text=re.compile(r'window._sharedData =.*'))
        self.data = json.loads(script.replace('window._sharedData = ', '').replace(';', ''))


if __name__ == '__main__':
    IgGetter()
