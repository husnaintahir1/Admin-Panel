import joi from "joi-browser";
import React from "react";
import Select from "react-select";
import {
  apiEndpointAddDeliveryZone,
  apiEndpointCategoryDropDown,
} from "../../apiEndpoints";
import http from "../../services/httpService";
import Form from "./Form";
import { apiEndpointUpdateDeliveryZone } from "./../../apiEndpoints";

class AddNewDeliveryZone extends Form {
  async componentDidMount() {
    const { data: shopDrop } = await http.get(apiEndpointCategoryDropDown);

    this.setState({
      showDropdown: shopDrop?.shop_dropdown,
    });
    this.setState(
      {
        options: this.state.showDropdown?.map((item) => {
          return { label: item.shop_name.toString(), value: item.shop_id };
        }),
      },
      () => {
        console.log(this.state.options);
      }
    );

    const deliveryZoneId = this.props.match.params.id;
    if (deliveryZoneId === "new") return;

    const { deliveryZones } = this.props.location.state;

    this.setState({ deliveryZones }, () =>
      console.log(this.state.deliveryZones)
    );

    const editDeliveryZone = this.state.deliveryZones.find(
      (edz) => edz.delivery_zone_id === parseInt(deliveryZoneId)
    );

    const obj = {
      areaName: editDeliveryZone.area_name,
      minimumOrder: editDeliveryZone.minimum_order,
      deliveryCharges: editDeliveryZone.delivery_charges,
    };
    this.setState({ data: obj });
  }

  schema = {
    selectShopName: joi.required().label("Shope Name"),
    areaName: joi.string().required().label("Area Name"),

    minimumOrder: joi.number().required().label("Minimu Order"),
    deliveryCharges: joi.number().required().label("Delivery Charges"),
  };

  doSubmit = () => {
    // server Code

    this.handleAdd();

    console.log("submitted", this.state.data);
  };

  handleAdd = async () => {
    const delivery_zone = {
      shop_id: this.state.data.selectShopName.shop_id,
      area_name: this.state.data.areaName,
      minimum_order: this.state.data.minimumOrder,
      delivery_charges: this.state.data.deliveryCharges,
    };
    console.log(delivery_zone);

    try {
      const catId = this.props.match.params.id;
      const response = await http.post(
        catId === "new"
          ? apiEndpointAddDeliveryZone
          : apiEndpointUpdateDeliveryZone + "/" + catId,
        delivery_zone
      );
      if (response.status === 200) {
        this.props.history.push("/deliveryzone");
      }
    } catch (error) {
      console.log(
        "The delivery zone is already added or there is somthing that you shouldnt know !"
      );
    }
  };

  render() {
    const { errors, data } = this.state;
    return (
      <div className="container-fluid">
        <h1>
          Category <span>Preview</span>
        </h1>
        <form id="deliveryZone" onSubmit={this.handleSubmit}>
          <div className="searchBox">
            <h5 className="searchHeading p-2">Search</h5>
            <div className="searchBarDiv p-3">
              <div>
                <label className="mt-3" htmlFor="basic-url">
                  Shope name
                </label>
                <div className=" ">
                  <Select
                    className="searchSelect"
                    options={this.state.options}
                    name="selectShopName"
                    onChange={this.handleChangeSelect.bind(
                      this,
                      "selectShopName",
                      "shop_id",
                      "shop_name"
                    )}
                  />
                </div>
              </div>
              {errors.selectShopName && (
                <div className="errorDisp">{errors.selectShopName}</div>
              )}

              <div>
                <label className="mt-3" htmlFor="basic-url">
                  Area Name
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon3"
                    placeholder="Enter Price"
                    name="areaName"
                    value={this.state.data.areaName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.areaName && (
                <div className="errorDisp">{errors.areaName}</div>
              )}

              <div>
                <label className="mt-3" htmlFor="basic-url">
                  Minimun Order
                </label>
                <div className="input-group ">
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="basic-addon3"
                    placeholder="Enter Old Price"
                    name="minimumOrder"
                    value={this.state.data.minimumOrder}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.minimumOrder && (
                <div className="errorDisp">{errors.minimumOrder}</div>
              )}
              <div>
                <label className="mt-3" htmlFor="basic-url ">
                  Delivery Charges
                </label>
                <div className="input-group ">
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="basic-addon3"
                    placeholder="Enter Old Price"
                    name="deliveryCharges"
                    value={this.state.data.deliveryCharges}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.deliveryCharges && (
                <div className="errorDisp">{errors.deliveryCharges}</div>
              )}
            </div>

            <div className="btnDiv d-flex justify-content-center p-2">
              <button className="btn addProductBtn bgclr" form="deliveryZone">
                Add Delivery Zone
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewDeliveryZone;
