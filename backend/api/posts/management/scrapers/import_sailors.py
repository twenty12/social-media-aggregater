import requests
from bs4 import BeautifulSoup
from posts.models import Boat, Sailor
import re
from datetime import datetime

class SailorGetter:

    def run(self):
        self.get_sailor_pages()

    def get_sailor_pages(self):
        url = 'https://www.vendeeglobe.org/en/'
        soup = self.get_soup(url)
        for i, a_tag in enumerate(soup.find_all(class_='menu-skippers__item')):
            self.scrape_skipper_page(a_tag.get('href'))

    def scrape_skipper_page(self, url):
        last_name = url.split('-')[-1]
        if Sailor.objects.filter(name__icontains=last_name).exists():
            return
        url = 'https://www.vendeeglobe.org' + url
        print(url)
        name = url.split('/')[-1].replace('-', ' ').title()
        soup = self.get_soup(url)
        if 'she was' in str(soup.html).lower():
            gender = 'F'
        else:
            gender = 'M'
        
        boat_name = soup.find_all(class_='skipper-boat-list__title')[0].text.title()
        details = soup.find_all('ul', class_='skipper-boat-list__specs-list l-unlist')[0].find_all('li')
        launch_date = [detail.text for detail in details if 'launch' in detail.text.lower()][0].replace('Launch Date: ', '')
        try:
            sail_number = [detail.text for detail in details if 'sail number' in detail.text.lower()][0]
            country = ''.join([i for i in sail_number if not i.isdigit()]).split(':')[-1].replace(' ', '')
        except IndexError:
            country = 'FRA'
        try:
            date_time_obj = datetime.strptime(launch_date, '%m %B %Y')
        except ValueError:
            print('err in dateteim')
            date_time_obj=None
        age = int(soup.find_all(class_='icon icon-calendar')[0].parent.text.replace('years old', ''))
        boat = Boat(
            name=boat_name,
            built=date_time_obj,
            country=country
        )
        boat.save()
        sailor = Sailor(
            name=name,
            age=age,
            gender=gender,
            boat=boat
        )
        sailor.save()
    def get_soup(self, url):

        response = requests.get(url)
        return BeautifulSoup(response.content)

if __name__ == '__main__':
    sg = SailorGetter()
    sg.run()