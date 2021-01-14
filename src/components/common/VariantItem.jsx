import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
function VariantItem({ id, onDelete }) {
  return (
    <div className="input-group mb-3 w-75 ml-auto" id={id}>
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
          onClick={() => onDelete(id)}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </button>
      </div>
    </div>
  );
}

export default VariantItem;
