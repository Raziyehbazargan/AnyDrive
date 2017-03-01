'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = exports = {};

exports.s3UploadPromise = params => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      if (err) return reject(err);
      resolve(s3data);
    });
  });
};

exports.s3CreateBucket = bucketName => {
  return new Promise((resolve, reject) => {
    s3.createBucket({Bucket: bucketName}, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.s3ListBuckets = () => {
  return new Promise((resolve, reject) => {
    s3.listBuckets((err, bukcetList) => {
      if (err) return reject(err);
      resolve(bukcetList);
    });
  });
};

exports.s3DeleteBucket = function(params) {
  return new Promise((resolve, reject) => {
    s3.deleteBucket(params, (err, data) => {
      if (err) return reject(err);
      resolve('delete ');
    });
  });
};
