const { Topics, Articles, Users, Comments } = require('../models');

exports.getUserById = (req, res, next) => {
    Users.findOne(req.params)
        .then(user => {
            res.send({ user })
        })
}