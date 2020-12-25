import time
import os
from random import randint
import requests
from urllib.request import build_opener, ProxyHandler, URLError
from urllib.request import Request
from urllib.error import HTTPError
from http.client import RemoteDisconnected, IncompleteRead

from selenium import webdriver
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

from selenium.common.exceptions import ElementNotInteractableException

from requests.exceptions import ChunkedEncodingError

from utils.proxy_utils import get_proxy_params


class Downloader(object):
    def __init__(self, url):
        self.url = url.replace('https', 'http')
        self.attempts = 0

    def download(self):
        print('Downloading...')
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'}
        # proxy_params = {
        #     'http': 'http://lum-customer-hl_2fdc9c2e-zone-static_res:szbsupuw3qut@zproxy.lum-superproxy.io:22225',
        #     'https': 'http://lum-customer-hl_2fdc9c2e-zone-static_res:szbsupuw3qut@zproxy.lum-superproxy.io:22225'}
        password = 'DC+9ZTn2C&M5vp'
        username = 'spc563e25d'
        proxy_url = 'http://gate.smartproxy.com'
        countries = ['us', 'ca', 'gb', 'de', 'fr', 'es', 'it', 'se', 'gr']
        country = countries[randint(0, len(countries) - 1)]
        proxy_url = f'http://{username}:{password}@{country}.smartproxy.com:23827'
        print('Proxy URL: ' + proxy_url)
        proxy_params = {'http': proxy_url}
        ua = UserAgent()
        headers = {'User-Agent': ua.random}
        request = Request(self.url, headers=headers)
        opener = build_opener()
        if proxy_params:
            if self.attempts != 3:
                opener.add_handler(ProxyHandler(proxy_params))
        try:
            response = opener.open(request)
            html = response.read()
        except (URLError, RemoteDisconnected, requests.ConnectionError, IncompleteRead, HTTPError) as e:
            print('Failing on {}'.format(self.url))
            print(e)
            print(type(e))
            if self.attempts > 4:
                html = '<html><title>Page Not Found</title></html>'
                return html
            # if hasattr(e, 'code'):
            #     if e.code >= 400 or e.code < 500:
            #         html = '<html><title>Page Not Found</title></html>'
            #         return html
            self.attempts += 1
            minutes = 0.5 * self.attempts
            print('Attempt nummber{}'.format(self.attempts))
            print('Retying in {} min'.format(minutes))
            time.sleep(minutes * 60)
            html = self.download()
        return html


def get_html_via_selenium(url, driver=None, driver_commands_funcs=None):
    if not driver:
        path_to_utils = os.path.dirname(os.path.abspath(__file__))
        path = os.path.join(path_to_utils, 'chromedriver')
        options = webdriver.ChromeOptions()
        # options.add_argument('--ignore-certificate-errors')
        options.add_argument('--incognito')
        # options.add_argument('--headless')
        driver = webdriver.Chrome(
            executable_path=path,
            chrome_options=options)
    if url:
        driver.get(url)

    if driver_commands_funcs:
        for driver_commands_func in driver_commands_funcs:
            time.sleep(2)
            try:
                driver_commands_func(driver)
                time.sleep(5)

            except ElementNotInteractableException:
                time.sleep(10)
                print('Selenium failure. Check desktop for screenshot.')
                driver.save_screenshot('/Users/danielgladstone/Desktop/error.png')
    html = driver.page_source
    return html, driver


class RequestDownloader(object):
    def __init__(self, url, cookies, proxy):
        self.url = url
        self.proxy = proxy
        self.cookies = cookies
        self.attempts = 0

    def download(self):
        print('Downloading via requests...')
        if self.proxy:
            self.proxy_params = get_proxy_params()
        else:
            self.proxy_params = {}
        ua = UserAgent()
        headers = {'User-Agent': ua.random}
        try:
            html = requests.get(
                self.url,
                headers=headers,
                cookies=self.cookies,
                proxies=self.proxy_params).text
        except (URLError, RemoteDisconnected, requests.ConnectionError, IncompleteRead, HTTPError, ChunkedEncodingError) as e:
            print('Failing on {}'.format(self.url))
            print(e)
            print(type(e))
            self.attempts += 1
            minutes = 0.01 * self.attempts
            print('Attempt nummber{}'.format(self.attempts))
            print('Retying in {} min'.format(minutes))
            time.sleep(minutes * 60)
            html = self.download()
        return html


def get_soup(url, browser=False, proxy=False, driver=None, cookies=None, delay=True, driver_commands_funcs=None):
    if delay:
        time.sleep(randint(3, 6))
    if browser:
        html, driver = get_html_via_selenium(url=url, driver=driver, driver_commands_funcs=driver_commands_funcs)
    else:
        downloader = RequestDownloader(url, cookies, proxy)
        html = downloader.download()
    if driver:
        return BeautifulSoup(html, 'html.parser'), driver
    else:
        return BeautifulSoup(html, 'html.parser')

