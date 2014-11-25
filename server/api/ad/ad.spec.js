'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');

describe('GET /api/ads', function() {

    var user = new User({
        provider: 'local',
        name: 'User',
        email: 'test@test.com',
        password: 'password',
        role: 'advertiser'
    });

    it("should authenticate user if password is valid", function() {
        return user.authenticate('password').should.be.true;
    });


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

    it('should respond with JSON array', function(done) {
        request(app)
            .pos('/api/ads', {test: 'test'})
            .expect(500)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            done();
        });
    });
});
