from random import randint
import csv
import os

DIR_PATH = os.path.dirname(os.path.realpath(__file__))


def get_banned_proxies():
    with open(DIR_PATH + '/banned_proxies.csv', newline='') as csvfile:
        reader = csv.reader(csvfile)
        banned_proxies = [url for url in reader]
        if banned_proxies:
            banned_proxies = banned_proxies[0]
    return banned_proxies


def ban_proxy(url):
    print('Banning proxy url: ' + url)
    banned_proxies = get_banned_proxies()
    if url not in banned_proxies:
        banned_proxies.append(url)
        with open(DIR_PATH + '/banned_proxies.csv', 'w', newline='') as myfile:
            wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
            wr.writerow(banned_proxies)


def get_proxy_base_url():
    DIR_PATH = os.path.dirname(os.path.realpath(__file__))
    banned_proxies = get_banned_proxies()
    with open(DIR_PATH + '/proxy_list.csv', newline='') as csvfile:
        reader = csv.reader(csvfile)
        proxy_urls = [url[0] for url in reader]

    for url in proxy_urls:
        if url in banned_proxies:
            proxy_urls.remove(url)

    base_url = proxy_urls[randint(0, len(proxy_urls) - 1)]
    print('Base proxy usl: ' + base_url)
    return base_url


def get_proxy_params(attempts=None):
    base_url = get_proxy_base_url()
    password = 'DC+9ZTn2C&M5vp'
    username = 'spc563e25d'
    proxy_url = f'http://{username}:{password}@{base_url}'
    proxy_params = {'http': proxy_url, 'https': proxy_url}
    if attempts == 3:
        proxy_params = None
    return proxy_params
