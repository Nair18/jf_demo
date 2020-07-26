import requests
from GitFetch import api_base_url, endpoint_mapper
import functools

def fetch(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Oh snap! Something went wrong."}

def get_license(license_dict):
    if license_dict:
        return license_dict.get('name')
    return None

def get_avatar(info):
    if info:
        return info.get('avatar_url')
    return None

def get_name(info):
    if info:
        return info.get('login')
    return None

def get_repo_response_formatter(response_list):
    info_list = []
    for response in response_list:
        repo_dict = {
            'name': response.get('name'),
            'stars': response.get('stargazers_count'),
            'description': response.get('description'),
            'license': get_license(response.get('license')),
            'created_at': response.get('created_at'),
            'owner_name': get_name(response.get('owner')),
            'owner_avatar': get_avatar(response.get('owner')),
            'repo_id': response.get('id')
        }
        info_list.append(repo_dict)
    return info_list

def get_followers_response_formatter(response_list):
    info_list = []
    for response in response_list:
        repo_dict = follower_dict_blueprint(response)
        info_list.append(repo_dict)
    return custom_sort(info_list, 'name')


def get_popular_follower_response_formatter(response_list):
    info_list = []
    for response in response_list:
        repo_dict = follower_dict_blueprint(response)
        info_list.append(repo_dict)
    return custom_sort(info_list, 'followers')[:1]


def follower_dict_blueprint(response):
    endpoint = endpoint_mapper.get('get_followers')
    user_name = response.get('login')
    url = api_base_url + endpoint.format(user_name)
    followers = fetch(url)
    repo_dict = {
        'name': user_name,
        'profile_url': response.get('url'),
        'avatar': get_avatar(response),
        'user_id': response.get('id'),
        'followers': len(followers)
    }
    return repo_dict


def custom_sort(response_list, key='name'):
    if key == 'name':
        return sorted(response_list, key=functools.cmp_to_key(sort_by_name))
    return sorted(response_list, key=functools.cmp_to_key(sort_by_followers))


def sort_by_name(dict1, dict2):
    if dict1.get('name') > dict2.get('name'):
        return 1
    elif dict1.get('name') < dict2.get('name'):
        return -1
    return 0


def sort_by_followers(dict1, dict2):
    if dict1.get('followers') > dict2.get('followers'):
        return 1
    elif dict1.get('followers') > dict2.get('followers'):
        return -1
    return 0
