import  React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginView from './components/login-view';
import Gallery from './components/gallery/gallery-view';
import ListItemGalleryFiles from './components/gallery/list-item-gallery-files-component';

window.React = React;

render(
	<Router>
    <div>
      <Route exact path="/" component={LoginView}></Route>
      <Route path="gallery" component={Gallery}></Route>
			<Route exact path="/gallery/:galleryname" component={ListItemGalleryFiles}></Route>
    </div>
  </Router>,
	document.getElementById('react-root')
);
