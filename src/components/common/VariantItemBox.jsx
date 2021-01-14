import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import VariantItem from "./VariantItem";
class VariantItemBox extends Component {
  state = {
    numChildren: 1,
    children: [],
  };

  onAddChild = () => {
    let x = [];
    for (var i = 0; i < this.state.numChildren; i += 1) {
      x.push(<VariantItem key={i} id={i} onDelete={this.onDelete} />);
    }
    this.setState(() => {
      return { numChildren: this.state.numChildren + 1, children: x };
    });
  };
  onDelete = (id) => {
    let x = this.state.children.filter((f) => f.props.id !== id);
    this.setState({ children: x, numChildren: this.state.numChildren - 1 });
    console.log(x);
  };

  render() {
    const { id, onDeleteRow } = this.props;
    return (
      <React.Fragment>
        <div className="m-5 w-100 border border-secondary p-3 rounded">
          <div className="input-group mb-3 w-100">
            <span className="btn border mr-3 bg-light" type="button">
              1
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-danger closeBtn"
                type="button"
                onClick={() => {
                  this.props.onDeleteRow(id);
                }}
              >
                <FontAwesomeIcon icon={faWindowClose} />
              </button>
            </div>
          </div>
          {this.state.children}
          <button
            className=" btn searchBtn bgclr "
            onClick={() => this.onAddChild()}
          >
            {" "}
            <FontAwesomeIcon icon={faPlus} /> Add Product
          </button>{" "}
        </div>
      </React.Fragment>
    );
  }
}

export default VariantItemBox;
