import React, {Component} from 'react';
import { Route, Redirect } from "react-router-dom";
import {getCurrentUser} from "../../services/authService";

class ProtectedRoute extends Component {
    render() {
        const { path, component: Component, render, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props => {
                    if (!getCurrentUser()) return <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}/>;
                    return Component ? <Component {...props}/> : render(props);
                }}
            />
        );
    }
}

export default ProtectedRoute;
