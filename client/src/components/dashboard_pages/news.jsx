import React, { Component} from 'react'
import axios from 'axios';


class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.location.state.title,
      content: "Loading article",
      imageSrc: ""
    }
  }

  componentDidMount () {
    const url = {url: this.props.location.state.url}
    axios.post('http://localhost:5000/api/news/scrape', url)
      .then(res => {
      this.setState({
        title: res.data.title,
        content: res.data.content,
        imageSrc: res.data.image
      })
    })
    .catch(err => {
      console.log(err)
    });
  }

  render() {
    const title = this.state.title
    const content = this.state.content
    const imageSrc = this.state.imageSrc
    return (
      <div className="newsContainer">
          <img className="newsImg" src={imageSrc} alt=""/>
          <div className="newsContent">
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
      </div>
    )
  }
}

export default News


