import React, { Component } from "react";
import "../css/Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import http from "../services/httpService";
import { apiEndpointGroupSearch, apiEndpointGetGroups } from "../apiEndpoints";
import { apiEndpointGroupDelete } from "./../apiEndpoints";
class UserManagementGroups extends Component {
  state = {};
  async componentDidMount() {
    const { data } = await http.get(apiEndpointGetGroups);
    this.setState({ groups: data.groups });
  }

  // Search handle
  handleSearch = async (e) => {
    let groupSearch = this.state.groupSearch;
    groupSearch = e.currentTarget.value;
    this.setState({ groupSearch });
  };

  // Handle Search Button
  handleSearchButton = async () => {
    const { data } = await http.get(
      apiEndpointGroupSearch + "/" + this.state.groupSearch
    );
    this.setState({
      searchData: data.user_group,
    });
    console.log(data);
  };

  // Handle Delete
  handleDelete = async (id) => {
    const OriginalGroups = this.state.groups;
    const groups = this.state.groups?.filter((cat) => cat.user_group_id !== id);

    const searchData = this.state.searchData?.filter(
      (cat) => cat.user_group_id !== id
    );

    this.setState({ groups, searchData });

    try {
      await http.get(apiEndpointGroupDelete + "/" + id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        console.log("something bad happend Category is not Deleted");

      this.setState({ groups: OriginalGroups });
    }
  };

  render() {
    const { searchData, groups } = this.state;
    return (
      <div className="container-fluid">
        <h1>
          Delivery Zone <span>Preview</span>
        </h1>

        <div className="searchBox">
          <h5 className="searchHeading p-2">Search</h5>
          <div className="searchBarDiv p-3">
            <div>
              <label htmlFor="basic-url">User Group</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  onChange={this.handleSearch}
                  value={this.state.groupSearch}
                  name="groupSearch"
                />
              </div>
            </div>
          </div>

          <div className="btnDiv d-flex justify-content-center p-2">
            <button
              className="btn searchBtn bgclr"
              onClick={this.handleSearchButton}
            >
              Search
            </button>
          </div>
        </div>

        {/* Product Table */}

        <div className="searchBox mt-5">
          <div className="addCatHeading">
            <div className="pt-2 cat">Delivery Zone List</div>
            <div>
              <Link to="/addnewgroup/new">
                <button className="btn bgclr addBtn">
                  {" "}
                  <FontAwesomeIcon icon={faPlus} /> Add Groups
                </button>
              </Link>
            </div>
          </div>
          <div className="tableDiv">
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">Group Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchData
                  ? searchData.map((item) => {
                      return (
                        <tr key={item.user_group_id}>
                          <th scope="row">{item.user_group_name}</th>

                          <td>
                            <div>
                              <Link
                                to={{
                                  pathname:
                                    "/addnewgroup/" + item.user_group_id,
                                  state: {
                                    groups: item,
                                  },
                                }}
                              >
                                <button className="btn bgclr clr text-center mr-0 mr-md-3 mb-2 mb-md-0">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </Link>

                              <button
                                className="btn bgclr clr text-center"
                                onClick={() =>
                                  this.handleDelete(item.user_group_id)
                                }
                              >
                                {" "}
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : // regular Data
                    groups?.map((item) => {
                      return (
                        <tr key={item.user_group_id}>
                          <th scope="row">{item.user_group_name}</th>

                          <td>
                            <div>
                              <Link
                                to={{
                                  pathname:
                                    "/addnewgroup/" + item.user_group_id,
                                  state: {
                                    groups: item,
                                  },
                                }}
                              >
                                <button className="btn bgclr clr text-center mr-0 mr-md-3 mb-2 mb-md-0">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </Link>
                              <button
                                className="btn bgclr clr text-center"
                                onClick={() =>
                                  this.handleDelete(item.user_group_id)
                                }
                              >
                                {" "}
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserManagementGroups;
