api_base_url = "https://api.github.com"

endpoint_mapper = {
    'get_repos': "/users/{}/repos?sort=created&direction=desc",
    'get_followers': "/users/{}/followers",
    'get_popular_follower': "/users/{}/followers",
    'create_repo': '/user/repos',
    'edit_repo':  '/repos/{}/{}'
}

from GitFetch.utils import get_repo_response_formatter, get_followers_response_formatter, get_popular_follower_response_formatter

function_mapper = {
    'get_repos': get_repo_response_formatter,
    'get_followers': get_followers_response_formatter,
    'get_popular_follower': get_popular_follower_response_formatter
}

