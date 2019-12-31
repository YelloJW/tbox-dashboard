import React, { Component } from 'react';
import { Router, Route , Link} from "react-router-dom";
import history from './history';

import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'

import './App.css';

class App extends Component {

  render () {
    return(
    <Router history={history}>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
    )
  }
}

export default App;
