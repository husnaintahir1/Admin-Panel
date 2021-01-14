import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import VariantItemBox from "./common/VariantItemBox";
import food from "../assets/pexels-photo-1640777.jpeg";
class AddVariantProduct extends Component {
  state = {
    numChildren: 1,
    children: [],
  };

  onAddRow = () => {
    let x = [];
    for (var i = 0; i < this.state.numChildren; i += 1) {
      x.push(<VariantItemBox key={i} id={i} onDeleteRow={this.onDeleteRow} />);
    }
    this.setState(() => {
      return { numChildren: this.state.numChildren + 1, children: x };
    });
  };
  onDeleteRow = (id) => {
    let x = this.state.children.filter((f) => f.props.id !== id);
    this.setState({ children: x, numChildren: this.state.numChildren - 1 });
    console.log(x);
  };

  render() {
    return (
      <div className="container-fluid border">
        <h1>
          Product <span>Preview</span>
        </h1>
        <div className="searchBox">
          <h5 className="searchHeading p-2">Search</h5>
          <div className="searchBarDiv p-3 ">
            <div className="w-100">
              <label htmlFor="basic-url">Item Title</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3"
                />
              </div>
            </div>

            <div className="oldPrice w-100 d-flex">
              <div className="w-90 w-md-50 ">
                <label htmlFor="basic-url">Item Title</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                  />
                </div>
              </div>
              <div className="w-90 w-md-50 ml-0 ml-md-4">
                <label htmlFor="basic-url">Item Title</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                  />
                </div>
              </div>
            </div>
            {this.state.children}
          </div>
          <button
            className=" btn searchBtn bgclr m-3"
            onClick={() => this.onAddRow()}
          >
            {" "}
            <FontAwesomeIcon icon={faPlus} /> Add Category
          </button>{" "}
        </div>
        <button className=" btn searchBtn bgclr m-3"> Add Variant</button>{" "}
        <div className="searchBox  variantImg">
          <h5 className="searchHeading p-2">Item Image</h5>
          <div className="searchBarDiv p-3">
            <img src={food} className="variantItemImg" alt="" />
          </div>

          <div className="btnDiv d-flex justify-content-center p-2">
            <button className="btn searchBtn bgclr">Update</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddVariantProduct;
