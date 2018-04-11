const mongoose = require('mongoose');
const faker = require('faker');
const _ = require('lodash');
const { DB_URL, DATA_PATH } = require('../config');
mongoose.Promise = Promise;
const { Topics, Articles, Users, Comments } = require('../models');
const { topicsData, usersData, articlesData } = require(`.${DATA_PATH}`);

function seedDB (topics, users, articles){
    return mongoose.connection.dropDatabase()
        .then(() => {
            return Promise.all([seedTopics(topics), seedUsers(users)])
        })
        .then(([topicsDocs, usersDocs])=> {
            return Promise.all([topicsDocs, usersDocs, seedArticles(articles, topicsDocs, usersDocs)])
        }).then(([topicsDocs, usersDocs, articlesDocs])=> {
            return Promise.all([topicsDocs, usersDocs, articlesDocs, seedComments(articlesDocs, usersDocs)])
        })
        .catch(console.log)    
}

function seedTopics(data){
    return Topics.insertMany(data);
}

function seedUsers(data){
    return Users.insertMany(data);
}

function seedArticles(data, topicsDocs, usersDocs){
    data.forEach((article) => {
        topicsDocs.forEach((topicDoc) => {
            if(topicDoc.slug === article.topic){ 
                article.belongs_to = topicDoc._id
            }
            article.created_by = _.sample(usersDocs)._id
            article.votes = _.random(-100, 100)
        });
    });
    return Articles.insertMany(data);
}

function seedComments(articlesDocs, usersDocs){
    const comments = articlesDocs.map((article) => {
        return Array.from({length:_.random(1, 10)}, () => {
            return ({
                body: faker.hacker.phrase(),
                belongs_to: article._id,
                created_at: faker.date.past().getTime(),
                votes: _.random(-100, 100),
                created_by: _.sample(usersDocs)._id
            })
        })
    })
    return Comments.insertMany(_.flatten(comments))
}


module.exports = seedDB;