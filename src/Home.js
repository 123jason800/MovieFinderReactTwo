import React from 'react';
import { Link } from 'react-router-dom';
import {json,handleRes} from './Util.js';


const Movie = ({movie}) => (
    <div className="col-12 col-md-4 col-lg-3 mb-3">
        <div className="card p-2 text-center h-100">
            <Link  to={`/movie/${movie.imdbID}/`}>
                <img className="card-img-top" src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <p>{movie.Type} | {movie.Year}</p>
            </Link>
        </div> 
    </div>
);
    



const SearchBar = ({handleSubmit,handleChange,currentForm}) => {

    return(
        <div className="text-center">
            <h1>Search a Movie Here</h1>
            <form onSubmit={handleSubmit} className="search-bar my-4 d-flex justify-content-center">
                <input onChange={handleChange} type="text" value={currentForm} />
                <input className="btn btn-primary ml-2" type="submit" value="search" />
            </form>
        </div>
    );
}

const SearchResults = ({error,movies}) => {
    
    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        )
    }

    return (
        <div>
            <hr />
            <div className="container">
                <div className="row">
                    {movies.map(movie => <Movie key={movie.imdbID} movie={movie} />)}
                </div>
            </div>
        </div>
    );
}


class MovieFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentForm:'',
            movies:[],
            error:'',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleError = this.handleError.bind(this);
        this.getMovies = this.getMovies.bind(this);
        
    }

    handleError(error) {
        const {message} = error
        this.setState({error:message});
    }

    getMovies(text) {
        fetch(`http://www.omdbapi.com/?s=${text}&apikey=7379475e`)
            .then(handleRes)
                .then(json)
                    .then(data => {
                        if(data.Response === 'True' && data.Search) {
                            this.setState({
                                movies: data.Search,
                                currentForm: '',
                                error: ''
                            });
                        }
                        if (data.Response === 'False'){
                            throw new Error(data.Error);
                        }
                    })
                        .catch(this.handleError);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.currentForm){
            return;
        }
        this.getMovies(this.state.currentForm);
    }

    handleChange(e) {
        const {value} = e.target;
        this.setState({
            currentForm:value
        });
    }

    render() {

        return (
            <div>
                <SearchBar 
                currentForm= {this.state.currentForm} 
                handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit}
                 />
                <SearchResults 
                error={this.state.error} 
                movies={this.state.movies} 
                />
            </div>
        );
       
    }
}

export default MovieFinder;