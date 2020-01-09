import React, { Component } from "react";

import Weather from './dashboard_components/weather';
import News from './dashboard_components/news';
import Sport from './dashboard_components/sport';
import Photos from './dashboard_components/photos';
import Tasks from './dashboard_components/tasks';
import Clothes from './dashboard_components/clothes';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state={
      user: JSON.parse(localStorage.getItem('user'))
    }
  }

  render() {
    const user = this.state.user

    return (
    <div className="container">
      <h1 className="dashboard-title">Good day {user.name}</h1>
      <img src={user.profileImg || "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"} alt="" className="profile-img"/>
      <div className="dashboard-container">
        <Weather/>
        <News/>
        <Sport/>
        <Photos user={user}/>
        <Tasks user={user}/>
        <Clothes/>
      </div>
    </div>
    )
  }
}

export default Dashboard;

