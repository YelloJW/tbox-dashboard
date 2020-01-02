import React, { Component } from 'react';
import { Router, Route , Link} from "react-router-dom";
import history from './history';

import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import News from './components/dashboard_pages/news'

import './App.css';

class App extends Component {

  render () {
    return(
    <Router history={history}>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/register" component={Register} />
        <Route path="/news" component={News} />
      </div>
    </Router>
    )
  }
}

export default App;
