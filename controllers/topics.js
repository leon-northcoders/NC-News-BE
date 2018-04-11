const { Topics, Articles, Users, Comments } = require('../models');
const _ = require('lodash');

exports.getTopics = (req, res, next) => {
    Topics.find()
        .then(topics => res.send({ topics }))
}

exports.getArticlesByTopicId = (req, res, next) => {
    // req.params = {belongs_to: (MongoID)}
    Articles.find(req.params)
        .then(articles => res.send({ articles }))
}

exports.addArticleToTopic = (req, res, next) => {
    req.body.belongs_to = req.params.topic_id
    req.body.votes = _.random(-100, 100);
    Articles.create(req.body)
        .then(article =>{
            res.status(201).send({ article })
    })
}