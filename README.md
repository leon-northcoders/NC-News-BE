# NORTHCODERS NEWS API

This project provides access to Northcoders news, articles, users and comments.
## Getting started

Link below displays all of the available ***API Endpoints***

* Link to NC-News API - https://leon-nc-news.herokuapp.com

## Prerequisites
This application was built with JavaScript and uses:
* [Node.js](https://nodejs.org/en/) - JavaScript run-time environment
* [Express](https://expressjs.com/) - Web framework
* [mongoose](http://mongoosejs.com/) - MongoDB object modelling
* [EJS](http://ejs.co/) - Javascript templating language
* [faker.js](https://github.com/marak/Faker.js/) - Generate data for seed files
* [Lodash](https://lodash.com/) - JavaScript utility library
* [Mocha](https://mochajs.org/) - JavaScript test framework
* [Chai](http://www.chaijs.com/) - Node assertion library
* [SuperTest](https://www.npmjs.com/package/supertest) - HTTP assertion library
* [Nodemon](https://nodemon.io/) - Monitors for changes and automatially restarts server 

## Installation

You will need to have Node installed before installing other dependencies. Information on how to do this can be found at the Node website.

1. Download a copy of the project through GitHub:
```
git clone https://github.com/leondelaimy/BE-FT-northcoders-news
```
2. Download the necessary dependencies:
```
npm i
```

## Config

Before proceeding, you will need to create a `config` directory within the root of the project. It is recommended to use a different file for **test**, **production** and **development** node environments, with each exporting the URL location of your MongoDB database.

1. Create config file for each node environment, exporting the corresponding URL
```
exports.DB_URL = 'mongodb://localhost:27017/northcoders_news_test'
```
2. Create `index.js` which exports necessary config file depending on node environment
```
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
module.exports = require(`./${process.env.NODE_ENV}`)
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

## Author
### [leondelaimy](https://github.com/leondelaimy)