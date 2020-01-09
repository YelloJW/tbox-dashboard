import React, { Component} from 'react'
import axios from 'axios';


class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.location.state.title,
      image_src: "",
      content: this.props.location.state.content
    }
  }

  componentDidMount () {
    const url = {url: this.props.location.state.url}
    axios.post('http://localhost:5000/api/news/scrape', url)
      .then(res => {
      console.log(res)
      this.setState({
        title: res.data.title,
        image_src: res.data.image,
        content: res.data.content
      })
    })
    .catch(err => {
      console.log(err)
    });
  }

  render() {
    return (
      <div className="newsContainer">
          <img className="newsImg" src={this.state.image_src} alt=""/>
          <div className="newsContent">
            <h2>{this.state.title}</h2>
            <p>{this.state.content}</p>
          </div>
      </div>
    )
  }
}

export default News


