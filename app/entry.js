import  React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginView from './components/login-view';
import Gallery from './components/gallery/gallery-view';

window.React = React;

render(
	<Router>
    <div>
      <Route exact path="/" component={LoginView}/>
      <Route path="/gallery" component={Gallery}/>
    </div>
  </Router>,
	document.getElementById('react-root')
);
