import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {



    PropTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        // console.log('vishal');
        this.state = {
            articles: [],
            loding: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHunt`
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loding: true })
        let data = await fetch(url)
        let paresedData = await data.json();
        this.setState({
            articles: paresedData.articles,
            totalResults: paresedData.totalResults,
            loding: false

        })
    }


    async componentDidMount() {
        this.updateNews();

    }

    handlePreClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews();

    }

    fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 })
        this.setState({ loding: true })
        let data = await fetch(url)
        let paresedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(paresedData.articles),
            totalResults: paresedData.totalResults,
            loding: false

        })
    };

    render() {
        return (
            <>
                <h1 className='d-flex justify-content-center my-2 mb-4'>  NewsHunt - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                <hr />
                {this.state.loding && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container my-4 ">
                        <div className="row">
                            {this.state.articles.map((ele) => {
                                return <div className="col-md-4 col-sm-6 d-flex justify-content-center my-2 mb-4" key={ele.url}>
                                    <NewsItem title={ele.title ? ele.title.slice(0, 45) : ''} description={ele.description ? ele.description.slice(0, 90) : ''} imageUrl={ele.urlToImage} url={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* bottom btn */}
                {/* {!this.state.loding && <div className="container d-flex justify-content-between">

                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Privious</button>

                    <div className='d-flex ' style={{ alignItems: 'center' }}>
                        {this.state.page > 1 && <label className='mx-2'
                            style={{ width: '30px', height: '30px', border: '2px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600' }} >
                            {this.state.page - 1}
                        </label>}

                        <label className='mx-2'
                            style={{ width: '40px', height: '40px', border: '2px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700' }}>
                            {this.state.page}
                        </label>
                        {this.state.page + 1 < Math.ceil(this.state.totalResults) / this.props.pageSize && <label className='mx-2'
                            style={{ width: '30px', height: '30px', border: '2px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600' }}>
                            {this.state.page + 1}
                        </label>}
                    </div>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults) / this.props.pageSize} type="button" className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>


                </div>
                } */}
            </>
        )
    }
}




export default News
