from django.test import TestCase
from GitFetch.utils import *

class UtilClass(TestCase):
    def test_fetch(self):
        username = 'Nair18'
        url = api_base_url + endpoint_mapper.get('get_repos').format(username)
        response = fetch(url)
        self.assertEqual(isinstance(response, list) and len(response)>1, True)

    def test_get_license(self):
        info = {'name': 'Apache 2.0'}
        response = get_license(info)
        self.assertEqual(response, 'Apache 2.0')

    def get_avatar(self):
        info = {'avatar_url': "something/soome-image"}
        response = get_avatar(info)
        self.assertEqual(response, 'something/soome-image')

    def get_name(self):
        info = {'login': 'Nair18'}
        response = get_name(info)
        self.assertEqual(response, 'Nair18')

    def test_get_repo_response_formatter(self):
        valid_keys = ['name', 'stars', 'description', 'license', 'created_at', 'owner_name', 'owner_avatar', 'repo_id']
        feed_list = [{
            'name': 'arena',
            'stargazers_count': 5,
            'description': "This is a demo content",
            'license': {'name': 'Apache 2.0'},
            'created_at': "12-09-09T34:12:12",
            'owner': {'login': 'Nair18'},
            'id': 1234
        }]
        response = get_repo_response_formatter(feed_list)
        print(response[0].keys())
        self.assertEqual((len(response) > 0) and (response[0].keys() == valid_keys), True)

    def test_custom_sort_name(self):
        feed_list = [{'name': 'b'}, {'name': 'a'}, {'name': 'c'}]
        response = custom_sort(feed_list, 'name')
        self.assertEqual(response == [{'name': 'a'}, {'name': 'b'}, {'name': 'c'}], True)

    def test_custom_sort_followers(self):
        feed_list = [{'followers': 'b'}, {'followers': 'a'}, {'followers': 'c'}]
        response = custom_sort(feed_list, 'followers')
        self.assertEqual(response == [{'followers': 'a'}, {'followers': 'b'},{'followers': 'c'}], True)

