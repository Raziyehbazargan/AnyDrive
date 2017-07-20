import  React from 'react'
import { render } from 'react-dom'

import LoginView from './components/login-view';

window.React = React;

render(
	<LoginView />,
	document.getElementById('react-root')
)
