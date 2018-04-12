const { Topics, Articles, Users, Comments } = require('../models');

exports.voteOnComment = (req, res, next) => {
    const { VOTE } = req.query;
    const { comment_id } = req.params;
    const inc = VOTE === 'UP' ? 1 : VOTE === 'DOWN' ? -1 : 0;
    return Comments.findByIdAndUpdate(comment_id, { $inc: {votes: inc} }, { new: true })
        .then(comment => res.send({ comment }))
        .catch(err => {
            if(err.name === 'CastError') next({ status: 400 })
            else next(err)
        })
}

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params
    Comments.findByIdAndRemove(comment_id)
        .then(complete => {
            if(complete === null)
            next({ status: 404 })
            else
            res.status(202).send({ message:'Delete successful'})
        })
        .catch(err => {
            if(err.name === 'CastError') next({ status: 400 })
            else next(err)
        })
}