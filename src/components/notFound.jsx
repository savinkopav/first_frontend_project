import React, {Component} from 'react';

class NotFound extends Component {
    render() {
        return (
            <div>
                <h1>Not Found (404)</h1>
                <button className="btn btn-primary" onClick={this.props.history.goBack}>back</button>
            </div>
        );
    }
}

export default NotFound;
