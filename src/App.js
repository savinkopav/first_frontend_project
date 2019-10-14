import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Movies from './components/movies';
import NavBar from "./components/nav";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegistrationForm from "./components/registrationForm";
import './App.css'

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <main className="container">
            <NavBar />
            <Switch>
                <Route path="/login" component={LoginForm}/>
                <Route path="/registration" component={RegistrationForm}/>
                <Route path="/not-found" component={NotFound}/>
                <Route path="/movies/:id" component={MovieForm}/>
                <Route path="/movies" component={Movies}/>
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
