process.env.NODE_ENV = 'test';
const app = require('../app');
const {expect} = require('chai');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const { Topics, Articles, Users, Comments } = require('../models');
const { DB_URL, DATA_PATH } = require('../config');
const { topicsData, usersData, articlesData } = require(`../seed${DATA_PATH}`);
const seedDB = require('../seed/seed');

// SERVER TESTS ***************************************************
let topics, users, articles, comments;
beforeEach(() => {
    return seedDB(topicsData, usersData, articlesData)
        .then(docs => {
            [topics, users, articles, comments] = docs
        })
});
after(() => {
    return mongoose.disconnect();
})
describe('/api', () => {
// TOPICS **************************************************    
    describe('/topics', () => {
        it('GET /topics', () => {
            return request
                .get('/api/topics')
                .expect(200)
                .then(res => {
                    const { topics } = res.body
                    expect(topics[0]).to.be.an('object')
                    expect(res.body).to.have.all.keys('topics')
                    expect(topics.length).to.equal(2)
                })
            })
        it('GET /topics/:belongs_to/articles', () => {
            return request
                .get(`/api/topics/${topics[0]._id}/articles`)
                .expect(200)
                .then(res => {
                    const { articles } = res.body
                    expect(articles[0]).to.be.an('object')
                    expect(res.body).to.have.all.keys('articles')
                    expect(topics.length).to.equal(2)
                    expect(articles[0].title).to.equal("Living in the shadow of a great man")
                })
            })
        it('POST /topics/:topic_id/articles', () => {
            const newArticle = { 
                "title": "this is my new article title",
                "body": "This is my new article content"
            }
            return request
            .post(`/api/topics/${topics[0]._id}/articles`)
            .send(newArticle)
            .expect(201)
            .then(res => {
                const { article } = res.body
                expect(article).to.be.an('object')
                expect(res.body).to.have.all.keys('article')
                expect(article.title).to.equal(newArticle.title)
                expect(article.body).to.equal(newArticle.body)
            })
        }) 
    })
    // ARTICLES ************************************************        
    describe('/articles', () => {
        it('GET /articles', () => {
            return request
                .get('/api/articles')
                .expect(200)
                .then(res => {
                    const { articles } = res.body
                    expect(articles[0]).to.be.an('object')
                    expect(res.body).to.have.all.keys('articles')
                    expect(articles.length).to.equal(4)
                })
        })
        it('GET /articles/:belongs_to/comments', () => {
            return request
                .get(`/api/articles/${articles[2]._id}/comments`)
                .expect(200)
                .then(res => {
                    const { comments } = res.body
                    expect(comments[0]).to.be.an('object')
                    expect(res.body).to.have.all.keys('comments')
                })
        })
        it('POST /articles/:articles_id/comments', () => {
            const newComment = {
                "body": "This is my new comment"
            }
            return request
            .post(`/api/articles/${articles[0]._id}/comments`)
            .send(newComment)
            .expect(201)
            .then(res => {
                const { comment } = res.body
                expect(comment).to.be.an('object')
                expect(res.body).to.have.all.keys('comment')
                expect(comment.body).to.equal(newComment.body)
                })
        }) 
        it('PUT /articles/:articles_id', () => {
            return request
            .put(`/api/articles/${articles[0]._id}?VOTE=UP`)
            .expect(200)
            .then(res => {
                expect(res.body.article.votes).to.equal(articles[0].votes + 1)
            })
            return request
            .put(`/api/articles/${articles[0]._id}?VOTE=DOWN`)
            .expect(200)
            .then(res => {
                expect(res.body.article.votes).to.equal(articles[0].votes - 1)
            })
            return request
            .put(`/api/articles/${articles[0]._id}?bananas`)
            .expect(200)
            .then(res => {
                expect(res.body.article.votes).to.equal(articles[0].votes)
            })
        }) 
    })
    // COMMENTS ************************************************
    describe('/comments', () => {
        it('PUT /comments/:comment_id', () => {
            return request
            .put(`/api/comments/${comments[0]._id}?VOTE=UP`)
            .expect(200)
            .then(res => {
                expect(res.body.comment.votes).to.equal(comments[0].votes + 1)
            })
            return request
            .put(`/api/comments/${comments[0]._id}?VOTE=DOWN`)
            .expect(200)
            .then(res => {
                expect(res.body.comment.votes).to.equal(comments[0].votes - 1)
            })
            return request
            .put(`/api/comments/${comments[0]._id}?bananas`)
            .expect(200)
            .then(res => {
                expect(res.body.comment.votes).to.equal(comments[0].votes)
            })
        }) 
        it('DELETE /comments/:comment_id', () => {
            return request
            .delete(`/api/comments/${comments[0]._id}`)
            .expect(202)
            .then(res => {
                expect(res.body.message).to.equal('Delete successful')
            })
            return request
            .delete(`/api/comments/${comments[0]._id}`)
            .expect(404)
            .then(res => {
                expect(res.body.message).to.equal('404: Page Not Found.')
            })
        })
    })
    // COMMENTS ************************************************
    describe('/users', () => {
        it('GET /users/:usernames', () => {
            return request
            .get(`/api/users/${users[0].username}`)
            .expect(200)
            .then(res => {
                const { user } = res.body
                expect(user).to.be.an('object')
                expect(res.body).to.have.all.keys('user')
                expect(user.name).to.equal('jonny')
            })
        })
    })
})        