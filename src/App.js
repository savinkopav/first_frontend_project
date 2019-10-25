import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./services/authService";
import Movies from './components/movies';
import NavBar from "./components/nav";
import Profile from "./components/profile";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegistrationForm from "./components/registrationForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

class App extends Component {
    state = {};

    componentDidMount() {
        const user = getCurrentUser();
        this.setState({user});
    }

    render() {

        const { user } = this.state;
        return (
            <React.Fragment>
                <ToastContainer/>
                <main className="container">
                <NavBar user={user}/>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/registration" component={RegistrationForm}/>
                    <Route path="/not-found" component={NotFound}/>
                    <ProtectedRoute
                        path="/movies/:id"
                        component={MovieForm}
                    />
                    <Route
                        path="/movies"
                        render={props => <Movies {...props} user={user}/>}
                    />
                    <Route path="/customers" component={Customers}/>
                    <Route path="/rentals" component={Rentals}/>
                    <Redirect from="/" exact to="movies"/>
                    <Redirect to="/not-found"/>
                </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
