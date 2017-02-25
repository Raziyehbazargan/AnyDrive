'use strict';

// import AWS from 'aws-sdk';
// import uuid from 'node-uuid';

const AWS = require('aws-sdk');
//import uuid from 'node-uuid';
//create an s3 client
let s3 = new AWS.S3();

//create a bucket and uploading something into in
let bucketName = 'test';
let keyName = 'hello_world.txt'; // file for upload

s3.createBucket({ Bucket: bucketName }, ()=> {
  let params = {
    ACL: 'public-read',
    Bucket: bucketName,
    Key: keyName,
    Body: 'Hello World!',
  };

  s3.putObject(params, (err, data) => {
    if (err) console.log(err);
    else console.log(`Successfully uploaded data to ${bucketName}/${keyName}`);
  });
});
