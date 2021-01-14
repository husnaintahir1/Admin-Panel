import React, { Component } from "react";
import "../css/Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import { useState } from "react";
import { Link } from "react-router-dom";
import http from "../services/httpService";
import { apiEndpointGetCoupon } from "../apiEndpoints";
import {
  apiEndpointCouponSearch,
  apiEndpointCouponDelete,
} from "./../apiEndpoints";

class Coupon extends Component {
  state = { couponSearch: "" };

  async componentDidMount() {
    const { data } = await http.get(apiEndpointGetCoupon);

    this.setState({ coupons: data.coupon_codes }, () => {
      console.log(this.state);
    });
  }

  // Search handle
  handleSearch = async (e) => {
    let couponSearch = this.state.couponSearch;
    couponSearch = e.currentTarget.value;
    this.setState({ couponSearch });
  };

  // Handle Search Button
  handleSearchButton = async () => {
    const { data } = await http.get(
      apiEndpointCouponSearch + "/" + this.state.couponSearch
    );
    this.setState({
      searchData: data.coupon_codes,
    });
  };

  // Handle Delete
  handleDelete = async (id) => {
    const OriginalCoupons = this.state.coupons;
    const coupons = this.state.coupons?.filter((i) => i.coupon_id !== id);

    const searchData = this.state.searchData?.filter((i) => i.coupon_id !== id);

    this.setState({ coupons, searchData });

    try {
      await http.get(apiEndpointCouponDelete + "/" + id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        console.log("something bad happend Category is not Deleted");

      this.setState({ coupons: OriginalCoupons });
    }
  };

  // handleChange = async (name, value, id) => {
  //   let categories1 = [...this.state.categories];
  //   const x = categories1.find((item) => item.category_name === name);
  //   const index = categories1.indexOf(x);
  //   const item = categories1[index];

  //   if (item.is_active === "1") {
  //     item.is_active = "0";
  //     value = 0;
  //   } else {
  //     item.is_active = "1";
  //     value = 1;
  //   }
  //   this.setState(() => {
  //     return { categories: categories1 };
  //   });

  //   // request to server
  //   let obj = { is_active: item.is_active };
  //   await http.post(apiEndpointSwitch + "/" + id, obj);
  // };
  render() {
    const { searchData, coupons } = this.state;

    return (
      <div className="container-fluid">
        <h1>
          Coupon <span>Preview</span>
        </h1>

        <div className="searchBox">
          <h5 className="searchHeading p-2">Search</h5>
          <div className="searchBarDiv p-3">
            <div>
              <label htmlFor="basic-url">Coupon Code</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  onChange={this.handleSearch}
                  value={this.state.couponSearch}
                  name="couponsearch"
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
              <Link to="/addnewcoupon">
                <button className="btn bgclr addBtn">
                  {" "}
                  <FontAwesomeIcon icon={faPlus} /> Add Coupons
                </button>
              </Link>
            </div>
          </div>
          <div className="tableDiv">
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">Coupon Code</th>
                  <th scope="col">Shop Name</th>

                  <th scope="col">Percentage</th>
                  <th scope="col">From Date</th>
                  <th scope="col">To Date</th>
                  <th scope="col">Provided Limit</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchData
                  ? searchData.map((item) => {
                      return (
                        <tr key={item.coupon_id}>
                          <th scope="row">{item.coupon_code}</th>
                          <td>{item.shop_id}</td>
                          <td>{item.discount_in_percentage}</td>
                          <td>{item.from_date}</td>
                          <td>{item.to_date}</td>
                          <td>{item.usage_limit}</td>

                          <td>
                            {" "}
                            <Switch onColor="#17958d" />
                          </td>
                          <td>
                            <div>
                              <button className="btn bgclr clr text-center mr-0 mr-md-3 mb-2 mb-md-0">
                                {" "}
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button
                                className="btn bgclr clr text-center"
                                onClick={() =>
                                  this.handleDelete(item.coupon_id)
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
                    coupons?.map((item) => {
                      return (
                        <tr key={item.coupon_id}>
                          <th scope="row">{item.coupon_code}</th>
                          <td>{item.shop_id}</td>
                          <td>{item.discount_in_percentage}</td>
                          <td>{item.from_date}</td>
                          <td>{item.to_date}</td>
                          <td>{item.usage_limit}</td>

                          <td>
                            {" "}
                            <Switch
                              onColor="#17958d"
                              // onChange={this.handleChange.bind(
                              //   this,
                              //   item.category_name
                              // )}
                            />
                          </td>
                          <td>
                            <div>
                              <Link
                                to={{
                                  pathname: "/addnewcoupon/" + item.coupon_id,
                                  state: {
                                    coupons: this.state.coupons,
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
                                  this.handleDelete(item.coupon_id)
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

export default Coupon;
