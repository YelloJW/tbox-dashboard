import React, { Component} from 'react'
import axios from 'axios';


class Sport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: "",
      resultsSummary: {},
      wins: [{}]
    }
  }

  onChange = e => {
    this.setState({
      team: e.target.value
    })
    axios.post('http://localhost:5000/api/sport/results', {team: e.target.value})
      .then(res => {
        this.setState({
          resultsSummary: res.data.summary,
          wins: res.data.wins
        })
    });
  }

  render() {
    const wins = this.state.wins
    const resultsSummary = this.state.resultsSummary
    const winList = wins.map(res => <li key={wins.indexOf(res)}> {res.home} vs {res.away} ({res.result}) </li>)
    return (
      <div className="container">
        <div>
          <h1 className="page-heading">Sport</h1>
          <div className="input-team row">
            <div className="col-6 offset-3 form-group">
              <label htmlFor="team">Team</label>
              <input className="form-control-plaintext" onChange={this.onChange} id="team" type="text" placeholder="Team name e.g. Fiorentina"/>
            </div>
          </div>
        </div>
        <div className="results">
          <div className="results-summary">
            <h2>{resultsSummary.W ? 'Results' : ""}</h2>
            <span>{resultsSummary.W ? 'Wins: ' + resultsSummary.W : ""}</span>
            <span>{resultsSummary.L ? 'Losses: ' + resultsSummary.L : ""}</span>
            <span>{resultsSummary.D ? 'Draws: ' + resultsSummary.D : ""}</span>
          </div>
          <div className="win-summary">
            <h2>{resultsSummary.W ? 'Wins' : ""}</h2>
            <ul>
              {resultsSummary.W ? winList: ""}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Sport


