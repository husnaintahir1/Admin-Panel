import React from "react";
import Select from "react-select";
import Form from "./Form";
import joi from "joi-browser";
import {
  apiEndpointCategoryDropDown,
  apiEndpointUpdateCoupon,
  apiEndpointAddCoupon,
} from "./../../apiEndpoints";
import http from "../../services/httpService";
class AddNewCoupon extends Form {
  async componentDidMount() {
    const { data } = await http.get(apiEndpointCategoryDropDown);
    this.setState({ showDropdown: data.shop_dropdown });
    this.setState({
      options: this.state.showDropdown?.map((item) => {
        return { label: item.shop_name.toString(), value: item.shop_id };
      }),
    });

    // prefilled Form Edit
    const couponId = this.props.match.params.id;
    if (couponId === "new") return;

    const { coupons } = this.props.location.state;
    console.log(couponId);
    this.setState({ coupons }, () => console.log(this.state.coupons));

    const editCoupon = this.state.coupons?.find(
      (ec) => ec.coupon_id === couponId
    );
    console.log(editCoupon);

    const obj = {
      couponCode: editCoupon.coupon_code,
      discount: editCoupon.discount_in_percentage,
      fromDate: editCoupon.from_date,
      toDate: editCoupon.to_date,
      usageLimit: editCoupon.usage_limit,
    };
    this.setState({ data: obj });
  }

  schema = {
    couponCode: joi.string().required().label("Coupon Code"),
    selectShopName: joi.required().label("Shope Name"),
    discount: joi.string().required().label("Discount"),
    fromDate: joi.date().required().label("From Date"),
    toDate: joi.date().required().label("To Date"),
    usageLimit: joi.number().required().label("Usage Limit"),
  };
  doSubmit = () => {
    // server Code
    this.handleAdd();
    console.log("submitted");
  };

  handleAdd = async () => {
    const newCoupon = {
      shop_id: this.state.data.selectShopName.shop_id,
      coupon_code: this.state.data.couponCode,
      discount_in_percentage: this.state.data.discount,
      from_date: this.state.data.fromDate,
      to_date: this.state.data.toDate,
      usage_limit: this.state.data.usageLimit,
    };
    console.log(newCoupon);
    const couponId = this.props.match.params.id;
    const response = await http.post(
      couponId === "new"
        ? apiEndpointAddCoupon
        : apiEndpointUpdateCoupon + "/" + couponId,
      newCoupon
    );

    if (response.status === 200) {
      this.props.history.push("/coupon");
    }
    console.log(response);
  };

  render() {
    const { errors, data } = this.state;
    return (
      <div className="container-fluid">
        <h1>
          Add New Coupon <span>Preview</span>
        </h1>
        <form id="couponForm" onSubmit={this.handleSubmit}>
          <div className="searchBox">
            <h5 className="searchHeading p-2">Add Data</h5>
            <div className="searchBarDiv p-3">
              <div>
                <label htmlFor="basic-url">Coupon Code</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Insert title"
                    name="couponCode"
                    value={this.state.data.couponCode}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.couponCode && (
                <div className="errorDisp">{errors.couponCode}</div>
              )}
              <div>
                <label htmlFor="basic-url">Shope name</label>
                <div className="">
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

              <div className="" style={{ zIndex: 1 }}>
                <label htmlFor="basic-url">Discount %</label>

                <input
                  type="number"
                  className="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  placeholder="Enter Old Price"
                  name="discount"
                  value={this.state.data.discount}
                  onChange={this.handleChange}
                />
              </div>
              {errors.discount && (
                <div className="errorDisp">{errors.discount}</div>
              )}

              <div>
                <label htmlFor="basic-url">From Date</label>
                <div className="input-group ">
                  <input
                    type="date"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Enter Price"
                    name="fromDate"
                    value={this.state.data.fromDate}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.fromDate && (
                <div className="errorDisp">{errors.fromDate}</div>
              )}

              <div>
                <label htmlFor="basic-url">To Date</label>
                <div className="input-group ">
                  <input
                    type="date"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Enter Old Price"
                    name="toDate"
                    value={this.state.data.toDate}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.toDate && (
                <div className="errorDisp">{errors.toDate}</div>
              )}
              <div>
                <label htmlFor="basic-url">Usage Limit Overall</label>
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Enter Old Price"
                    name="usageLimit"
                    value={this.state.data.usageLimit}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.usageLimit && (
                <div className="errorDisp">{errors.usageLimit}</div>
              )}

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <input
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                    />
                  </div>
                  <p className="pt-3">Active</p>
                </div>
              </div>
            </div>

            <div className="btnDiv d-flex justify-content-center p-2">
              <button className="btn addProductBtn bgclr" form="couponForm">
                Add Coupon
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewCoupon;
