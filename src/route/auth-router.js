'use strict';

const jsonParser = require('body-parser').json();
const debug = require('debug')('AnyDrive: auth-router');
const Router = require('express').Router;

const basicAuth = require('../lib/basic-auth-middleware');

const User = require('../model/user');
const authRouter = module.exports = Router();

authRouter.post('/api/signup', jsonParser, function(req, res, next) {
  debug('POST: /api/signup');

  let password = req.body.password;
  delete req.body.password;
  let user = new User(req.body);
  user.email = req.body.email;

  user.generatePasswordHash(password)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => {
    console.log('token----->', token);
    res.send(token)
  })
  .catch(next);
});

authRouter.get('/api/signin', basicAuth, function(req, res, next) {
  debug('GET: /api/signin');
  User.findOne({email: req.auth.email})
  .then(user => user.comparePasswordHash(req.auth.password))
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(next);
});
