import { Component } from 'react';
import { Form, FormControl , Glyphicon, FormGroup, Col, Button, ControlLabel, Checkbox, Image, ListGroup, ListGroupItem, DropdownButton, MenuItem } from 'react-bootstrap';
import request from 'superagent';

const APP_URI = process.env.APP_URI || 'http://localhost:3300';

const SideMenu = ({index, gallery}) => {
  return (
      <div className="pull-right">
      <DropdownButton bsSize="small" title="..." id="bg-nested-dropdown">
        <MenuItem eventKey="1">Download</MenuItem>
        <MenuItem eventKey="2">Rename</MenuItem>
        <MenuItem eventKey="3">Move</MenuItem>
        <MenuItem eventKey="4">Copy</MenuItem>
        <MenuItem eventKey="5">Delete</MenuItem>
      </DropdownButton>
      <Button  bsStyle="default" bsSize="small">
        <Glyphicon glyph="share" />
      </Button>
      </div>
  );
};


export default SideMenu;
