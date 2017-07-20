import { Component } from 'react';
import { Form, FormControl , FormGroup, Col, Button, ControlLabel, Checkbox, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import request from 'superagent';

const APP_URI = 'http://localhost:3000';

class ListGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      galleryList: [],
    };
  }

  componentDidMount() {
    request
      .get(`${APP_URI}/api/gallery`)
      .then(galleries => {
        let galleryList = [];
        galleries.body.map(item => galleryList.push(item));
        this.setState({ galleryList });
      });
  }


  render() {
    console.log('this.state.galleryList.length', this.state.galleryList.length);
    return (
      <div className="container"> 
        <ListGroup>
          {
            this.state.galleryList.map((gallery, index) => {
              return <ListGroupItem key={index}>{gallery.name}</ListGroupItem>
            })
         }
        </ListGroup>
      </div>
    );
  }
}

export default ListGallery;
