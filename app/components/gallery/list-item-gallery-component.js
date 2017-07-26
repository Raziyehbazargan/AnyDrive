import { Component } from 'react';
import { Form, FormControl , Glyphicon, FormGroup, Col, Button, ControlLabel, Checkbox, Image, ListGroup, ListGroupItem, DropdownButton, MenuItem } from 'react-bootstrap';
import request from 'superagent';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import SideMenu from './side-menu-component';
const APP_URI = process.env.APP_URI || 'http://localhost:3300';

const ListItemGallery = ({index, gallery}) => {
  return (
      <div>
        <ListGroupItem href="#" key={index}>
        <Link to={`gallery/${gallery.name}`}>
          <Glyphicon glyph="glyphicon glyphicon-heart-empty" />
          <Glyphicon glyph="glyphicon glyphicon-file" /> {gallery.name}
          <SideMenu />
          </Link>
        </ListGroupItem>
      </div>
  );

};


export default ListItemGallery;
