import React, { Component} from 'react'
import { Link } from "react-router-dom";
import Parser from 'rss-parser';

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: 0,
      title: "",
      url: "",
      content: ""
    }
  }

  componentDidMount () {
    const parser = new Parser();
    (async () => {
      const feed = await parser.parseURL('https://cors-anywhere.herokuapp.com/http://feeds.bbci.co.uk/news/rss.xml');
      const items = feed.items.length
      const item = Math.ceil(Math.random() * items)
      this.setState({
        item: item,
        title: feed.items[item].title,
        url: feed.items[item].link,
        content: feed.items[item].content
      })
    })();
  }

  render() {
    return (
      <Link to={{
        pathname:"/news" ,
        state:{title: this.state.title, content: this.state.content, url: this.state.url }
        }}
      >
        <div className="dashboard-card">
          <div className="dashboard-card-title">
            <h2>News</h2>
          </div>
          <div className="dashboard-card-contents p-3">
            <h5>{this.state.title.substring(0,40)}...</h5>
            <p>{this.state.content}</p>
          </div>
        </div>
      </Link>
    )
  }
}

export default News
