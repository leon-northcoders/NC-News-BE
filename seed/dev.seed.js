const mongoose = require('mongoose');
mongoose.Promise = Promise
const { DB_URL, DATA_PATH } = require('../config')
const seedDB = require('./seed')
const { topicsData, usersData, articlesData } = require(`.${DATA_PATH}`);

mongoose.connect(DB_URL)
    .then(() => {
        return seedDB(topicsData, usersData, articlesData)
    })
    .then(() => mongoose.disconnect())