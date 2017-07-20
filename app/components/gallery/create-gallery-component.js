import { Component } from 'react';
import { Form, FormControl , FormGroup, Col, Button, ControlLabel, Checkbox, Image } from 'react-bootstrap';
import request from 'superagent';

const APP_URI = 'http://localhost:3000';

class NewGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.createNewGallery = this.createNewGallery.bind(this);
  }

  componentDidMount() {

  }


  createNewGallery(e) {
    e.preventDefault();
    const gallery = {
      name : e.target.name.value,
    };

    request
      .post(`${APP_URI}/api/gallery`)
      .set('Content-Type', 'application/json; charset=utf-8')
      .send({name: gallery.name})
      .then(res => {
        console.log('NEW GALLERY DATA------>', res);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
        <div>
            <Form horizontal onSubmit={ e => this.createNewGallery(e)}>
              <FormGroup>
                <Col sm={12}>
                  <FormControl id="name" name="name" type="text" placeholder="New Gallery"/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={12}>
                  <Button
                  type="button"
                  bsStyle="primary"
                  type="submit"> New Gallery
                  </Button>
                </Col>
              </FormGroup>
            </Form>
      </div>
    );
  }
}

export default NewGallery;
