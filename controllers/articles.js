const { Topics, Articles, Users, Comments } = require('../models');
const _ = require('lodash');


exports.getArticles = (req, res, next) => {
    Articles.find()
        .populate('belongs_to')
        .populate('created_by')
        .then(articles => res.send({ articles }))
}

exports.getCommentsByArticleId = (req, res, next) => {
    // req.params = {belongs_to: (MongoID)}
    Comments.find(req.params)
        .populate({
            path: 'belongs_to',
            populate: {
                path: 'belongs_to',
                model: 'topics', 
            }
        })
        .populate({    
            path: 'belongs_to',
            populate: {
                path: 'created_by',
                model: 'users'
            }     
        })
        .populate('created_by')
        .then(comments => res.send({ comments }))
}

exports.addCommentToArticle = (req, res, next) => {
    req.body.belongs_to = req.params.article_id
    req.body.created_at = new Date().getTime()
    req.body.votes = _.random(-100, 100);
    
    Users.findOne()
        .then(user => {
            req.body.created_by = req.body.created_by || user._id
    return Comments.create(req.body)
        })
        .then(comment => {
    return Comments.findOne({ _id: comment._id })
            .populate({
                path: 'belongs_to',
                populate: {
                    path: 'belongs_to',
                    model: 'topics', 
                }
            })
            .populate({    
                path: 'belongs_to',
                populate: {
                    path: 'created_by',
                    model: 'users'
                }     
            })
            .populate('created_by')
        })
        .then(comment =>{
            res.status(201).send({ comment })
    })
}

exports.voteOnArticle = (req, res, next) => {
    const { VOTE } = req.query;
    const { article_id } = req.params;
    const inc = VOTE === 'UP' ? 1 : VOTE === 'DOWN' ? -1 : 0;
    return Articles.findByIdAndUpdate(article_id, { $inc: {votes: inc} }, { new: true })
            .then(article => res.send({ article }))  
}