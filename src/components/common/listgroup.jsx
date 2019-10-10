import React, {Component} from 'react';

class ListGroup extends Component {
    render() {
        const { items, onItemSelect, valueProperty, textProperty, selectedItem} = this.props;
        return (
            <React.Fragment>
                <ul className="list-group">
                    { items.map( item => (
                        <li key={item[valueProperty]}
                            className={ selectedItem === item ? "list-group-item active" : "list-group-item" }
                            style={{cursor: 'pointer'}}
                            onClick={() => onItemSelect(item)}>
                                {item[textProperty]}
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};

export default ListGroup;
