import React from 'react';
import Form from "./common/form";
import Joi from "joi-browser";
import {getGenres} from "../services/genreService";
import {saveMovie, getMovie} from "../services/movieService";


class MovieForm extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors:{}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(10).integer().label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    };

    async populateGenres() {
        const { data: genres }  = await getGenres();
        this.setState({genres});
    }

    async populateMovie() {
        try {
            const {match} = this.props;
            const movieId = match.params.id;
            if(movieId === "new") return;

            const {data: movie} = await getMovie(movieId);
            this.setState({data: this.mapToViewModel(movie)});
        }
        catch (e) {
            if (e.response && e.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    mapToViewModel = (movie) => {
        const obj = {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
        return (obj);
    };


    doSubmit = async () => {
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
    };

    render() {
        return (
            <div className="container">
                <h2 className="mb-4">Movie Form</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title", "text")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock", "number")}
                    {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;
