'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const errorMiddleware = require('./src/lib/error-middleware');
//const authRouter = require('./src/route/auth-router');
const photoAwsRouter = require('./src/route/aws-photo-router');
const bucketAwsRouter = require('./src/route/aws-bucket-router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));

//app.use(authRouter);
app.use(photoAwsRouter);
app.use(bucketAwsRouter);
app.use(errorMiddleware);

const server = module.exports = app.listen(PORT, function() {
  console.log(`Server up on ${PORT}`);
});

server.isRunning = false;
