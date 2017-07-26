import { Component } from 'react';
import { Form, FormControl , FormGroup, Col, Button, ControlLabel, Checkbox, Image } from 'react-bootstrap';
import request from 'superagent';

import NewGallery from './create-gallery-component';
import ListGallery from './list-gallery-component';
import SideNavbar from './side-nav-component';

const APP_URI = process.env.APP_URI || 'http://localhost:3300';
const list = [];

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryList: [],
    };

    this.createNewGallery = this.createNewGallery.bind(this);
  }

  createNewGallery(e) {
    request
      .post(`${APP_URI}/api/gallery`)
      .set('Content-Type', 'application/json; charset=utf-8')
      .send({name: e.name})
      .then(newGallery => {
        list.push(newGallery.body);
        this.setState({galleryList: list});
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    request
      .get(`${APP_URI}/api/gallery`)
      .then(galleries => {
        galleries.body.map(item => list.push(item));
        this.setState({ galleryList: list});
      });
  }

  render() {
    //console.log('this.state.galleryList', this.state.galleryList)
    return (
       <div>
         <SideNavbar />
         <NewGallery onAdd={this.createNewGallery}/>
         <ListGallery galleries={this.state.galleryList}/>
       </div>
    );
  }
}

export default Gallery;
