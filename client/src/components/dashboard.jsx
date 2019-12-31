import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from '../history';

import Weather from './dashboard_components/weather';
import News from './dashboard_components/news';
import Sport from './dashboard_components/sport';
import Photos from './dashboard_components/photos';
import Tasks from './dashboard_components/tasks';
import Clothes from './dashboard_components/clothes';

class Dashboard extends Component {
  render() {
    console.log("hello")
    const user = history.location.state.email
    // console.log(history.config.data.email)
    return (
    <div className="container">
      <h1>Good day {user}</h1>
      <div className="dashboard-container">
        <div className="dashboard-card"><Weather/></div>
        <div className="dashboard-card"><News/></div>
        <div className="dashboard-card"><Sport/></div>
        <div className="dashboard-card"><Photos/></div>
        <div className="dashboard-card"><Tasks/></div>
        <div className="dashboard-card"><Clothes/></div>
      </div>
    </div>
    )
  }
}

export default Dashboard;

