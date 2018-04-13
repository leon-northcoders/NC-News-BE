# NORTHCODERS NEWS API

This project provides access to Northcoders news, articles, users and comments.
## Getting started

Link below displays all of the available ***API Endpoints***

* Link to NC-News API - https://leon-nc-news.herokuapp.com

## Prerequisites
This application was built with JavaScript and uses:
 * [MongoDB](https://www.mongodb.com/)
 * [Node.js](https://nodejs.org/en/)
 * [Express](https://expressjs.com/)
 * [MLab](https://mlab.com/)
 * [Heroku](https://heroku.com/)

## Installation

1. Download a copy of the project through GitHub:
```
git clone https://github.com/leondelaimy/BE-FT-northcoders-news
```
2. Download the necessary dependencies:
```
npm i
```

## Running the tests
The test suite is built with the [Mocha](https://mochajs.org/) test framework, including [Chai](http://www.chaijs.com) and [Supertest](https://www.npmjs.com/package/supertest).

There are 31 written tests in the ***spec*** folder. To execute the test suite:
```
npm t
```
## Running the app in localhost

1. To run server locally:
```
npm run dev
```
2. To access your app within a browser or [Postman](https://www.getpostman.com), visit:
```
http://localhost:9090/
```
3. From there you can browse a list of all of the available API endpoints.
## Seeding the databases

1. To seed the development database:
```
npm run seed:dev
```
2. To seed the production database on Mlab:
```
npm run seed:prod
```

## Deployment
### Mlab
* Create an account on [MLab](https://mlab.com/)
* Create a new database
* Create a user for the DB
* Update the URL with the user and password and add it to your config files

### Heroku
1. Create account for [Heroku](https://heroku.com/)
```
heroku create
```
2. Set the DB_URL for the heroku config variables:
```
heroku config:set DB_URL=[Mlab-db-url]
```
3. Then deploy the app using:
```
git push heroku master
```

View the app:
```
heroku open
```
View logs and errors:
```
heroku logs --tail
```
## Author
* ### [leondelaimy](https://github.com/leondelaimy)

## Acknowledgments
* The [Mitchcoders](https://northcoders.com/) team