import React, { Component} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

class Sport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    }
  }

  componentDidMount () {
    axios.get('http://localhost:5000/api/sport/results')
      .then(res => {
        this.setState({
          results: res.data.results,
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    const results = this.state.results
    const result = results.map(res => <li key={results.indexOf(res)}> {res} </li>)
    return(
      <Link to={"/sport"}>
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            <h2>Sport</h2>
          </div>
          <div className="dashboard-card-contents">
            <h3>Latest results</h3>
            <ul className="latest-results">
              {result}
            </ul>
          </div>
        </div>
      </Link>
    )
  }
}

export default Sport
