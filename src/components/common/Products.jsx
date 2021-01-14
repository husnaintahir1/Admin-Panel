import React, { Component } from "react";
import "../../css/Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import { Link } from "react-router-dom";
import http from "../../services/httpService";
import {
  apiEndpointGetItems,
  apiEndpointItemSearch,
  apiEndpointItemSwitch,
  apiEndpointDeleteItem,
} from "../../apiEndpoints";

class Products extends Component {
  state = { catSearch: "", itemTitleSearch: "" };

  async componentDidMount() {
    const { data } = await http.get(apiEndpointGetItems);
    this.setState({ items: data.items }, () => {
      console.log(this.state.items);
    });
  }

  handleChange = async (name, value, id) => {
    let items = [...this.state.items];
    const x = items.find((item) => item.item_title === name);
    const index = items.indexOf(x);
    const item = items[index];

    if (item.is_active === "1") {
      item.is_active = "0";
      value = 0;
    } else {
      item.is_active = "1";
      value = 1;
    }
    this.setState(() => {
      return { items };
    });
    // request to server
    let obj = { is_active: item.is_active };
    const response = await http.post(apiEndpointItemSwitch + "/" + id, obj);
    console.log(response);
  };

  // handle Search data switch
  handleChangeSearchSwitch = async (name, value, id) => {
    let searchData = [...this.state.searchData];
    const x = searchData.find((item) => item.item_title === name);
    const index = searchData.indexOf(x);
    const item = searchData[index];

    if (item.is_active === "1") {
      item.is_active = "0";
      value = 0;
    } else {
      item.is_active = "1";
      value = 1;
    }
    this.setState(() => {
      return { searchData };
    });
    // request to server
    let obj = { is_active: item.is_active };
    const response = await http.post(apiEndpointItemSwitch + "/" + id, obj);
    console.log(response);
  };
  // Search handle
  handleSearch = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Handle Search Button
  handleSearchButton = async () => {
    const { data } = await http.get(
      apiEndpointItemSearch +
        "/" +
        this.state.catSearch +
        "/" +
        this.state.itemTitleSearch
    );

    this.setState(
      {
        searchData: data.searchproducts,
      },
      () => {
        console.log(this.state.searchData);
      }
    );
  };

  handleDelete = async (id) => {
    const OriginalItems = this.state.items;
    const items = this.state.items?.filter((cat) => cat.item_id !== id);

    const searchData = this.state.searchData?.filter(
      (cat) => cat.item_id !== id
    );

    this.setState({ items, searchData });

    try {
      await http.get(apiEndpointDeleteItem + "/" + id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        console.log("something bad happend Category is not Deleted");

      this.setState({ categories: OriginalItems });
    }
  };
  render() {
    const { items, searchData } = this.state;

    return (
      <div className="container-fluid">
        <h1>
          Product <span>Preview</span>
        </h1>

        <div className="searchBox">
          <h5 className="searchHeading p-2">Search</h5>
          <div className="searchBarDiv p-3">
            <div>
              <label htmlFor="basic-url">Item Title</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="basic-addon3"
                  onChange={this.handleSearch}
                  value={this.state.itemTitleSearch}
                  name="itemTitleSearch"
                />
              </div>
            </div>

            <div>
              <label htmlFor="basic-url">Category Name</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
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

        {/* Product Table */}

        <div className="searchBox mt-5">
          <div className="addCatHeading">
            <div className="pt-2 cat">Product List</div>
            <div>
              <Link to="/addnewproduct">
                <button className="btn bgclr addBtn">
                  {" "}
                  <FontAwesomeIcon icon={faPlus} /> Add Products
                </button>
              </Link>
            </div>
          </div>
          <div className="tableDiv">
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">item title</th>
                  <th scope="col">Category Name</th>

                  <th scope="col">Shope name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Old Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Variant Products</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchData
                  ? searchData.map((item) => {
                      return (
                        <tr key={item.item_id}>
                          <th scope="row">{item.item_title}</th>
                          <td>{item.category_name}</td>
                          <td>{item.shop_name}</td>
                          <td>{item.price}</td>
                          <td>{item.old_price}</td>
                          <td>
                            {" "}
                            <Switch
                              onColor="#17958d"
                              checked={item.is_active === "1" ? true : false}
                              onChange={() =>
                                this.handleChangeSearchSwitch(
                                  item.item_title,
                                  item.is_active,
                                  item.item_id
                                )
                              }
                            />
                          </td>

                          <td>
                            <div>
                              <Link to="/addvariantproduct">
                                <button className="btn bgclr clr text-center mr-0 mr-md-3 mb-2 mb-md-0">
                                  {" "}
                                  <FontAwesomeIcon icon={faPlus} />
                                </button>
                              </Link>
                              <button className="btn bgclr clr text-center">
                                {" "}
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div>
                              <button className="btn bgclr clr text-center mr-0 mr-md-3 mb-2 mb-md-0">
                                {" "}
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button className="btn bgclr clr text-center">
                                {" "}
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : // regular Data
                    items?.map((item) => {
                      return (
                        <tr key={item.item_id}>
                          <th scope="row">{item.item_title}</th>
                          <td>{item.category_name}</td>
                          <td>{item.shop_name}</td>
                          <td>{item.price}</td>
                          <td>{item.old_price}</td>
                          <td>
                            {" "}
                            <Switch
                              onColor="#17958d"
                              checked={item.is_active === "1" ? true : false}
                              onChange={() =>
                                this.handleChange(
                                  item.item_title,
                                  item.is_active,
                                  item.item_id
                                )
                              }
                            />
                          </td>

                          <td>
                            <div>
                              <Link to="/addvariantproduct">
                                <button className="btn bgclr clr text-center mr-0 mr-md-3 mb-2 mb-md-0">
                                  {" "}
                                  <FontAwesomeIcon icon={faPlus} />
                                </button>
                              </Link>
                              <button className="btn bgclr clr text-center">
                                {" "}
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div>
                              <Link
                                to={{
                                  pathname: "/updateproduct/" + item.item_id,
                                  state: {
                                    product: item,
                                  },
                                }}
                              >
                                <button className="btn bgclr clr text-center mr-0 mr-md-3 mb-2 mb-md-0">
                                  {" "}
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </Link>
                              <button
                                className="btn bgclr clr text-center"
                                onClick={() => this.handleDelete(item.item_id)}
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

export default Products;
