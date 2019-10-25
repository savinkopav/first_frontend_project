import React, {Component} from 'react';
import { toast } from "react-toastify";
import {Link} from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import {getGenres} from "../services/genreService";
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

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ _id: "", name: 'All Genres'}, ...data];

        const { data: movies } = await getMovies();
        this.setState({ movies:movies, genres: genres})
    }

    handleDelete = async movie => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies });
        try {
            await deleteMovie(movie._id);
        }
        catch (e) {
            if(e.response && e.response === 404) toast.error("This movie has already been deleted");
            this.setState({ movies: originalMovies });
        }
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
        const { user } = this.props;

        if (count === 0 ) return <p>There are no movies in the database</p>;

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
                    {user && <Link className="btn btn-primary mb-4" to="/movies/new">
                        New movie
                    </Link>}
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
