import React from "react";
import Select from "react-select";

function AddUser() {
  const aquaticCreatures = [
    { label: "Shark", value: "Shark" },
    { label: "Dolphin", value: "Dolphin" },
    { label: "Whale", value: "Whale" },
    { label: "Octopus", value: "Octopus" },
    { label: "Crab", value: "Crab" },
    { label: "Lobster", value: "Lobster" },
  ];
  return (
    <div className="container-fluid">
      <h1>
        Add New User <span>Preview</span>
      </h1>

      <div className="searchBox">
        <h5 className="searchHeading p-2">Add Data</h5>
        <div className="searchBarDiv p-3">
          <div>
            <label htmlFor="basic-url">User Name</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
                placeholder="Insert title"
              />
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">Email</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
                placeholder="Insert title"
              />
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">Password</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
                placeholder="Insert title"
              />
            </div>
          </div>
          <div>
            <label htmlFor="basic-url">Shope name</label>
            <div className=" mb-3">
              <Select className="searchSelect" options={aquaticCreatures} />
            </div>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <input
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                />
              </div>
              <p className="pt-3">Block</p>
            </div>
          </div>
        </div>

        <div className="btnDiv d-flex justify-content-center p-2">
          <button className="btn addProductBtn bgclr">Add User</button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
