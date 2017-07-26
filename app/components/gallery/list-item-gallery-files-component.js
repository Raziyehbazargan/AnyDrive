import React, { Component } from 'react';


import SideMenu from './side-menu-component';
const APP_URI = process.env.APP_URI || 'http://localhost:3300';


class ListItemGalleryFiles extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { query } = this.props.location;
    const { params } = this.props;
    return (
        <h1>heey</h1>
    );
  }
}

export default ListItemGalleryFiles;
