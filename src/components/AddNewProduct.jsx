import React, { Component } from "react";
import Select from "react-select";
import Form from "./common/Form";
import joi from "joi-browser";
import {
  apiEndpointCategoryDropDown,
  apiEndpointGetCategory,
} from "../apiEndpoints";
import http from "../services/httpService";
import { apiEndpointAddItems } from "./../apiEndpoints";
class AddNewProduct extends Form {
  async componentDidMount() {
    const { data: shopDrop } = await http.get(apiEndpointCategoryDropDown);
    const { data: catDrop } = await http.get(apiEndpointGetCategory);
    this.setState({
      showDropdown: shopDrop?.shop_dropdown,
      catDropdown: catDrop?.categories,
    });
    this.setState(
      {
        options: this.state.showDropdown?.map((item) => {
          return { label: item.shop_name.toString(), value: item.shop_id };
        }),
        catOptions: this.state.catDropdown?.map((item) => {
          return {
            label: item.category_name.toString(),
            value: item.category_id,
          };
        }),
      },
      () => {
        console.log(this.state.options);
      }
    );
  }

  schema = {
    itemTitle: joi.string().required().label("Item Title"),
    selectShopName: joi.required().label("Shope Name"),
    selectCategoryName: joi.required().label("Category Name"),
    description: joi.string().required().label("Description"),
    price: joi.number().required().label("Price"),
    oldPrice: joi.number().required().label("Old Price"),
    chooseProductImg: joi.required().label("Product Image"),
  };

  doSubmit = () => {
    // server Code

    this.handleAdd();

    console.log("submitted", this.state.data);
  };

  handleAdd = async () => {
    const formData = new FormData();
    formData.append("item_image", this.state.data.chooseProductImg);
    formData.append(
      "category_id",
      this.state.data.selectCategoryName.category_id
    );
    formData.append("shop_id", this.state.data.selectShopName.shop_id);
    formData.append("description", this.state.data.description);
    formData.append("price", this.state.data.price);
    formData.append("old_price", this.state.data.oldPrice);
    formData.append(" item_title", this.state.data.itemTitle);

    const response = await http.post(apiEndpointAddItems, formData);
    if (response.status === 200) {
      this.props.history.push("/products");
    }
    console.log(this.state.data.chooseProductImg);
  };
  render() {
    const { errors, data } = this.state;
    return (
      <div className="container-fluid">
        <h1>
          Category <span>Preview</span>
        </h1>

        <form onSubmit={this.handleSubmit} id="productForm">
          <div className="searchBox">
            <h5 className="searchHeading p-2">Search</h5>
            <div className="searchBarDiv p-3">
              <div>
                <label htmlFor="basic-url">Item title</label>
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon3"
                    placeholder="Insert title"
                    name="itemTitle"
                    value={this.state.data.itemTitle}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.itemTitle && (
                <div className="errorDisp">{errors.itemTitle}</div>
              )}
              <div>
                <label htmlFor="basic-url">Shope name</label>
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
                <label htmlFor="basic-url">Category Name</label>
                <div className=" ">
                  <Select
                    className="searchSelect1"
                    options={this.state.catOptions}
                    name="selectCategoryName"
                    onChange={this.handleChangeSelect.bind(
                      this,
                      "selectCategoryName",
                      "category_id",
                      "category_name"
                    )}
                  />
                </div>
              </div>
              {errors.selectCategoryName && (
                <div className="errorDisp">{errors.selectCategoryName}</div>
              )}

              {/* file input */}
              <div className="">
                <label htmlFor="basic-url">Product image</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    name="chooseProductImg"
                    onChange={this.handleChangeFile}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    {data.chooseProductImg
                      ? data.chooseProductImg.name
                      : "Choose file"}
                  </label>
                </div>
              </div>
              {errors.chooseProductImg && (
                <div className="errorDisp">{errors.chooseProductImg}</div>
              )}

              {/* file input */}
              <div className="">
                <label htmlFor="basic-url">Description</label>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  placeholder="Enter item description"
                  name="description"
                  value={this.state.data.description}
                  onChange={this.handleChange}
                ></textarea>
              </div>
              {errors.description && (
                <div className="errorDisp">{errors.description}</div>
              )}

              <div>
                {/* Price */}
                <label htmlFor="basic-url">Price</label>
                <div className="input-group ">
                  <input
                    type="number"
                    className="form-control"
                    aria-describedby="basic-addon3"
                    placeholder="Enter Price"
                    name="price"
                    value={this.state.data.price}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.price && <div className="errorDisp">{errors.price}</div>}

              {/* Price ends */}

              {/* oldPrice */}
              <div>
                <label htmlFor="basic-url">Old Price</label>
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon3"
                    placeholder="Enter Old Price"
                    name="oldPrice"
                    value={this.state.data.oldPrice}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              {errors.oldPrice && (
                <div className="errorDisp">{errors.oldPrice}</div>
              )}

              {/* oldPrice */}
              <div className="input-group ">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <input
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                    />
                  </div>
                  <p className="pt-3">In Stock</p>
                </div>
              </div>
            </div>

            <div className="btnDiv d-flex justify-content-center p-2">
              <button className="btn addProductBtn bgclr" form="productForm">
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewProduct;
