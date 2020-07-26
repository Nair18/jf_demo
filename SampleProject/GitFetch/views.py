from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import requests
from GitFetch import api_base_url
from GitFetch.handlers import get_api_handler
import json


@api_view(["GET"])
def get_user_repos(self, user_name):
    try:
        formatted_reponse = get_api_handler(user_name, source='get_repos')
        return JsonResponse(formatted_reponse, safe=False)
    except ValueError as e:
        return Response(e.args[0],status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_user_followers(self, user_name):
    try:
        formatted_reponse = get_api_handler(user_name, source='get_followers')
        return JsonResponse(formatted_reponse, safe=False)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_popular_follower(self, user_name):
    try:
        formatted_reponse = get_api_handler(user_name, source='get_popular_follower')
        return JsonResponse(formatted_reponse, safe=False)
    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


# @api_view(["POST"])
# def create_new_repo(user_data):
#     try:
#         return JsonResponse("hello", safe=False)
#     except ValueError as e:
#         return Response(e.args[0],status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(["POST"])
# def update_repo_description(user_data):
#     try:
#         return JsonResponse("hello", safe=False)
#     except ValueError as e:
#         return Response(e.args[0],status.HTTP_400_BAD_REQUEST)


