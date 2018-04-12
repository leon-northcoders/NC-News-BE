const router = require('express').Router();
const { 
    getArticles, 
    getCommentsByArticleId,
    addCommentToArticle,
    voteOnArticle 
} = require('../controllers/articles')

router.get('/', getArticles);
router.get('/:belongs_to/comments', getCommentsByArticleId);
router.post('/:article_id/comments', addCommentToArticle);
router.put('/:article_id', voteOnArticle);

module.exports = router;