import { Component } from 'react';
import { Form, FormControl , FormGroup, Col, Button, ControlLabel, Checkbox, Image } from 'react-bootstrap';
import request from 'superagent';

const APP_URI = process.env.APP_URI || 'http://localhost:3300';

class NewGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {

  }

  onSubmitForm(e) {
    let nameValue = document.getElementById('name').value;
    const gallery = {
      name : nameValue,
    };

    this.props.onAdd(gallery);
  }

  render() {
    return (
        <div>
            <Form horizontal>
              <FormGroup>
                <Col sm={12}>
                  <FormControl id="name" name="name" type="text" placeholder="New Gallery"/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={12}>
                  <Button type="button" bsStyle="primary" onClick={e => this.onSubmitForm(e)}>New Gallery</Button>
                </Col>
              </FormGroup>
            </Form>
      </div>
    );
  }
}

export default NewGallery;
