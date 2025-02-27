import React, {Component} from 'react';
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const { data } = this.state;
        const options = {abortEarly: false};
        const result = Joi.validate(data, this.schema, options);
        if (!result.error) return null;
        const errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;
        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data:data, errors: errors});
    };

    renderButton(label) {
        return(
        <button
            disabled={this.validate()}
            className="btn btn-primary">
            {label}
        </button>
        );
    };

    renderSelect = (name, label, options) => {
        const { data, errors } = this.state;
        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    };

    renderInput(name, label, type) {
        const { data, errors } = this.state;
        return(
        <Input
            name={name}
            value={data[name]}
            label={label}
            type={type}
            onChange={this.handleChange}
            error={errors[name] || null}
        />
       );
    };
}

export default Form;
