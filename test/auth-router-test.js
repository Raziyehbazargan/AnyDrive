'use strict';
require('./lib/mock-env');
const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const server = require('../server.js');
const User = require('../src/model/user.js');
const serverToggle = require('./lib/server-toggle.js');

const url = `http://localhost:${process.env.PORT}`;

const mockUser = {
  password: '123456',
  email: 'test-user@test.com',
};

describe('Auth Routes', function() {
  before( done => {
    serverToggle.serverOn(server, done);
  });

  after( done => {
    serverToggle.serverOff(server, done);
  });

  describe('POST: /api/signup', function() {
    after(done => {
      User.remove({})
      .then(() => done())
      .catch(err => done(err));
    });

    describe('with a valid body', function() {
      it('should return a token', done => {
        request.post(`${url}/api/signup`)
        .send(mockUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });
    });
  });

  describe('GET: /api/signin', function() {
    describe('with a valid body', function() {
      before(done => {
        let user = new User(mockUser);

        user.generatePasswordHash(mockUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempUser = user;
          done();
        })
        .catch(done);
      });

      after(done => {
        User.remove({})
        .then(() => done())
        .catch(done);
      });

      it('should return a token', done => {
        request.get(`${url}/api/signin`)
        .auth(mockUser.email, mockUser.password)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });
});
