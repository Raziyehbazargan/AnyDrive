import { Component } from 'react';

import MainNavbar from './login/navbar-component';
// import SignIn from './signin-component';
// import Signup from './signup-component';
// import NewGallery from './gallery/create-gallery-component';
// import ListGallery from './gallery/list-gallery-component';
import Gallery from './gallery/gallery-component';
// import Footer from './footer-component';

class LoginView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <MainNavbar />
        <Gallery />
      </div>
    );
  }
}

export default LoginView;
