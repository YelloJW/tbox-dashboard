import React, { Component} from 'react'

class Sport extends Component {

  render() {
    return(
      <div className="dashboard-card">
        <div className="dashboard-card-title">
          <h2>Sport</h2>
        </div>
        <div className="dashboard-card-contents">
          <h3>Sport headline</h3>
          <p>A team did very well at something. They scored 3 goals.</p>
        </div>
      </div>
    )
  }
}

export default Sport
