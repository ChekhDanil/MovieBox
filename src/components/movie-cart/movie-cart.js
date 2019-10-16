import React from 'react';
import movieImage from './mov1.png';
import './movie-cart.css';
import {Link} from "react-router-dom";
class MovieCart extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: null,
            rate: null,
            year: null,
        }
    }

    render() {
        return (
            <div className='col-3 d-flex flex-column align-items-center'>
                <div className="movie__img ">

          <Link to={`/movie/${this.props.id}`}>    <img src={`http://image.tmdb.org/t/p/w342${this.props.poster}`} width={195} height={250} alt={'rtrt'}/></Link>

                    <span className='movie__year'>2017</span>
                </div>
                <div className="movie__desc d-flex align-items-center justify-content-between">
                    <div className="movie__about">
                        <h2 className="movie__name">{this.props.title}</h2>
                        <span className="movie__type">Genre GET /movie/movie_id</span>
                    </div>
                    <div className="movie__rate">{this.props.rate}</div>

                </div>
            </div>
        )
    }

};

export default MovieCart;