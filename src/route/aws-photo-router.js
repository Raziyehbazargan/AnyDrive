'use strict';

// NODE MODULES
const fs = require('fs');
const path = require('path');

// NPM MODULES
const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const createError = require('http-errors');
const debug = require('debug')('AnyDrive: photo-aws-router');

//APP MODULES
const Photo = require('../model/photo');
const Gallery = require('../model/gallery');
const s3Promisify = require('../lib/aws-promisify');
const bearerAuth = require('../lib/bearer-auth-middleware');

// module config
AWS.config = new AWS.Config();
AWS.config.setPromisesDependency(require('bluebird'));
new AWS.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// MODULE CONSTANTS
const s3 = new AWS.S3();
const dataDir =`${__dirname}/../data`;
const upload = multer({dest: dataDir});

const photoAwsRouter = module.exports = require('express').Router();

photoAwsRouter.post('/api/gallery/:galleryID/upload', upload.single('image'), function(req, res, next) {
  if (!req.file) return next(createError(400, 'no image found'));
  if (!req.file.path) return next(createError(500, 'image not saved'));

  let ext = path.extname(req.file.originalname); // ex: .jpg / .jpeg
  let params = {
    ACL: 'public-read',
    Bucket: `${req.params.bucket}`,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  Gallery.findById(req.params.galleryID)
  .then(s3Promisify.s3UploadPromise(params))
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(s3data => {
    del([`${dataDir}/*`]);
    let photoData = {
      name: req.body.name,
      caption: req.body.caption,
      objectKey: s3data.Key,
      imageURI: s3data.Location,
      userID: req.user._id,
      galleryID:req.params.galleryID,
    };
    return new Photo(photoData).save();
  })
  .then( pic => res.json(pic))
  .catch( err => next(err));
});

photoAwsRouter.delete('/api/photo/:bucket/:id', function(req, res, next) {
  debug('hit DELETE /api/photo/:bucket/:id');
  Photo.findById(req.params.id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(photo => {
    if(photo.userID.toString() !== req.user._id.toString())
      return Promise.reject(createError(401, 'User not authorized to delete this photo'));

    let params = {
      Bucket: req.params.bucket,
      Key: photo.objectKey,
    };
    return s3.deleteObject(params).promise();
  })
 .then(() => {
   return Photo.findByIdAndRemove(req.params.photoID);
 })
 .then(() => res.sendStatus(204));
});
