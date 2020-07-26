#There are in total 5 api endpoints in this project.
1. GET '/repos/:username' - served from Django application
2. GET '/followers/:username'- served from Django application
3. GET '/popular_follower/:username'- served from Django application
4. POST '/repos/:owner' - handled from react app
5. PATCH '/repos/:owner/:repo' - handled from react app

#Getting started
1. Create virtual env
2. Activate virtual env
3. run pipenv install - will install all the necessary lib from pipfile
4. start django application - python manage.py runserver
5. run ```npm install``` for setting react app
6. run ```npm start``` for starting the app
