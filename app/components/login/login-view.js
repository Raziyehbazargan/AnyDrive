import { Component } from 'react';

import MainNavbar from './navbar-component';
import SignIn from './signin-component';
import Footer from './footer-component';

class LoginView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <MainNavbar />
        <SignIn />
        <Footer />
      </div>
    )
  }
}

export default LoginView;
