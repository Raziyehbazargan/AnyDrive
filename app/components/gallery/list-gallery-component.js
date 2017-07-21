import { Component } from 'react';
import { Form, FormControl , Glyphicon,FormGroup, Col, Button, ControlLabel, Checkbox, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import request from 'superagent';

import ListItemGallery from './list-item-gallery-component';

const APP_URI = process.env.APP_URI || 'http://localhost:3300';

class ListGallery extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   galleryList: [],
    // };
  }

  // componentDidMount() {
  //   request
  //     .get(`${APP_URI}/api/gallery`)
  //     .then(galleries => {
  //       let galleryList = [];
  //       galleries.body.map(item => galleryList.push(item));
  //       this.setState({ galleryList });
  //     });
  // }

  /* shouldComponentUpdate: is always called before the render
  method and enables to define if a re-rendering is needed or can be skipped*/
  // shouldComponentUpdate(nextProps, nextState) {
  //   // return a boolean value
  //   return true;
  // }

  /*componentWillUpdate gets called as soon as the the shouldComponentUpdate
  returned true. Any state changes via this.setState are not allowed as this
  method should be strictly used to prepare for an upcoming update not trigger
  an update itself.*/
  // componentWillUpdate(nextProps, nextState){
  //   // perform any preparations for an upcoming update
  //   console.log('componentWillUpdate', nextProps, nextState.galleryList);
  //
  // }
  /*Finally componentDidUpdate is called after the render method. Similar
  to the componentDidMount, this method can be used to perform DOM operations
  after the data has been updated.*/
  // componentDidUpdate(prevProps, prevState){
  //   console.log('componentDidUpdate', prevProps, prevState.galleryList);
  // }
  render() {
    return (
        <ListGroup>
          { this.props.galleries.map((gallery, index) => {
            return (
              <ListItemGallery key={index} gallery={gallery} />
            );
          })
         }
      </ListGroup>
    );
  }
}

export default ListGallery;
