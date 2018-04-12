const router = require('express').Router();
const {
    voteOnComment,
    deleteComment
} = require('../controllers/comments')

router.put('/:comment_id', voteOnComment)
router.delete('/:comment_id', deleteComment)

module.exports = router;
