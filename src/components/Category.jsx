import React, { Component } from "react";
import "../css/Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Switch from "react-switch";
import http from "../services/httpService";
import { Link } from "react-router-dom";
import {
  apiEndpointGetCategory,
  apiEndpointSearch,
  apiEndpointSwitch,
  apiEndpointDelete,
} from "../apiEndpoints";

class Category extends Component {
  state = {
    catSearch: "",
    categories: [],
    data: {},
    checked: false,
  };

  // life cycle CMD
  componentDidMount() {
    this.setCategories();
  }

  // Get Categories
  setCategories = async () => {
    const { data } = await http.get(apiEndpointGetCategory);
    let tempProducts = [];
    data.categories.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { categories: tempProducts };
    });
  };

  // Switch Handle
  handleChange = async (name, value, id) => {
    let categories1 = [...this.state.categories];
    const x = categories1.find((item) => item.category_name === name);
    const index = categories1.indexOf(x);
    const item = categories1[index];

    if (item.is_active === "1") {
      item.is_active = "0";
      value = 0;
    } else {
      item.is_active = "1";
      value = 1;
    }
    this.setState(() => {
      return { categories: categories1 };
    });

    // request to server
    let obj = { is_active: item.is_active };
    await http.post(apiEndpointSwitch + "/" + id, obj);
  };

  // Search handle
  handleSearch = async (e) => {
    let catSearch = this.state.catSearch;
    catSearch = e.currentTarget.value;
    this.setState({ catSearch });
  };

  // Handle Search Button
  handleSearchButton = async () => {
    const { data } = await http.get(
      apiEndpointSearch + "/" + this.state.catSearch
    );
    this.setState({
      searchData: data.categories,
    });
  };

  // Handle Delete
  handleDelete = async (id) => {
    const OriginalCategories = this.state.categories;
    const categories = this.state.categories?.filter(
      (cat) => cat.category_id !== id
    );

    const searchData = this.state.searchData?.filter(
      (cat) => cat.category_id !== id
    );

    this.setState({ categories, searchData });

    try {
      await http.get(apiEndpointDelete + "/" + id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        console.log("something bad happend Category is not Deleted");

      this.setState({ categories: OriginalCategories });
    }
  };

  // Render Function
  render() {
    const { searchData, categories } = this.state;
    return (
      <div className="container-fluid">
        <h1>
          Category <span>Preview</span>
        </h1>
        <div className="searchBox">
          <h5 className="searchHeading p-2">Search</h5>
          <div className="searchBarDiv p-3">
            <div>
              <label htmlFor="basic-url">Category Name</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  onChange={this.handleSearch}
                  value={this.state.catSearch}
                  name="catSearch"
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

        <div className="searchBox mt-5">
          <div className="addCatHeading">
            <div className="pt-2 cat">Category List</div>
            <div>
              <Link to="/addnewcategory">
                <button className="btn bgclr addBtn">
                  {" "}
                  <FontAwesomeIcon icon={faPlus} /> Add Category
                </button>
              </Link>
            </div>
          </div>

          <div className="tableDiv">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Category Name</th>
                  <th scope="col">Shop</th>
                  <th scope="col">isActive</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {/* Search Data */}
              <tbody>
                {searchData
                  ? searchData.map((item) => {
                      return (
                        <tr key={item.category_id}>
                          <th>{item.category_name}</th>
                          <td>{item.shop_id}</td>
                          <td>
                            <Switch
                              onChange={this.handleChange.bind(
                                this,
                                item.category_name
                              )}
                              onColor="#17958d"
                              checked={item.is_active === "1" ? true : false}
                              name="husnain"
                            />
                          </td>

                          <td>
                            <div>
                              <Link
                                to={{
                                  pathname:
                                    "/addnewcategory/" + item.category_id,
                                  state: {
                                    categories: this.state.categories,
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
                                  this.handleDelete(item.category_id)
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : // regular Data
                    categories.map((item) => {
                      return (
                        <tr key={item.category_id}>
                          <th>{item.category_name}</th>
                          <td>{item.shop_id}</td>
                          <td>
                            <Switch
                              onChange={() =>
                                this.handleChange(
                                  item.category_name,
                                  item.is_active,
                                  item.category_id
                                )
                              }
                              onColor="#17958d"
                              checked={item.is_active === "1" ? true : false}
                            />
                          </td>

                          <td>
                            <div>
                              <Link
                                to={{
                                  pathname:
                                    "/addnewcategory/" + item.category_id,
                                  state: {
                                    categories: this.state.categories,
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
                                  this.handleDelete(item.category_id)
                                }
                              >
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

export default Category;
