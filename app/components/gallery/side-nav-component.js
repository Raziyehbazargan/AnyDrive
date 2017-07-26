import { Component } from 'react';
import { Col, Panel} from 'react-bootstrap';
import request from 'superagent';

const APP_URI = process.env.APP_URI || 'http://localhost:3300';

const panleStyle = {
  heigth: '200px',
  background: '#F7F9FA',
};

const SideNavbar = ({index, gallery}) => {
  return (
    <Panel style={panleStyle}>
      Side Nav
    </Panel>
  );
};


export default SideNavbar;
