import React from 'react';
import {json,handleRes} from './Util.js';

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            error: '',
        }
        this.handleError = this.handleError.bind(this);
    }

    handleError(error) {
        this.setState(error);
    }

    componentDidMount() {
        fetch(`https://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=7379475e`)
            .then(handleRes)
                .then(json)
                    .then(data => {
                        if (data.Response === 'false') {
                            throw new Error(data.Error)
                        }
                        else {
                            this.setState({
                                movie:data,
                                error:''
                            });
                        }
                    })
                        .catch(this.handleError);
    }

    render() {
        if (!this.state.movie) {
            return null;
        }
        const {Title,Year,Plot,Director,imdbRating,Poster} = this.state.movie;
        
        return (
            <div class="container mt-4">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h2>{Title}</h2>
                        <p>Year: {Year}</p>
                        <p>Director(s): {Director}</p>
                        <p>Plot: {Plot}</p>
                        <p>imdbRating: {imdbRating}/10</p>
                    </div>
                    <div className="col-12 col-md-6">
                        <img src={Poster} alt={Title} />
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Movie;