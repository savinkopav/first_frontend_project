import React, {Component} from 'react';

class MovieForm extends Component {
    render() {
        const {match, history} = this.props;
        return (
            <div className="container">
                <h1>Movie Form {match.params.id}</h1>
                <button
                    className="btn btn-primary mt-2"
                    onClick={() => history.push("/movies")}>save</button>
            </div>
        );
    }
}

export default MovieForm;
