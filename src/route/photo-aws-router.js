'use strict';

// NODE MODULES
const fs = require('fs');
const path = require('path');

// NPM MODULES
const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const createError = require('http-errors');
const debug = require('debug')('AnyDrive:photo-aws-router');

//APP MODULES
const Photo = require('../model/photo');
const bearerAuth = require('../lib/bearer-auth-middleware');
const s3Promisify = require('../lib/aws-promisify');

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

photoAwsRouter.post('/api/photo/:bucket/create', function(req, res, next) {
  if (!req.params.bucket) next(createError(400, 'no bucket name'));
  return s3Promisify.s3CreateBucket(req.params.bucket)
  .then(bucketName => res.send(bucketName))
  .catch(err => next(createError(400, 'no successful')));
});

// photoAwsRouter.get('/api/photo/buckets', bearerAuth, function(req, res, next) {
//   s3.listBuckets((err,list) => {
//     if (err) next(createError(400,'no buckets'));
//     res.send(list);
//   });
// });

// photoAwsRouter.delete('/api/photo/:bucket/delete', bearerAuth, function(req, res, next) {
//   if (!req.params.bucket) next(createError(400, 'no bucket name'));
//   s3.deleteBucket({Bucket: req.params.bucket}, function(err, data) {
//     if (err) next(createError(500,'not successful'));
//     res.send('delete ');
//   });
// });

// photoAwsRouter.delete('/api/photo/:bucket/clear', bearerAuth, function(req, res, next) {
//   if (!req.params.bucket) next(createError(400, 'no bucket name'));
//
//   s3.createBucket({Bucket: req.params.bucket}, function(err, data) {
//     if (err) next(createError(500,'not successful'));
//     res.send('delete ');
//   });
// });
//
// photoAwsRouter.post('/api/photo/:bucket/upload', bearerAuth, upload.single('file'), function(req, res, next) {
//   if (!req.file) return next(createError(400, 'no file found'));
//   if (!req.file.path) return next(createError(500, 'file not saved'));
//
//   let ext = path.extname(req.file.originalname);
//
//   let params = {
//     ACL: 'public-read',
//     Bucket: `${req.params.bucket}`,
//     Key: `${req.file.filename}${ext}`,
//     Body: fs.createReadStream(req.file.path),
//   };
//
//   return s3UploadPromise(params)
//   .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
//   .then(s3data => {
//     del([`${dataDir}/*`]);
//     let photoData = {
//       name: req.body.name,
//       caption: req.body.caption,
//       objectKey: s3data.Key,
//       imageURI: s3data.Location,
//       userID: req.user._id,
//     };
//     return new Photo(photoData).save();
//   });
// });

// exports.uploadPhoto = function(req, res, next) {
//   s3.putObject(params)
//   .then(()=>{
//     let photoData = {
//       name: req.body.name,
//       caption: req.body.caption,
//       //objectKey: s3data.Key,
//       //imageURI: s3data.Location,
//       userID: req.user._id,
//     };
//     return new Phomto(photoData).save();
//   });
// };
