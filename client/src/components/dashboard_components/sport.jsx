import React, { Component} from 'react'
import { Link } from "react-router-dom";

class Sport extends Component {
  render() {
    return(
      <Link to={"/sport"}>
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            <h2>Sport</h2>
          </div>
          <div className="dashboard-card-contents">
            <h3>Sport headline</h3>
            <p>A team did very well at something. They scored 3 goals.</p>
          </div>
        </div>
      </Link>
    )
  }
}

export default Sport
