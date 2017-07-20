'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const errorMiddleware = require('./src/lib/error-middleware');
const authRouter = require('./src/route/auth-router');
const bucketAwsRouter = require('./src/route/aws-bucket-router');
const photoAwsRouter = require('./src/route/photo-router');
const galleryRouter = require('./src/route/gallery-router');

// load environment vars
dotenv.load();

// setup DB & configure mongoose for promises
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const PORT = 3300 || process.env.PORT;
const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authRouter);
app.use(galleryRouter);
app.use(photoAwsRouter);
app.use(bucketAwsRouter);
app.use(errorMiddleware);

const server = module.exports = app.listen(PORT, function() {
  console.log(`Server up on ${PORT}`);
});

server.isRunning = false;
