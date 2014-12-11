'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');

var user = new User({
    provider: 'local',
    name: 'User',
    email: 'test@test.com',
    password: 'password',
    role: 'advertiser'
});

describe('POST /api/ads', function () {
    it('should create a new ad and return it', function (done) {
        var item = {
            type: 'test'
        };

        request(app)
            .post('/api/ads', item)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) {return done(err);}
                res.body.should.be.instanceof(Object).have.property('author');
                done();
            });
    });
});

describe('GET /api/ads', function () {
    it('should respond with JSON array', function(done) {
        request(app)
            .get('/api/ads')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});
