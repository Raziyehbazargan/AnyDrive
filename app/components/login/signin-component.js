import { Component } from 'react';
import { Form, FormControl , FormGroup, Col, Button, ControlLabel, Checkbox, Image } from 'react-bootstrap';
import request from 'superagent';
import { Redirect } from 'react-router';

const APP_URI = 'http://localhost:3300';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
    };

    this.submitSignin = this.submitSignin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  submitSignin() {
    request
      .get(`${APP_URI}/api/signin`)
      .then(res => {
        <Redirect to="/gallery"/>
      });
  }

  render() {
    return (
      <div className="container">
        <div className="main">
          <div className="col-lg-6 col-md-6 col-xs-12">
            <Image src="../../img/upload-files.png" responsive />
          </div>
          <div className="col-lg-6 col-md-6 col-xs-12">
            <Form horizontal onSubmit={this.submitSignin}>
              <FormGroup>
                <Col sm={8}>
                  <Button className="btn btn-primary" type="button">
                    Sign in with Google
                  </Button>
                </Col>
                <Col sm={4}>
                  or <a href="" className="">
                    create an account</a>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <Col sm={12}>
                  <FormControl type="email" placeholder="Email" onChange={this.handleEmailChange}/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col sm={12}>
                  <FormControl type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={12}>
                  <Checkbox>Remember me</Checkbox>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={12}>
                  <Button className="btn btn-primary" type="submit">Sign in</Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
