import React from "react";
import "../css/Category.css";
import food from "../assets/pexels-photo-1640777.jpeg";
import Form from "./common/Form";
import joi from "joi-browser";
import PictureModel from "./common/Model";
import SiteHeaderModal from "./common/SiteHeaderModal";
class SystemSetting extends Form {
  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };
  toggleHeaderModal = () => {
    this.setState({ headerModal: !this.state.headerModal });
  };
  toggleFooterModal = () => {
    this.setState({ footerModal: !this.state.footerModal });
  };

  schema = {
    siteName: joi.string().required().label("siteName"),
    facebookLink: joi.string().required().label("Facebook Link"),
    instaLink: joi.string().required().label("Insta Link"),
    twitterLink: joi.string().required().label("Twitter Link"),
    footerColor: joi.string().required().label("Footer Color"),
    headerColor: joi.string().required().label("Header Color"),
    themeVariantColor: joi.required().label("Theme Variant Color"),
    themePrimaryColor: joi.required().label("Theme Primary Color"),
  };
  doSubmit = () => {
    // server Code

    console.log("submitted");
  };

  render() {
    const { errors, data } = this.state;
    return (
      <div className="container-fluid">
        <PictureModel
          modal={this.state.modal}
          handleToggle={this.toggleModal}
          name="favIcon"
          onChangeFile={this.handleChangeFile}
          handleSubmit={this.handleSubmit}
          fileName={data.favIcon ? data.favIcon.name : "Choose file"}
        />
        <PictureModel
          modal={this.state.footerModal}
          handleToggle={this.toggleFooterModal}
          name="footerModal"
          onChangeFile={this.handleChangeFile}
          handleSubmit={this.handleSubmit}
          fileName={data.footerModal ? data.footerModal.name : "Choose file"}
        />
        <PictureModel
          modal={this.state.headerModal}
          handleToggle={this.toggleHeaderModal}
          name="headerModal"
          onChangeFile={this.handleChangeFile}
          handleSubmit={this.handleSubmit}
          fileName={
            data.headerModal ? data.headerModal.name : "Choose file header"
          }
        />

        <h1>
          System Settings <span>Preview</span>
        </h1>
        <form id="settingForm" onSubmit={this.handleSubmit}>
          <div className="searchBox">
            <h5 className="searchHeading p-2">Edit Data</h5>
            <div className="searchBarDiv p-3">
              <div>
                <label htmlFor="basic-url">Site Name</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Insert title"
                    name="siteName"
                    value={this.state.data.siteName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.siteName && (
                <div className="errorDisp">{errors.siteName}</div>
              )}

              <div>
                <label htmlFor="basic-url">Facebook Link</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Insert title"
                    name="facebookLink"
                    value={this.state.data.facebookLink}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.facebookLink && (
                <div className="errorDisp">{errors.facebookLink}</div>
              )}

              <div>
                <label htmlFor="basic-url">Insta Link</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Insert title"
                    name="instaLink"
                    value={this.state.data.instaLink}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.instaLink && (
                <div className="errorDisp">{errors.instaLink}</div>
              )}

              <div>
                <label htmlFor="basic-url">Twitter Link</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Insert title"
                    name="twitterLink"
                    value={this.state.data.twitterLink}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.twitterLink && (
                <div className="errorDisp">{errors.twitterLink}</div>
              )}

              <div>
                <label htmlFor="basic-url">Footer Color</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Insert title"
                    name="footerColor"
                    value={this.state.data.footerColor}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.footerColor && (
                <div className="errorDisp">{errors.footerColor}</div>
              )}

              <div>
                <label htmlFor="basic-url">Header Color</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Insert title"
                    name="headerColor"
                    value={this.state.data.headerColor}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.headerColor && (
                <div className="errorDisp">{errors.headerColor}</div>
              )}

              <div>
                <label htmlFor="basic-url">Theme Variant Color</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Insert title"
                    name="themeVariantColor"
                    value={this.state.data.themeVariantColor}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.themeVariantColor && (
                <div className="errorDisp">{errors.themeVariantColor}</div>
              )}

              <div>
                <label htmlFor="basic-url">Theme Primary Color</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="Insert title"
                    name="themePrimaryColor"
                    value={this.state.data.themePrimaryColor}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {errors.themePrimaryColor && (
                <div className="errorDisp">{errors.themePrimaryColor}</div>
              )}
            </div>

            <div className="btnDiv d-flex justify-content-center p-2">
              <button className="btn addProductBtn bgclr" form="settingForm">
                Update
              </button>
            </div>
          </div>
        </form>
        <div className="d-flex siteSetting justify-content-around mt-4 mb-4 ">
          <div className="searchBox  mt-4 mt-md-0">
            <h5 className="searchHeading p-2">Site Footer</h5>
            <div className="searchBarDiv p-3 systemSetting">
              <img
                src={
                  data.footerModal
                    ? URL.createObjectURL(data.footerModal)
                    : food
                }
                className="variantItemImg"
                alt=""
              />
            </div>

            <div className="btnDiv d-flex justify-content-center p-2">
              <button
                className="btn searchBtn bgclr"
                onClick={this.toggleFooterModal}
              >
                Update
              </button>
            </div>
          </div>

          <div className="searchBox mt-4 mt-md-0">
            <h5 className="searchHeading p-2">Site Header</h5>
            <div className="searchBarDiv p-3 systemSetting">
              <img
                src={
                  data.headerModal
                    ? URL.createObjectURL(data.headerModal)
                    : food
                }
                className="variantItemImg"
                alt=""
              />
            </div>

            <div className="btnDiv d-flex justify-content-center p-2">
              <button
                className="btn searchBtn bgclr"
                onClick={this.toggleHeaderModal}
              >
                Update
              </button>
            </div>
          </div>

          <div className="searchBox  mt-4 mt-md-0 ">
            <h5 className="searchHeading p-2">Site Favicon Image</h5>
            <div className="searchBarDiv p-3 systemSetting">
              <img
                src={data.favIcon ? URL.createObjectURL(data.favIcon) : food}
                className="variantItemImg"
                alt=""
              />
            </div>

            <div className="btnDiv d-flex justify-content-center p-2">
              <button
                className="btn searchBtn bgclr"
                onClick={this.toggleModal}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SystemSetting;
