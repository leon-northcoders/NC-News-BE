const router = require('express').Router();
const topicsRouter = require('./topics');
const articlesRouter = require('./articles')

router.use('/topics', topicsRouter);
router.use('/articles', articlesRouter);

module.exports = router;