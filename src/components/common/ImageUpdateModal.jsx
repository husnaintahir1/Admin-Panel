import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { apiEndpointUpdateItemImage } from "../../apiEndpoints";
import http from "../../services/httpService";

const ImageUpdateModal = (props) => {
  const {
    buttonLabel,
    className,
    modal,
    handleToggle,
    onChangeFile,
    handleSubmit,
    fileName,
    name,
    itemId,
    image,
  } = props;

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("item image");
    handleToggle();
    const formData = new FormData();

    formData.append("item_image", image);

    const response = await http.post(
      apiEndpointUpdateItemImage + itemId,
      formData
    );
    console.log(image, response);

    console.log(fileName);
  };
  return (
    <div>
      <Modal isOpen={modal} className={className}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <form id="siteHeaderImage" onSubmit={submitForm}>
            <div className="">
              <label htmlFor="basic-url">Product image</label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  name={name}
                  id="inputGroupFile01"
                  onChange={onChangeFile}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  {fileName}
                </label>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" form="siteHeaderImage">
            Do Something
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ImageUpdateModal;
