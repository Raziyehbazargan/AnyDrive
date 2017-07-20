import { Component } from 'react';
import { Form, FormControl , FormGroup, Col, Button, ControlLabel, Checkbox, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import request from 'superagent';

const APP_URI = 'http://localhost:3000';

const ListItemGallery = ({index, gallery}) => {
  return (
      <ListGroupItem key={index}>{gallery.name}</ListGroupItem>
  );
};


export default ListItemGallery;
