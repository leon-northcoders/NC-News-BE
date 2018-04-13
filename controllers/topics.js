

const { Topics, Articles, Users, Comments } = require('../models');
const _ = require('lodash');

exports.getTopics = (req, res, next) => {
    Topics.find()
        .then(topics => res.send({ topics }))
        .catch(next)
}

exports.getArticlesByTopicId = (req, res, next) => {
    // req.params = {belongs_to: (MongoID)}
    Articles.find(req.params)
        .populate('belongs_to')
        .populate('created_by')
        .then(articles => {
            if(!articles.length) next({ status: 404 })
            else
            res.send({ articles })
        })
        .catch(err => {
            if(err.name === 'CastError') next({ status: 400 })
            else next(err)
        })
}

exports.addArticleToTopic = (req, res, next) => {
    req.body.votes = _.random(-100, 100);
    Users.findOne()
        .then(user => {
            req.body.created_by = req.body_created_by || user._id 
            return Topics.findOne({_id: req.params.topic_id})
        })    
        .then(topic => {
            if(topic === null) return Promise.reject({ status: 404 })
            else 
            req.body.belongs_to = topic._id
            return Articles.create(req.body)
        }) 
        .then(article => {
            return Articles.findById(article._id)
            .populate('belongs_to')
            .populate('created_by')
        })
        .then(article => {   
            res.status(201).send({ article })
        })
        .catch(err => {
            if(err.name === 'CastError') next({ status: 400 })
            else if(err.name === 'ValidationError') next({ status: 400 })
            else next(err)
        })
}