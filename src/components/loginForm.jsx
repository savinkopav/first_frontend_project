import React from 'react';
import Joi from "joi-browser";
import Form from "./common/form";
import { Redirect } from "react-router-dom";
import { getCurrentUser, login } from "../services/authService";

class LoginForm extends Form {
    state = {
        data: {
          email: "",
          password: ""
        },
        errors:{}
    };

    schema = {
        email:Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    };

    doSubmit = async () => {
        try{
            await login(this.state.data);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : "/";
        }
        catch (e) {
           if (e.response && e.response.status === 400) {
               const errors = { ...this.state.errors };
               errors.email = e.response.data;
               this.setState({ errors: errors });
           }
        }
    };

    render() {
        if (getCurrentUser()) return <Redirect to="/" />;
        return (
            <div className="col-3">
                <h2 className="mb-4">Login</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
