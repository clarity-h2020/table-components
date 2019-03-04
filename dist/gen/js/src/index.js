import 'babel-polyfill';
import 'es6-symbol/implement';
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import App from './App';

import './index.css';

const target = document.querySelector('.root');

if (target != null) {
    ReactDOM.render(React.createElement(
        'div',
        null,
        React.createElement(App, null)
    ), target);
}