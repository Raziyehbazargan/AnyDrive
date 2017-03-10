'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const debug = require('debug')('AnyDrive: photo-router-test');

const Photo = require('../src/model/photo');
const User = require('../src/model/user');
const Gallery = require('../src/model/gallery');

const serverToggle = require('./lib/server-toggle');
const server = require('../server');


const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  password: '1234',
  email: 'exampleuser@test.com',
};

const exampleGallery = {
  name: 'test gallery',
  desc: 'test gallery description',
};

const examplePic = {
  name: 'example pic',
  caption: 'example pic description',
  image: `${__dirname}/data/image.jpg`,
};

describe('Photo Routes', function() {
  before( done => {
    serverToggle.serverOn(server, done);
  });

  after( done => {
    serverToggle.serverOff(server, done);
  });

  afterEach( done => {
    Promise.all([
      Photo.remove({}),
      User.remove({}),
      Gallery.remove({}),
    ])
    .then( () => done())
    .catch(done);
  });

  describe('POST: /api/gallery/:id/photo', function() {
    describe('with a valid token and valid data', function() {
      before(done => {
        new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user => {
          console.log(user);
          this.tempUser = user;
          return user.generateToken();
        })
        .then(token => {
          this.tempToken = token;
          done();
        })
        .catch(done);
      });

      before(done => {
        console.log(this.tempUser._id, 'this.tempUser._id');
        exampleGallery.userID = this.tempUser._id.toString();
        new Gallery(exampleGallery).save()
        .then(gallery => {
          this.tempGallery = gallery;
          done();
        })
        .catch(done);
      });

      after(done => {
        delete exampleGallery.userID;
        done();
      });

      it('should return a photo', done => {
        console.log(this.tempGallery._id, 'this.tempGallery._id--->');
        request.post(`${url}/api/gallery/${this.tempGallery._id}/photo`)
        .set({
          Authorization: `Bearer ${this.tempToken}`,
        })
        .field('name', examplePic.name)
        .field('caption', examplePic.caption)
        .attach('image', examplePic.image)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.name).to.equal(examplePic.name);
          //expect(res.body.caption).to.equal(examplePic.caption);
          //expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          done();
        });
      });
    });
  });
});
