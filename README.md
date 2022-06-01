# WebServer + Rest Server

Before running ```npm start``` recuerda correr ```npm install``` to rebuild node modules.

# Steps to link heroku to your app


https://devcenter.heroku.com/articles/git

#initialize remote project on your project source
heroku git:remote -a <YOUR_APP_NAME>

# Rename your heroku origin for multiple environments.
git remote rename heroku heroku-staging

#Deploy project
git add .
git commit -m "make a bit better
git push heroku main"

