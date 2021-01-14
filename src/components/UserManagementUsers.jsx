import React from "react";
import "../css/Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import { useState } from "react";
function UserManagementUsers() {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };
  return (
    <div className="container-fluid">
      <h1>
        Users <span>Preview</span>
      </h1>

      <div className="searchBox">
        <h5 className="searchHeading p-2">Search</h5>
        <div className="searchBarDiv p-3">
          <div>
            <label htmlFor="basic-url">User Name</label>
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

        <div className="btnDiv d-flex justify-content-center p-2">
          <button className="btn searchBtn bgclr">Search</button>
        </div>
      </div>

      {/* Product Table */}

      <div className="searchBox mt-5">
        <div className="addCatHeading">
          <div className="pt-2 cat">User List</div>
          <div>
            <button className="btn bgclr addBtn">
              {" "}
              <FontAwesomeIcon icon={faPlus} /> Add Category
            </button>
          </div>
        </div>
        <div className="tableDiv">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>

                <th scope="col">User Group</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Pizza</th>
                <td>Pizza</td>
                <td>Cartel Restaurant</td>
                <td>
                  {" "}
                  <Switch
                    onChange={handleChange}
                    onColor="#17958d"
                    checked={checked}
                  />
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
              <tr>
                <th scope="row">Pizza</th>
                <td>Pizza</td>
                <td>Cartel Restaurant</td>
                <td>
                  {" "}
                  <Switch
                    onChange={handleChange}
                    onColor="#17958d"
                    checked={checked}
                  />
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
              <tr>
                <th scope="row">Pizza</th>
                <td>Pizza</td>
                <td>Cartel Restaurant</td>
                <td>
                  {" "}
                  <Switch
                    onChange={handleChange}
                    onColor="#17958d"
                    checked={checked}
                  />
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagementUsers;
