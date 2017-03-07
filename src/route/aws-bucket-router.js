'use strict';

// NPM MODULES
const AWS = require('aws-sdk');
const createError = require('http-errors');
const debug = require('debug')('AnyDrive: aws-bucket-router');

//APP MODULES
const bearerAuth = require('../lib/bearer-auth-middleware');
const s3Promisify = require('../lib/aws-promisify');

// module config
AWS.config = new AWS.Config();
AWS.config.setPromisesDependency(require('bluebird'));

// MODULE CONSTANTS
const s3 = new AWS.S3();
const bucketAwsRouter = module.exports = require('express').Router();

bucketAwsRouter.post('/api/bucket/:bucket/create', bearerAuth, function(req, res, next) {
  if (!req.params.bucket) next(createError(400, 'no bucket name'));
  return s3Promisify.s3CreateBucket(req.params.bucket)
  .then(bucketName => res.send(bucketName))
  .catch(err => next(createError(400, 'no successful')));
});

bucketAwsRouter.get('/api/bucket/buckets', function(req, res, next) {
  return s3Promisify.s3ListBuckets()
  .then(data => res.send(data))
  .catch(err => next(createError(400, 'no successful')));
});

bucketAwsRouter.delete('/api/bucket/:bucket/delete', bearerAuth, function(req, res, next) {
  if (!req.params.bucket) next(createError(400, 'no bucket name'));
  return s3Promisify.s3DeleteBucket({Bucket: req.params.bucket})
  .then(result => res.send(result))
  .catch(err => next(createError(400, 'no successful')));
});

bucketAwsRouter.delete('/api/bucket/:bucket/empty', bearerAuth, function(req, res, next) {
  if (!req.params.bucket) next(createError(400, 'no bucket name'));
  return s3Promisify.s3EmptyBucket({Bucket: req.params.bucket})
  .then(result => res.send(result))
  .catch(err => next(createError(400, 'no successful')));
});
