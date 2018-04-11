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
                .get(`/api/topics/${topics[0]._id.toString()}/articles`)
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
                "body": "This is my new article content",
                "created_by":"5ace0c993e6357d31412564a"
            }
            return request
            .post(`/api/topics/${topics[0]._id.toString()}/articles`)
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
                .get(`/api/articles/${articles[2]._id.toString()}/comments`)
                .expect(200)
                .then(res => {
                    const { comments } = res.body
                    expect(comments[0]).to.be.an('object')
                    expect(res.body).to.have.all.keys('comments')
                })
            })
        })
    })