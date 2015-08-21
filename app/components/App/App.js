import React from 'react';
import { Router } from 'react-router';

import { history } from 'react-router/lib/BrowserHistory';

import createStore from 'lib/createStore';
import { Provider } from 'react-redux';

import routes from '../../routes';

const store = createStore();

class App extends React.Component {

  renderRouter() {
    return (
      <Router history={history}>
        {routes}
      </Router>
    );
  }

  render() {
    return (
      <Provider {...{ store }}>
        { () => this.renderRouter() }
      </Provider>
    );
  }
}

export default App;
