import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import routes from './routes';

const store = configureStore();
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router>
      <Provider store = {store}>
      <Main history={history} />
      </Provider>
      </Router>
    );
  }
}

const Main = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  )
}

export default App;
