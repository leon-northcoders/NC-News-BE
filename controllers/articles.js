const { Topics, Articles, Users, Comments } = require('../models');

exports.getArticles = (req, res, next) => {
    Articles.find()
        .then(articles => res.send({ articles }))
}

exports.getCommentsByArticleId = (req, res, next) => {
    // req.params = {belongs_to: (MongoID)}
    Comments.find(req.params)
        .then(comments => res.send({ comments }))
}

exports.addCommentToArticle = (req, res, next) => {
    
}