import React, { Component } from 'react';
import {NavLink, Redirect} from "react-router-dom";
import { getCurrentUser } from "../services/authService";

class Profile extends Component {
    state = {};

    componentDidMount() {
        const user = getCurrentUser();
        this.setState({user});
    }

    render() {
        const { user } = this.state;
        if (!getCurrentUser()) return <Redirect to="/login"/>;
        return (
            <div className="container" >
                <div className="row">
                    <div className="col-md-4 pt-3 pb-2" style={{"backgroundColor": "#f8f9fa"}}>
                        <h4 className="mb-4">
                            Personal page
                        </h4>
                        {user && (
                            <React.Fragment>
                                <p>Hello, {user.name} <i className="fa fa-user fa-lg" aria-hidden="true"></i></p>
                                <p>email: {user.email}</p>
                                {user.isAdmin && <p>status: admin</p>}
                                {!user.isAdmin && <p>status: user</p>}
                                <p><NavLink to="/logout">logout</NavLink></p>
                            </React.Fragment>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
