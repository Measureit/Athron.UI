import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import App from './App';
import './i18n';

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/Athron.UI">
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);