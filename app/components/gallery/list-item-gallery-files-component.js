import { Component } from 'react';
import { Form, FormControl , FormGroup, Col, Button, ControlLabel, Checkbox, Image } from 'react-bootstrap';
import request from 'superagent';
import Dropzone from 'react-dropzone';
//import SideMenu from './side-menu-component';
const APP_URI = process.env.APP_URI || 'http://localhost:3300';


class ListItemGalleryFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryId: null,
    };
    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFile(file) {
    console.log('Upload File:', file);
    const image = file[0];
    const params = {
      name: image.name,
      type: image.type,
      galleryID: this.state.galleryId,
      file: image,
    };

    request
      .post(`${APP_URI}/api/gallery/:id/photo`)
      .attach('file', image)
      .field({id: params.galleryID})
      .then(gallery => {
        console.log(gallery);
      });

  }
  componentDidMount() {
    request
      .get(`${APP_URI}/api/gallery/name/${this.props.match.params.galleryname}`)
      .then(gallery => {
        this.setState({ galleryId: gallery.body[0]._id});
      });
  }
  render() {
    return (
      <Dropzone onDrop={this.uploadFile} />
    );
  }
}

export default ListItemGalleryFiles;
