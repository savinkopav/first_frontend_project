import React from 'react';
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/userService";
import {loginWithJwt} from "../services/authService";

class RegistrationForm extends Form {
    state = {
        data: {
            email: "",
            username: "",
            password: ""
        },
        errors:{}
    };

    schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(5).max(16).required().label("Password"),
        username:Joi.string().min(5).required().label("Username")
    };

    doSubmit = async () => {
        try {
            const response = await register(this.state.data);
            loginWithJwt(response.headers["x-auth-token"]);
            window.location = "/";
        }
        catch (e) {
            if (e.response && e.response.status === 400) {
                const errors = {...this.state.errors};
                errors.email = e.response.data;
                this.setState({errors: errors});
            }
        }
    };

    render() {
        return (
            <div className="col-3">
                <h2 className="mb-4">Registration</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email", "email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("username", "Username")}
                    {this.renderButton("Registration")}
                </form>
            </div>
        );
    }
}

export default RegistrationForm;
