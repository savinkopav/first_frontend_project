import React, {Component} from 'react';

class Search extends Component {
    render() {
        const { value, onChange } = this.props;
        return (
            <input
                placeholder="Search by title..."
                type="text"
                name="query"
                className="form-control mb-4"
                value={value}
                onChange={e => onChange(e.currentTarget.value)}
            />
        );
    }
}

export default Search;
