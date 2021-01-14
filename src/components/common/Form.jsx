import React, { Component } from "react";
import joi from "joi-browser";
class Form extends Component {
  state = {
    data: {},
    errors: {},
    shop_name: "",
    shop_id: 0,
  };

  validate = () => {
    const result = joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!result.error) return null;
    const errors = {};
    for (let items of result.error.details) {
      errors[items.path[0]] = items.message;
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("error");

    this.setState({ errors: errors || {} }, () => {
      console.log(this.state.errors);
    });
    if (errors) return;
    console.log("submitted");
    this.doSubmit();
  };

  handleChange = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data });
  };
  handleChangeSelect = (name, keyId, keyName, value) => {
    const data = { ...this.state.data };
    let x = { [keyId]: value.value, [keyName]: value.label };
    data[name] = x;

    this.setState({ data }, () => {
      console.log(data);
    });
  };

  handleChangeFile = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.files[0];

    this.setState({ data }, () => console.log(this.state.data));
  };
}

export default Form;
