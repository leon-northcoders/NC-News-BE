const router = require('express').Router();
const { 
    getTopics, 
    getArticlesByTopicId,
    addArticleToTopic
 } = require('../controllers/topics')

router.get('/', getTopics);
router.get('/:belongs_to/articles', getArticlesByTopicId);
router.post('/:topic_id/articles', addArticleToTopic)

module.exports = router;