'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('AnyDrive: gallery-router');

const Gallery = require('../model/gallery');
const bearerAuth = require('../lib/bearer-auth-middleware');

const galleryRouter = module.exports = Router();

galleryRouter.post('/api/gallery', jsonParser, function(req, res, next) {
  debug('POST: /api/gallery');
  console.log(req.body, 'boooooooody-->');
  //req.body.userID = req.user._id;
  new Gallery(req.body).save()
  .then(gallery => {
    console.log('res', gallery);
    res.json(gallery);
  })
  .catch(next);
});

galleryRouter.get('/api/gallery/:id', bearerAuth, function(req, res, next) {
  debug('GET: /api/gallery/:id');

  Gallery.findById(req.params.id)
  .then( gallery => {
    if (gallery.userID.toString() !== req.user._id.toString()) {
      return next(createError(401, 'invalid user'));
    }
    res.json(gallery);
  })
  .catch(next);
});
