import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const SiteHeaderModal = (props) => {
  const {
    buttonLabel,
    className,
    modal,
    handleToggle,
    onChangeFile,
    handleSubmit,
    fileName,
  } = props;

  const submitForm = (e) => {
    e.preventDefault();
    console.log("header");
    handleSubmit(e);
    handleToggle();
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
                  name="headerModal"
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

export default SiteHeaderModal;
