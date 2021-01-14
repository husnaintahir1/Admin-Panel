import React from "react";
import Form from "./common/Form";
import joi from "joi-browser";

class GeneralSettings extends Form {
  schema = {
    gst: joi.string().required().label("Gst%"),
  };
  render() {
    const { errors, data } = this.state;
    return (
      <div className="container-fluid">
        <h1>
          Genral Settings <span>Preview</span>
        </h1>
        <form id="gstForm" onSubmit={this.handleSubmit}>
          <div className="searchBox">
            <h5 className="searchHeading p-2">Edit Data</h5>
            <div className="searchBarDiv p-3">
              <div>
                <label htmlFor="basic-url">Gst %</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    name="gst"
                    value={this.state.data.gst}
                    onChange={this.handleChange}
                    placeholder="Enter Gst Please"
                  />
                </div>
              </div>
              {errors.gst && <div className="errorDisp">{errors.gst}</div>}
            </div>

            <div className="btnDiv d-flex justify-content-center p-2">
              <button className="btn searchBtn bgclr" form="gstForm">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default GeneralSettings;
