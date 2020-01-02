import React, { Component} from 'react'

class News extends Component {
  constructor(props) {
    super(props)
  }


  componentDidMount () {
    fetch('https://cors-anywhere.herokuapp.com/' + this.props.location.state.url)
      .then(res => {
        // res.json()
      });
  }

  render() {
    return (
      <div className="newsContainer">
          <img className="newsImg" src="" alt=""/>
          <div className="newsContent">
            <h2>{this.props.location.state.title}</h2>
            <p>{this.props.location.state.content} "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          </div>
      </div>
    )
  }
}

export default News


