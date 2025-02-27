import React, {Component} from 'react';
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {

    render() {
        const { user } = this.props;
        return (
                <nav
                    className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                    <Link className="navbar-brand" to="/">
                        <i className="fa fa-home fa-lg" aria-hidden="true"></i>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item ">
                                <NavLink className="nav-link" to="/movies">Movies <span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/customers">Customers</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
                            </li>
                            {!user && (
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/registration">Registration</NavLink>
                                    </li>
                                </React.Fragment>
                            )}
                            {user && (
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/profile">{user.name} | {user.email}</NavLink>
                                    </li>
                                    <li className="nav-item mt-2">
                                        <NavLink className="fa fa-sign-out fa-lg" to="/logout"></NavLink>
                                    </li>
                                </React.Fragment>
                            )}
                        </ul>
                    </div>
                </nav>
        );
    }
}

export default NavBar;
