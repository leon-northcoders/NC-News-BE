const { Topics, Articles, Users, Comments } = require('../models');
const _ = require('lodash');


exports.getArticles = (req, res, next) => {
    Articles.find()
        .populate('belongs_to')
        .populate('created_by')
        .lean()
        .then(articles => {
            return Promise.all([articles, Comments.find()])
        })
        .then(([articles, comments]) => {
        const articleIdAndCommentCountObj = comments.reduce((acc, comment) => {
            acc[comment.belongs_to] = (acc[comment.belongs_to] || 0) + 1;
            return acc;
        }, {})
        articles.forEach(article => {
            article.comments = articleIdAndCommentCountObj[article._id] || 0
        })
        res.send({ articles })
        })
        .catch(next)
}

exports.getCommentsByArticleId = (req, res, next) => {
    // req.params = {belongs_to: (MongoID)}
    Comments.find(req.params)
        .populate('belongs_to')
        .populate('created_by')
        .then(comments => {
            if(!comments.length) next({ status: 404 })
            else
            res.send({ comments })
        })    
        .catch(err => {
            if(err.name === 'CastError') next({ status: 400 })
            else next(err)
        })
}

exports.addCommentToArticle = (req, res, next) => {
    req.body.created_at = new Date().getTime()
    
    Users.findOne()
        .then(user => {
            req.body.created_by = req.body.created_by || user._id
            return Articles.findOne({_id: req.params.article_id})
        })
        .then(article => {
            if(article === null) return Promise.reject({ status: 404 })
            else 
            req.body.belongs_to = req.params.article_id
            return Comments.create(req.body)
        })
        .then(comment => {
            return Comments.findById(comment._id)
            .populate('belongs_to')
            .populate('created_by')
        })
        .then(comment =>{
            res.status(201).send({ comment })
        })
        .catch(err => {
            if(err.name === 'CastError') next({ status: 400 })
            else if(err.name === 'ValidationError') next({ status: 400 })
            else next(err)
        })
}

exports.voteOnArticle = (req, res, next) => {
    const { VOTE } = req.query;
    const { article_id } = req.params;
    const inc = VOTE === 'UP' ? 1 : VOTE === 'DOWN' ? -1 : 0;
    return Articles.findByIdAndUpdate(article_id, { $inc: {votes: inc} }, { new: true })
        .then(article => {
            if(article === null) next({ status: 404 })
            else 
            res.send({ article })
        })  
        .catch(err => {
            if(err.name === 'CastError') next({ status: 400 })
            else next(err)
        })
}