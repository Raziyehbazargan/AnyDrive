import { Component } from 'react';
import { Form, FormControl , Glyphicon, FormGroup, Col, Button, ControlLabel, Checkbox, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import request from 'superagent';

const APP_URI = 'http://localhost:3000';

const ListItemGallery = ({index, gallery}) => {
  return (
      <div>
        <ListGroupItem key={index}>{gallery.name}
        <Button className="pull-right" bsStyle="danger" bsSize="small">
          <Glyphicon glyph="trash" />
        </Button>
        </ListGroupItem>

      </div>
  );
};


export default ListItemGallery;
