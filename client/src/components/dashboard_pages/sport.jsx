import React, { Component} from 'react'
import axios from 'axios';


class Sport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: "",
      results: {},
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
          results: res.data.summary,
          wins: res.data.wins
        })
    });
  }

  render() {
    const wins = this.state.wins
    const results = this.state.results
    const resultsNotEmpty = Object.entries(results) != 0 // true or false
    const resultsSummary = resultsNotEmpty ? <div className="results-summary"><h2>Results</h2><span>Wins {results.W}</span><span>Losses {results.L}</span><span>Draws {results.D}</span></div> : "" ;
    const winComponents = wins.map(res => <li key={wins.indexOf(res)}> {res.home} vs {res.away} ({res.result}) </li>)
    const winSummary = resultsNotEmpty ? <div className="win-summary"><h2>Wins</h2><ul>{winComponents}</ul></div> : "" ;

    return (
      <div className="container">
        <div>
          <h1 className="page-heading">Sport</h1>
          <div className="input-team row">
            <div className="col-6 offset-3 form-group">
              <label htmlFor="team">Team</label>
              <input className="form-control-plaintext" onChange={this.onChange} id="team" type="text" placeholder="e.g. Fiorentina"/>
            </div>
          </div>
        </div>
        <div className="results">
          {resultsSummary}
          {winSummary}
        </div>
      </div>
    )
  }
}

export default Sport


