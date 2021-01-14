import React from "react";
import Form from "./Form";
import joi from "joi-browser";

import {
  apiEndpointUpdateGroup,
  apiEndpointAddGroup,
} from "./../../apiEndpoints";
import http from "../../services/httpService";
class AddNewGroup extends Form {
  schema = {
    groupName: joi.string().required().label("Group Name"),
  };
  componentDidMount() {
    // prefilled Form Edit
    const groupId = this.props.match.params.id;
    if (groupId === "new") return;

    const { groups } = this.props.location.state;

    this.setState({ groups }, () => console.log(this.state.groups));

    const obj = {
      groupName: groups.user_group_name,
    };
    this.setState({ data: obj });
  }

  doSubmit = () => {
    // server Code
    this.handleAdd();
  };
  handleAdd = async () => {
    const newGroup = {
      user_group_name: this.state.data.groupName,
    };
    const groupId = this.props.match.params.id;
    const response = await http.post(
      groupId === "new"
        ? apiEndpointAddGroup
        : apiEndpointUpdateGroup + "/" + groupId,
      newGroup
    );

    if (response.status === 200) {
      this.props.history.push("/groups");
    }
  };

  render() {
    const { errors, data } = this.state;
    return (
      <div className="container-fluid">
        <h1>
          Add New Group <span>Preview</span>
        </h1>

        <form id="groupForm" onSubmit={this.handleSubmit}>
          <div className="searchBox">
            <h5 className="searchHeading p-2">Edit data</h5>
            <div className="searchBarDiv p-3">
              <div>
                <label htmlFor="basic-url">Group Name</label>
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    name="groupName"
                    value={this.state.data.groupName}
                    onChange={this.handleChange}
                    placeholder="Enter Group Name"
                  />
                </div>
              </div>
              {errors.groupName && (
                <div className="errorDisp">{errors.groupName}</div>
              )}
            </div>

            <div className="btnDiv d-flex justify-content-center p-2">
              <button className="btn searchBtn bgclr" form="groupForm">
                Add Group
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewGroup;
