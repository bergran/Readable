import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'

const composerEnhancements = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore()

ReactDOM.render(
  <Provider >
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
