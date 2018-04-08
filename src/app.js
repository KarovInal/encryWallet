import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import BarApp from './components/bar-app';
import Typography from 'material-ui/Typography';
import Register from './components/register';
import Wallet from './components/wallet';
import Products from './components/products';
import './assets/css/main.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import {
  LOGIN,
  REGISTER,
  WALLET
} from './constants/routers';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <BarApp />
            <Route exact path="/"  component={ Products } />
            <Route path={LOGIN}    component={ Register } />
            <Route path={REGISTER} component={ Register } />
            <Route path={`${WALLET}/:walletId?`} component={ Wallet } />
          </div>
        </Router>
      </Provider>
    )
  }
};

render(
  <App />,
  document.getElementById('root')
);
