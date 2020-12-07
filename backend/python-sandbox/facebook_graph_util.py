import requests
def getInstagramUrlFromMediaId(media_id):
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    shortened_id = ''

    while media_id > 0:
        remainder = media_id % 64
        # dual conversion sign gets the right ID for new posts
        media_id = (media_id - remainder) // 64
        # remainder should be casted as an integer to avoid a type error. 
        shortened_id = alphabet[int(remainder)] + shortened_id

    return 'https://instagram.com/p/' + shortened_id + '/'

def media_id_to_code(media_id):
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    short_code = ''
    while media_id > 0:
        remainder = int(media_id % 64)
        media_id = (media_id-remainder)/64
        short_code = alphabet[remainder] + short_code
    return short_code

class FacebookPostMediaGraphTool:
    def __init__(self, access_token, page_name):
        self.access_token = access_token
        self.page_name = page_name
        self.root_url = 'https://graph.facebook.com/v3.2/'
        self.setup()

    # def post_content(self, content):
    #     self.content = content
    #     self.build_url()
    #     print(self.url)
    #     result = requests.post(self.url)
    #     print(result.json())

    def build_url(self):
        self.url = '{}media?'.format(self.root_url)
        for key in self.content:
            self.url += '{}={}&'.format(key, self.content[key])
        self.url = self.url[:-1]

    def setup(self):
        util = FacebookGraphSetupUtil(self)
        self.creator_id = util.get_creator_id()
        self.root_url += '{}/'.format(self.creator_id)


class FacebookGetMediaGraphTool:

    def __init__(self, access_token, page_name):
        self.access_token = access_token
        self.page_name = page_name
        self.root_url = 'https://graph.facebook.com/v3.2/'
        self.setup()

    def get_media_object_data(self):
        self.get_media_objects()
        self.media_objects = []
        for media_object in self.media_object_ids:
            print(media_object)
            # # '17965275157263295?fields=id,media_type,media_url,owner,timestamp'
            url = '{}/{}?fields=id,caption,media_url,timestamp&access_token={}'.format(
                self.root_url,
                media_object['id'],
                self.access_token)
            result = requests.get(url).json()
            print(result)
            break
            # self.media_objects.append(result)
        return self.media_objects

    def get_business(self):
        url = "https://graph.facebook.com/v3.2/{}?fields=business_discovery.username({}){}&access_token={}".format(
            self.creator_id,
            'alex_thomson_racing',
            '{followers_count,media_count,media{comments_count,like_count}}',
            self.access_token
        )
        result = requests.get(url).json()
        for post in result['business_discovery']['media']['data']:
            print(post)
            url = media_id_to_code(int(post['id']))
            print(url)
            url = 'https://graph.facebook.com/v3.2/{}?fields={}&access_token={}'.format(
                post['id'],
                'id',
                self.access_token
            )
            response = requests.get(url).json()
            print(response)
            break
        # print(result)

    def get_media_objects(self):
        quantity = 55
        url = '{}{}/media?access_token={}'.format(
            self.root_url,
            self.creator_id,
            self.access_token)
        self.media_object_ids = []
        while True:
            results = requests.get(url).json()
            self.media_object_ids += results['data']
            if len(self.media_object_ids) > quantity:
                break
            if not results['paging'].get('next'):
                break
            url = results['paging']['next']

    def setup(self):
        FacebookGraphSetupUtil(self)


class FacebookGraphSetupUtil:

    def __init__(self, graph_tool):
        self.graph_tool = graph_tool
        self.root_url = graph_tool.root_url
        self.access_token = graph_tool.access_token
        self.page_name = graph_tool.page_name
        self.run()

    def run(self):
        self.get_page_id()
        self.get_creator_id()
        self.graph_tool.creator_id = self.creator_id
        self.graph_tool.page_id = self.page_id

    def get_creator_id(self):
        url = '{}{}?fields=instagram_business_account&access_token={}'.format(
            self.root_url,
            self.page_id,
            self.access_token)
        results = requests.get(url).json()
        self.creator_id = results['instagram_business_account']['id']
        return self.creator_id

    def get_page_id(self):
        self.get_users_pages()
        for page in self.page_json['data']:
            print('')
            print(page)
            print(page['name'])

            if page['name'] == self.page_name:
                self.page_id = page['id']
                return

    def get_users_pages(self):
        url = '{}me/accounts?access_token={}'.format(
            self.root_url,
            self.access_token)
        self.page_json = requests.get(url).json()
        print(self.page_json)
        if self.page_json.get('error'):
            if self.page_json.get('error').get('message'):
                if 'expired' in self.page_json.get('error').get('message'):
                    raise ExpiredToken('Facebook token has expired')


class ExpiredToken(Exception):
    pass
