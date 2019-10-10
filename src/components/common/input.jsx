import React, {Component} from 'react';

class Input extends Component {
    render() {
        const { name, label, value, error, onChange, type} = this.props;
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input
                    value={value}
                    onChange={onChange}
                    id={name}
                    name={name}
                    type={type}
                    className="form-control"/>
                { error && <div className="alert alert-danger">{error}</div> }
            </div>
        );
    }
}

export default Input;
