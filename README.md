# Application to perform basic operations using Github api

## Supported actions
1. Get all the public repositories of any valid username on github.
2. Get all the followers of a user sorted by name.
3. Get the most popular follower of a user among all.
4. Create repository(requires access token)
5. Edit description of the respository (requires access token).

## Getting started
0. You might face PYTHONPATH issue. Inside ```/SampleProject``` folder do ```export PYTHONPATH=$PWD``` 
1. Create virtual env ```pipenv shell```.
2. run ```pipenv install``` - will install all the necessary lib from pipfile
3. start django application - ```python manage.py runserver```. If successful, Try this url on you browser ```http://localhost:8000/repos/Nair18/```, if you get a      bunch of jsons on your screen then that's a green light.
4. run ```npm install``` for setting react app. If you see error, try removing the ```package-lock.json``` file and try again.
5. run ```npm start``` for starting the app
6. No db involved.

## There are in total 5 api endpoints in this project.
1. GET '/repos/:username' - served from Django application
2. GET '/followers/:username'- served from Django application
3. GET '/popular_follower/:username'- served from Django application
4. POST '/repos/:owner' - handled from react app
5. PATCH '/repos/:owner/:repo' - handled from react app

Check out ```SampleProject/GitFetch/views.py``` for the 'GET' rest apis. For client, checkout the ```client/antd-demo/src``` folder. This is were the magic happens!

## Interesting part of the application
The whole project is a simple crud app, mostly ```GET``` calls. The most interesting part is the ```POST``` and ```PATCH``` that happen for create and edit repository for an authorized user.
  ### Integrating Oauth and using it
  Follow below steps:
  1. Create your own oauth application by visiting ```/developer settings/Oauth apps``` from your github settings page.
  2. Mention the homepage url and the callback url(a path of your application github redirects, after user clicks authorize).
  3. Thats it, hit enter to create the oauth app. You will get your client id and client secret.
  4. Now add a ```Sign in with github``` button and add redirect url to your oauth app. When user clicks on the sign in button, he will be redirected to your oauth      application. When the user clicks authorize, github will redirect to the callback url(whatever you mentioned) along with a ```code```.
  5. Use this ```code``` in the url and do a post call to ```https://github.com/login/oauth/access_token``` and get the access token, here I store it in the              localstorage since no db. With the access token in hand, you are stronger than THANOS now.
  6. Once the token is received, everything else is pretty much trivial. You can play around with user's "limited" data. 
  7. This whole process is handled in the react app.
  
# TODO
1. Unit tests for backend. Since I didnt have enough bandwidth.
2. Unit tests for frontend. 

# Links
1. github oauth process - https://docs.github.com/en/developers/apps/authorizing-oauth-apps
2. api docs for playing around with repos - https://developer.github.com/v3/repos/#create-a-repository-for-the-authenticated-user
3. api docs for user related stuffs - https://docs.github.com/en/rest/reference/users
