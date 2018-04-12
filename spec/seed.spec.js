process.env.NODE_ENV = 'test';
const app = require('../app');
const {expect} = require('chai');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const { Topics, Articles, Users, Comments } = require('../models');
const { DB_URL, DATA_PATH } = require('../config');
const { topicsData, usersData, articlesData } = require(`../seed${DATA_PATH}`);
const seedDB = require('../seed/seed');

// SEED TESTS ***************************************************
describe('seed', () => {
    let topics, users, articles, comments;
    beforeEach(() => {
        return seedDB(topicsData, usersData, articlesData)
            .then(docs => [topics, users, articles, comments] = docs);
    });
    after(() => {
        return mongoose.disconnect();
    })
    describe('topics', () => {
        it('seeds topics', () => {
            return Topics.count().then(topicsCount => {
                expect(topicsCount).to.be.a('number');
                expect(topicsCount).to.not.equal(0)
            })
        });
    });
    describe('users', () => {
        it('seeds users', () => {
            return Users.count().then(usersCount => {
                expect(usersCount).to.be.a('number');
                expect(usersCount).to.not.equal(0)
            })
        });
    });
    describe('articles', () => {
        it('seeds articles', () => {
            return Articles.count().then(articlesCount => {
                expect(articlesCount).to.be.a('number');
                expect(articlesCount).to.not.equal(0)
            })
        });  
    });
    describe('comments', () => {
        it('seeds comments', () => {
            return Comments.count().then(commentsCount => {
                expect(commentsCount).to.be.a('number');
                expect(commentsCount).to.not.equal(0)
            })
        });
    });
});