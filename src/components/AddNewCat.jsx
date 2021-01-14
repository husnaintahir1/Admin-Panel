import React from "react";
import joi from "joi-browser";
import "../css/addNewCat.css";
import Select from "react-select";
import Form from "./common/Form";

import http from "../services/httpService";
import {
  apiEndpointCategoryDropDown,
  apiEndpointUpdateCategory,
  apiEndpointAddCategory,
} from "./../apiEndpoints";

class AddNewCat extends Form {
  async componentDidMount() {
    const { data } = await http.get(apiEndpointCategoryDropDown);
    this.setState({ showDropdown: data.shop_dropdown });
    this.setState({
      options: this.state.showDropdown?.map((item) => {
        return { label: item.shop_name.toString(), value: item.shop_id };
      }),
    });

    console.log(this.props, "props");

    const catId = this.props.match.params.id;
    if (catId === "new") return;

    const { categories } = this.props.location.state;

    this.setState({ categories }, () => console.log(this.state.categories));

    const editCategory = this.state.categories.find(
      (cat) => cat.category_id === parseInt(catId)
    );

    const obj = { category: editCategory.category_name };
    // if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: obj });
    console.log(this.props.match.params.id);
    console.log(this.state.data);
  }

  schema = {
    category: joi.string().required().label("Category"),
    categories: joi.object().required().label("shope name"),
  };

  doSubmit = () => {
    // server Code
    this.handleAdd();
    console.log("submitted");
  };

  header = {
    "Content-Type": "application/json",
  };
  handleAdd = async () => {
    const categories = {
      shop_id: this.state.data.categories.shop_id,
      category_name: this.state.data.category,
    };
    const catId = this.props.match.params.id;
    const response = await http.post(
      catId === "new"
        ? apiEndpointAddCategory
        : apiEndpointUpdateCategory + "/" + catId,
      categories
    );

    if (response.status === 200) {
      this.props.history.push("/category");
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container-fluid">
        <h1>
          Category <span>Preview</span>
        </h1>

        <div className="searchBox">
          <form onSubmit={this.handleSubmit} id="catForm">
            <h5 className="searchHeading p-2">Search</h5>
            <div className="searchBarDiv p-3">
              <div>
                <label htmlFor="basic-url">Category Name</label>
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control "
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    name="category"
                    value={this.state.data?.category}
                    onChange={this.handleChange}
                    placeholder="Enter category name"
                  />
                </div>
                {errors.category && (
                  <div className="errorDisp">{errors.category}</div>
                )}
                <label className="mt-3">Shope Name :</label>
                <div>
                  <Select
                    options={this.state.options}
                    name="categories"
                    onChange={this.handleChangeSelect.bind(
                      this,
                      "categories",
                      "shop_id",
                      "shop_name"
                    )}
                  />
                </div>
                {errors.categories && (
                  <div className="errorDisp">{errors.categories}</div>
                )}
              </div>
            </div>

            <div className="btnDiv d-flex justify-content-center p-2">
              <button className="btn searchBtn bgclr " form="catForm">
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddNewCat;
