import React, {Component} from 'react';

class Like extends Component {
    render() {
        let {onClick, liked} = this.props;

        let classes;
        !liked ? classes ="fa fa-thumbs-o-up" : classes = "fa fa-thumbs-up";

        return  (
            <i
                style={{cursor: 'pointer'}}
                onClick={onClick}
                className={classes}
                aria-hidden="true">

            </i>
        );




    }
}

export default Like;
