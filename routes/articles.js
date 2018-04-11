const router = require('express').Router();
const { 
    getArticles, 
    getCommentsByArticleId,
    addCommentToArticle 
} = require('../controllers/articles')

router.get('/', getArticles);
router.get('/:belongs_to/comments', getCommentsByArticleId)
router.post('/:article_id/comments', addCommentToArticle)

module.exports = router;