import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { getMovies } from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import ListGroup from "./common/listgroup";
import MoviesTable from "./moviesTable";
import Search from "./common/search";
import _ from "lodash";

class Movies extends Component {

    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc"}
    };

    componentDidMount() {
        const genres = [{ _id: "", name: 'All Genres'}, ...getGenres()];
        this.setState({ movies:getMovies(), genres: genres})
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies });
    };

    handleLike = (movie) => {
      const movies = [...this.state.movies];
      const index =  movies.indexOf(movie);
      movies[index] = { ...movies[index] };
      movies[index].liked = !movies[index].liked;
      this.setState({ movies: movies});
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, searchQuery: "", currentPage: 1});
    };

    handleSort = sortColumn => {
        this.setState({sortColumn: sortColumn});
    };

    handleSearch = query => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    };

    getPageData = () => {
        const { currentPage, pageSize, selectedGenre, movies: allMovies, sortColumn, searchQuery} = this.state;

        let filtered = allMovies;
        if (searchQuery)
            filtered = allMovies.filter(m =>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies};
    };


    render() {
        const { length: count } = this.state.movies;
        const { currentPage, pageSize, sortColumn, className, searchQuery} = this.state;
        if (count === 0 )
            return <p>There are no movies in the database</p>;

        const {totalCount, data} = this.getPageData();
        return (
            <div className="row">
                <div className="col-md-2 mb-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col-md-10">
                    <Link className="btn btn-primary mb-4" to="/movies/new">
                        New movie
                    </Link>
                    <p>Showing {totalCount} in the database</p>
                    <Search value={searchQuery} onChange={this.handleSearch}/>
                    <MoviesTable
                        sortColumn={sortColumn}
                        movies={data}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        className={className}
                    />
                    <Pagination
                        currentPage = {currentPage}
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}/>
                </div>
            </div>
        );
    }
}



export default Movies;
