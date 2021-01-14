import React from "react";
import Form from "./common/Form";
import joi from "joi-browser";

class AccountSettings extends Form {
  schema = {
    name: joi.string().required().label("Name"),
    email: joi.string().required().label("Email"),
    password: joi.string().required().label("Password"),
  };
  render() {
    const { errors, data } = this.state;
    return (
      <div className="container-fluid">
        <h1>
          Account Settings <span>Preview</span>
        </h1>
        <form onSubmit={this.handleSubmit} id="accountForm">
          <div className="searchBox">
            <h5 className="searchHeading p-2">Edit Data</h5>
            <div className="searchBarDiv p-3">
              <div>
                <label htmlFor="basic-url">Name</label>
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    name="name"
                    value={this.state.data.name}
                    onChange={this.handleChange}
                    placeholder="Name"
                  />
                </div>
              </div>
              {errors.name && <div className="errorDisp">{errors.name}</div>}

              <div>
                <label htmlFor="basic-url">Email</label>
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    name="email"
                    value={this.state.data.email}
                    onChange={this.handleChange}
                    placeholder="Email"
                  />
                </div>
              </div>
              {errors.email && <div className="errorDisp">{errors.email}</div>}

              <div>
                <label htmlFor="basic-url">Password</label>
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    name="password"
                    value={this.state.data.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                </div>
              </div>
              {errors.password && (
                <div className="errorDisp">{errors.password}</div>
              )}
            </div>

            <div className="btnDiv d-flex justify-content-center p-2">
              <button className="btn searchBtn bgclr" form="accountForm">
                Update User
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AccountSettings;
