import React, { Component } from "react";
import "../css/Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import http from "../services/httpService";
import { apiEndpointDeliveryZoneDelete, baseUrl } from "../apiEndpoints";
import {
  apiEndpointGetDeliveryZone,
  apiEndpointDeliveryZoneSearch,
} from "./../apiEndpoints";

class DeliveryZone extends Component {
  state = {};
  async componentDidMount() {
    const { data } = await http.get(apiEndpointGetDeliveryZone);
    this.setState({ deliveryZones: data.delivery_zones }, () => {
      console.log(this.state.deliveryZones);
    });
  }

  // Search handle
  handleSearch = async (e) => {
    let deliveryZoneSearch = this.state.deliveryZoneSearch;
    deliveryZoneSearch = e.currentTarget.value;
    this.setState({ deliveryZoneSearch });
  };

  // Handle Search Button
  handleSearchButton = async () => {
    const { data } = await http.get(
      apiEndpointDeliveryZoneSearch + "/" + this.state.deliveryZoneSearch
    );
    this.setState({
      searchData: data.delivery_zone,
    });
  };

  handleDelete = async (id) => {
    const OriginalDeliveryZones = this.state.deliveryZones;
    const deliveryZones = this.state.deliveryZones?.filter(
      (i) => i.delivery_zone_id !== id
    );

    const searchData = this.state.searchData?.filter(
      (i) => i.delivery_zone_id !== id
    );

    this.setState({ deliveryZones, searchData });

    try {
      await http.get(apiEndpointDeliveryZoneDelete + "/" + id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        console.log("something bad happend Category is not Deleted");

      this.setState({ deliveryZones: OriginalDeliveryZones });
    }
  };
  render() {
    const { searchData, deliveryZones } = this.state;
    console.log(deliveryZones);
    return (
      <div className="container-fluid">
        <h1>
          Delivery Zone <span>Preview</span>
        </h1>

        <div className="searchBox">
          <h5 className="searchHeading p-2">Search</h5>
          <div className="searchBarDiv p-3">
            <div>
              <label htmlFor="basic-url">Area Name</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  onChange={this.handleSearch}
                  value={this.state.deliveryZoneSearch}
                  name="deliveryZoneSearch"
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
              <Link to="/addnewdeliveryzone/new">
                <button className="btn bgclr addBtn">
                  {" "}
                  <FontAwesomeIcon icon={faPlus} /> Add Delivery Zone
                </button>
              </Link>
            </div>
          </div>
          <div className="tableDiv">
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">Area Name</th>
                  <th scope="col">Shop Name</th>

                  <th scope="col">Minimum Order</th>
                  <th scope="col">Delivery Charges</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchData
                  ? searchData.map((item) => {
                      return (
                        <tr key={item.delivery_zone_id}>
                          <th>{item.area_name}</th>
                          <td>{item.shop_id}</td>
                          <td>{item.minimum_order}</td>
                          <td>{item.delivery_charges}</td>

                          <td>
                            <div>
                              <Link
                                to={{
                                  pathname:
                                    "/addnewdeliveryzone/" +
                                    item.delivery_zone_id,
                                  state: {
                                    deliveryZones: this.state.deliveryZones,
                                  },
                                }}
                              >
                                <button className="btn bgclr clr text-center mr-0 mr-md-3 mb-2 mb-md-0">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </Link>

                              <button
                                className="btn bgclr clr text-center"
                                onClick={() => {
                                  this.handleDelete(item.delivery_zone_id);
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : // regular Data
                    deliveryZones?.map((item) => {
                      return (
                        <tr key={item.delivery_zone_id}>
                          <th>{item.area_name}</th>
                          <td>{item.shop_id}</td>
                          <td>{item.minimum_order}</td>
                          <td>{item.delivery_charges}</td>

                          <td>
                            <div>
                              <Link
                                to={{
                                  pathname:
                                    "/addnewdeliveryzone/" +
                                    item.delivery_zone_id,
                                  state: {
                                    deliveryZones: this.state.deliveryZones,
                                  },
                                }}
                              >
                                <button className="btn bgclr clr text-center mr-0 mr-md-3 mb-2 mb-md-0">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </Link>

                              <button
                                className="btn bgclr clr text-center"
                                onClick={() => {
                                  this.handleDelete(item.delivery_zone_id);
                                }}
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

export default DeliveryZone;
