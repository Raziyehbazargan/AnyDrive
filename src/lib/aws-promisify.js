'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = exports = {};

exports.s3UploadPromise = function(params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      if (err) return reject(err);
      resolve(s3data);
    });
  });
};

exports.s3CreateBucket = function(bucketName) {
  return new Promise((resolve, reject) => {
    s3.createBucket({Bucket: bucketName}, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
