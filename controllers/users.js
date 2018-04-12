const { Topics, Articles, Users, Comments } = require('../models');

exports.getUserById = (req, res, next) => {
    Users.findOne(req.params)
        .then(user => {
        user === null ? next({ status: 400 }) : res.send({ user })
        })
        .catch(next)
}