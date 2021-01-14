import React, { Component } from "react";
import Select from "react-select";
import Form from "./Form";
import joi from "joi-browser";
import {
  apiEndpointCategoryDropDown,
  apiEndpointGetCategory,
  apiEndpointGetItemImage,
  apiEndpointUpdateItems,
  baseUrl,
} from "../../apiEndpoints";
import http from "../../services/httpService";

import ImageUpdateModal from "./ImageUpdateModal";
import { apiEndpointGetItems } from "./../../apiEndpoints";
class UpdateProduct extends Form {
  toggleUpdateImageModal = () => {
    this.setState({ updateImageModal: !this.state.updateImageModal });
    console.log(this.state.data);
  };
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
        console.log(this.state.data);
      }
    );
    const { product } = this.props.location.state;
    this.setState({ product }, () => {
      this.setState({ shop_name: product.shop_name, shop_id: product.shop_id });
    });
    console.log(product);

    const obj = {
      itemTitle: product.item_title,
      description: product.item_description,
      price: product.price,
      oldPrice: product.old_price,
    };
    this.setState({ data: obj });

    const { config: itemImage } = await http.get(
      apiEndpointGetItemImage +
        product.item_image_path +
        product.item_image_name
    );

    this.setState({ itemImage });
  }

  schema = {
    itemTitle: joi.string().required().label("Item Title"),
    selectShopName: joi.required().label("Shope Name"),
    selectCategoryName: joi.required().label("Category Name"),
    description: joi.string().required().label("Description"),
    price: joi.number().required().label("Price"),
    oldPrice: joi.number().required().label("Old Price"),
    chooseProductImg: joi.label("Product Image"),
  };

  doSubmit = () => {
    // server Code

    this.handleAdd();

    console.log("submitted");
  };

  handleAdd = async () => {
    const formData = new FormData();

    formData.append(
      "category_id",
      this.state.data.selectCategoryName.category_id
    );
    formData.append("shop_id", this.state.data.selectShopName.shop_id);
    formData.append("description", this.state.data.description);
    formData.append("price", this.state.data.price);
    formData.append("old_price", this.state.data.oldPrice);
    formData.append(" item_title", this.state.data.itemTitle);

    const response = await http.post(
      apiEndpointUpdateItems + this.props.match.params.id,
      formData
    );
    console.log(this.state.data.chooseProductImg, response);
  };
  render() {
    const { errors, data, product } = this.state;
    console.log(this.state.shop_name);
    return (
      <div className="container-fluid">
        <h1>
          Category <span>Preview</span>
        </h1>

        <div>
          <div className="row">
            <div className="col-8">
              {" "}
              <form onSubmit={this.handleSubmit} id="productForm">
                <div className="searchBox">
                  <h5 className="searchHeading p-2">Search</h5>
                  <div className="searchBarDiv p-3">
                    <div className="w-75">
                      <label htmlFor="basic-url">Item title</label>
                      <div className="input-group ">
                        <input
                          type="text"
                          className="form-control "
                          aria-describedby="basic-addon3"
                          placeholder="Insert title"
                          name="itemTitle"
                          value={this.state.data.itemTitle}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    {errors.itemTitle && (
                      <div className="errorDisp w-75 w-75">
                        {errors.itemTitle}
                      </div>
                    )}
                    <div className="w-75">
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
                      <div className="errorDisp w-75">
                        {errors.selectShopName}
                      </div>
                    )}
                    <div className="w-75">
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
                      <div className="errorDisp w-75">
                        {errors.selectCategoryName}
                      </div>
                    )}

                    <div className="w-75">
                      <label htmlFor="basic-url">Description</label>

                      <textarea
                        className="form-control "
                        aria-label="With textarea"
                        placeholder="Enter item description"
                        name="description"
                        value={this.state.data.description}
                        onChange={this.handleChange}
                      ></textarea>
                    </div>
                    {errors.description && (
                      <div className="errorDisp w-75">{errors.description}</div>
                    )}

                    <div className="w-75">
                      {/* Price */}
                      <label htmlFor="basic-url">Price</label>
                      <div className="input-group ">
                        <input
                          type="number"
                          className="form-control "
                          aria-describedby="basic-addon3"
                          placeholder="Enter Price"
                          name="price"
                          value={this.state.data.price}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    {errors.price && (
                      <div className="errorDisp w-75">{errors.price}</div>
                    )}

                    {/* Price ends */}

                    {/* oldPrice */}
                    <div className="w-75">
                      <label htmlFor="basic-url">Old Price</label>
                      <div className="input-group ">
                        <input
                          type="text"
                          className="form-control "
                          aria-describedby="basic-addon3"
                          placeholder="Enter Old Price"
                          name="oldPrice"
                          value={this.state.data.oldPrice}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    {errors.oldPrice && (
                      <div className="errorDisp w-75">{errors.oldPrice}</div>
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
                    <button
                      className="btn addProductBtn bgclr"
                      form="productForm"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Udapte image */}
            <div className="col-4">
              {/* Update Image model */}
              <ImageUpdateModal
                modal={this.state.updateImageModal}
                handleToggle={this.toggleUpdateImageModal}
                name="updateImageModal"
                onChangeFile={this.handleChangeFile}
                handleSubmit={this.handleSubmit}
                fileName={
                  data.updateImageModal
                    ? data.updateImageModal.name
                    : "Choose file header"
                }
                itemId={this.props.match.params.id}
                image={data.updateImageModal}
              />
              {/* update image model */}
              <div className="searchBox mt-4 mt-md-0">
                <h5 className="searchHeading p-2">Site Header</h5>
                <div className="searchBarDiv p-3 systemSetting">
                  <img
                    src={
                      data.updateImageModal
                        ? URL.createObjectURL(data.updateImageModal)
                        : this.state.itemImage?.url
                    }
                    className="variantItemImg"
                    alt=""
                  />
                </div>

                <div className="btnDiv d-flex justify-content-center p-2">
                  <button
                    className="btn searchBtn bgclr"
                    onClick={this.toggleUpdateImageModal}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateProduct;
