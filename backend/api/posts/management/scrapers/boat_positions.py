import requests
from bs4 import BeautifulSoup
from posts.models import Boat

class BoatPositionGetter:

    def run(self):
        self.get_soup()
        self.get_positions()
    
    def get_positions(self):
        for div in self.soup.find_all(class_='rankings__item'):
            name_div = div.find(class_='rankings__desc')
            boat_name = name_div.find('span').text
            # name = name_div.text.replace(boat_name, '').strip()
            position = div.find(class_='rankings__number').text.strip()
            self.update_position(boat_name, position)
    def update_position(self, boat_name, position):
        boats = Boat.objects.filter(name__icontains=boat_name)
        if not len(boats):
            return
        print(position)
        boat = boats[0]
        print(boat.name)
        if position == 'RET':
            boat.position = 0
        else:
            boat.position = int(position)
        boat.save()


    def get_soup(self):
        url = 'https://www.vendeeglobe.org/en/ranking'
        response = requests.get(url)
        self.soup = BeautifulSoup(response.content)


