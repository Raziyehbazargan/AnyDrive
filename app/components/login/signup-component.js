import { Component } from 'react';
import { Form, FormControl , FormGroup, Col, Button, ControlLabel, Checkbox, Image } from 'react-bootstrap';
import request from 'superagent';

const APP_URI = 'http://localhost:3300';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      email: null,
      password: null,
    };

    this.createUser = this.createUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  // componentDidMount() {
  //   request
  //     .get(`${APP_URI}/api/signup`)
  //     .then(res => {
  //       console.log(res);
  //     });
  // }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  createUser() {
    request
      .post(`${APP_URI}/api/signup`)
      .send({email: this.state.email, password: this.state.password})
      .then(res => {
        console.log('res', res);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="main">
          <div className="col-lg-6 col-md-6 col-xs-12">
            <Form horizontal>

              <FormGroup controlId="formHorizontalEmail">
                <Col sm={12}>
                  <FormControl name="email" type="email" placeholder="Email" onChange={this.handleEmailChange}/>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col sm={12}>
                  <FormControl name="password" type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={12}>
                  <Checkbox>Remember me</Checkbox>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col sm={12}>
                  <Button className="btn btn-primary" type="submit" onClick={this.createUser}>
                    Create an account
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

export default Signup;
