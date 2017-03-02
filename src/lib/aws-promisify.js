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

exports.s3DeleteBucket = params => {
  return new Promise((resolve, reject) => {
    s3.deleteBucket(params, (err, data) => {
      if (err) return reject(err);
      resolve('delete ');
    });
  });
};

function s3DeleteObject(params) {
  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) return reject(err);
      resolve('delete ');
    });
  });
}

exports.s3EmptyBucket = bucketName => {
  return new Promise((resolve, reject) => {
    s3.listObjects(bucketName, (err, data) => {
      if (err) return reject(err);
      data.Contents.map(obj => {
        var deleteParams = { Bucket: data.Name, Key: obj.Key };
        return s3DeleteObject(deleteParams)
        .then(resolve('Done'))
        .catch(err => reject(err));
      });
    });
  });
};
