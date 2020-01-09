import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import history from './history';

import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import News from './components/dashboard_pages/news'
import Sport from './components/dashboard_pages/sport'
import Photo from './components/dashboard_pages/photos'
import Task from './components/dashboard_pages/tasks'

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
        <Route path="/sport" component={Sport} />
        <Route path="/photos" component={Photo} />
        <Route path="/tasks" component={Task} />
      </div>
    </Router>
    )
  }
}

export default App;
