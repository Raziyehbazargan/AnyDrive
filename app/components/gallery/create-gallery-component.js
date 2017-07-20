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
    // request
    //   .post(`${APP_URI}/api/galley`)
    //   .then(res => {
    //     console.log(res);
    //   });
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
      <div className="container"> 
        <div className="main">
          <div className="col-lg-6 col-md-6 col-xs-12">
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
        </div>
      </div>
    );
  }
}

export default NewGallery;
