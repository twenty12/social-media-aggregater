from facebook_graph_util import FacebookGetMediaGraphTool
import requests

def test():
    access_token = "EAACpSMQQmCQBAOXNnBAry858OtqIuxFZCcVGzKaY1SEGmu7ZCHNH7m4hxn1gwGMR3FxA8KhpsnZBMFVH6JFBlamhI05OOnNJoFTJ1n3F0CLVqkuip0uEAEvqXPu8cqE4DiW2ZAqZA1ZCB1YgW031ZCqPalMFZAwfXnUwXZA2f2ikfTjwRBgmxM7xfzewG8qz1QQbGDfRAyFailt97OD5cb5b4vtvMFxZB5SzW8yE9oIiuhiAZDZD"
    page_name = 'Art Pigeon'
    graph_tool = FacebookGetMediaGraphTool(access_token, page_name)
    media_objects = graph_tool.get_business()

def test_youtube():
    url = 'https://www.googleapis.com/youtube/v3/search?key={}&channelId={}&part=snippet,id&order=date&maxResults=20'.format(
        'AIzaSyDlr0k9Vyik9QDEzeZUOwhHl7EZ1hcESU0',
        'UC-UZ1Jq_0TjgStH511Diegw'
    )
    response = requests.get(url=url)
    print(response.json()) 
if __name__ == '__main__':
    test_youtube()