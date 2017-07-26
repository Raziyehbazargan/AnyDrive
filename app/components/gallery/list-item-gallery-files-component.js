import React, { Component } from 'react';
import request from 'superagent';

import SideMenu from './side-menu-component';
const APP_URI = process.env.APP_URI || 'http://localhost:3300';


class ListItemGalleryFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryId: null,
    };
  }
  componentDidMount() {
    request
      .get(`${APP_URI}/api/gallery/name/${this.props.match.params.galleryname}`)
      .then(gallery => {
        console.log('iddd-->', gallery, this.props.match.params.galleryname)
        this.setState({ galleryId: gallery.body[0]._id});
      });
  }
  render() {
    const { query } = this.props.location;
    const { params } = this.props;
    //console.log(this.props.match.params.galleryname);

    return (
        <h1>heey {this.state.galleryId}</h1>
    );
  }
}

export default ListItemGalleryFiles;
