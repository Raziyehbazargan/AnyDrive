'use strict';

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const debug = require('debug')('AnyDrive: bearer-middleware');

const User = require('../model/user.js');

module.exports = function(req, res, next){
  debug('bearer-auth');

  let authHeader = req.headers.authorization;
  if(!authHeader)
    return next(createError(401, 'authorization header required'));

  let token = authHeader.split('Bearer ')[1];
  if(!token)
    return next(createError(401, 'token required'));

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if(err) return next(createError(401, 'valid token required'));

    User.findOne({findHash: decoded.token})
    .then( user => {
      if (!user) next(createError(401, 'user not found or old token'));
      req.user = user;
      next();
    });
  });
};
