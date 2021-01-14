import React from "react";
import "../css/Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

function UserPermission() {
  return (
    <div>
      <h1 className="m-0">
        Add New User <span>Preview</span>
      </h1>
      <div className="searchBox mt-3">
        <div className="addCatHeading">
          <div className="pt-2 cat">User Permission List</div>
          <div></div>
        </div>
        <div className="tableDiv">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">Group</th>
                <th scope="col">No. Of Users</th>

                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Pizza</th>
                <td>Cartel</td>

                <td>
                  <div>
                    <button className="btn bgclr clr text-center mr-1">
                      {" "}
                      <FontAwesomeIcon icon={faLock} />
                    </button>
                    <button className="btn bgclr clr text-center">
                      {" "}
                      <FontAwesomeIcon icon={faUsers} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">Burger</th>
                <td>Cartel</td>

                <td>
                  {" "}
                  <div>
                    <button className="btn bgclr clr text-center mr-1">
                      {" "}
                      <FontAwesomeIcon icon={faLock} />
                    </button>
                    <button className="btn bgclr clr text-center">
                      {" "}
                      <FontAwesomeIcon icon={faUsers} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">chinese</th>
                <td>Cartel</td>

                <td>
                  {" "}
                  <div>
                    <button className="btn bgclr clr text-center mr-1">
                      {" "}
                      <FontAwesomeIcon icon={faLock} />
                    </button>
                    <button className="btn bgclr clr text-center">
                      {" "}
                      <FontAwesomeIcon icon={faUsers} />
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

export default UserPermission;
