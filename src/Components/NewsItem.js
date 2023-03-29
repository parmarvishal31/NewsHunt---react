import React, { Component } from 'react'
import img from './Breaking.png'


export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url, date, author, source } = this.props;
        return (
            <div className="card" style={{ width: '18rem' }}>
                <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-warning">
                    {source}
                </span>
                <img src={!imageUrl ? img : imageUrl} className="card-img-top" alt="..." style={{ height: '215px' }} />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {!author ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More </a>
                </div>
            </div>
        )
    }
}

export default NewsItem
