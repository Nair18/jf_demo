from GitFetch import endpoint_mapper, api_base_url, function_mapper
from GitFetch.utils import fetch


def get_api_handler(user_name, source):
    if source in endpoint_mapper:
        endpoint = endpoint_mapper.get(source)
        url = api_base_url + endpoint.format(user_name)
        response = fetch(url)
        if 'error' in response:
            return response
        return function_mapper.get(source)(response)
    else:
        raise Exception


def post_api_handler(user_name, source):
    pass


def put_api_handler(user_name, source):
    pass