import React, { Component } from "react";
import "../css/Header.css";
import myImg from "../assets/IMG_3388.jpg";
import "font-awesome/css/font-awesome.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { faStreetView } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import { scrollEffect } from "../utils";
import DashBoard from "./DashBoard";
import { Link, Route, Switch } from "react-router-dom";
import Category from "./Category";
import AddNewCat from "./AddNewCat";
import Products from "./common/Products";
import AddNewProduct from "./AddNewProduct";
import AddVariantProduct from "./AddVariantProduct";
import DeliveryZone from "./DeliveryZone";
import AddNewDeliveryZone from "./common/AddNewDeliveryZone";
import Coupon from "./Coupon";
import AddNewCoupon from "./common/AddNewCoupon";
import UserManagementGroups from "./UserManagementGroups";
import UserManagementUsers from "./UserManagementUsers";
import AddUser from "./common/AddUser";
import UserPermission from "./UserPermission";
import SystemSetting from "./SystemSetting";
import GeneralSettings from "./GeneralSettings";
import AccountSettings from "./AccountSettings";
import AddNewGroup from "./common/AddNewGroup";
import UpdateProduct from "./common/UpdateProduct";

class Header extends Component {
  state = {};

  componentDidMount() {
    scrollEffect();
  }

  render() {
    return (
      <React.Fragment>
        <input type="checkbox" id="check" />
        {/* <!--header area start--> */}
        <header>
          <label htmlFor="check">
            <FontAwesomeIcon id="sidebar_btn" className="mt-3" icon={faBars} />
          </label>
          <div className="left_area">
            <h3 className="pl-2 pl-md-5 ">
              Coding <span>Snow</span>
            </h3>
          </div>
          <div className="right_area">
            <button className="logout_btn btn">Logout</button>
          </div>
        </header>
        {/* <!--header area end-->
            <!--mobile navigation bar start--> */}
        <div className="mobile_nav">
          <div className="nav_bar">
            <img src={myImg} className="mobile_profile_image" alt="" />
            <i className="fa fa-bars nav_btn"></i>
          </div>
          <div className="mobile_nav_items">
            <div>
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faDesktop} />
                <span>Dashboard</span>
              </Link>
            </div>
            <div>
              <Link to="/categories">
                <FontAwesomeIcon icon={faList} />
                <span>Categories</span>
              </Link>
            </div>
            <div>
              <Link to="/products">
                <FontAwesomeIcon icon={faCubes} />
                <span>Products</span>
              </Link>
            </div>
            <div>
              <Link to="/deliveryzone">
                <FontAwesomeIcon icon={faStreetView} />
                <span>Delivery Zones</span>
              </Link>
            </div>
            <div>
              <Link to="/coupon">
                <FontAwesomeIcon icon={faStar} />
                <span>Coupons</span>
              </Link>
            </div>
            <div>
              <Link to="/orders">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>Orders</span>
              </Link>
            </div>
            <div>
              <Link to="/users">
                <FontAwesomeIcon icon={faUserCircle} />
                <span>User Managment</span>
              </Link>
            </div>
            <div>
              <Link to="/systemsettings">
                <FontAwesomeIcon icon={faCogs} />
                <span>Settings</span>
              </Link>
            </div>
            <div>
              <Link to="/accountsettings">
                <FontAwesomeIcon icon={faCog} />
                <span>Account Settings</span>
              </Link>
            </div>
            <div>
              <Link to="/logout">
                <FontAwesomeIcon icon={faPowerOff} />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
        {/* <!--mobile navigation bar end-->
            <!--sidebar start--> */}
        <div className="sidebar">
          <div className="profile_info">
            <img src={myImg} className="profile_image" alt="" />
            <h4>Husnain Tahir</h4>
          </div>
          <Link to="/">
            <div className="listItem">
              <FontAwesomeIcon icon={faDesktop} />
              <span>Dashboard</span>
            </div>
          </Link>
          {/* CAtegories */}
          <div className="listItem">
            <Link to="/category">
              <FontAwesomeIcon icon={faList} />
            </Link>

            <span>Categories</span>
            <FontAwesomeIcon icon={faChevronUp} className="rotate" />
          </div>
          <div id="listItem_drop">
            <div>
              <Link to="/category">
                <FontAwesomeIcon icon={faEye} />
                <span>View</span>
              </Link>
            </div>
            <div>
              <Link to="/addnewcategory/new">
                <FontAwesomeIcon icon={faPlus} />
                <span>Add</span>
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="listItem">
            <Link to="/products">
              <FontAwesomeIcon icon={faCubes} />
            </Link>

            <span>Products</span>
            <FontAwesomeIcon icon={faChevronUp} className="rotate" />
          </div>
          <div id="listItem_drop">
            <div>
              <Link to="/products">
                <FontAwesomeIcon icon={faEye} />
                <span>View</span>
              </Link>
            </div>
            <div>
              <Link to="/addnewproduct">
                <FontAwesomeIcon icon={faPlus} />
                <span>Add</span>
              </Link>
            </div>
          </div>
          {/* DeliveryZones */}
          <div className="listItem">
            <Link to="/deliveryzone">
              <FontAwesomeIcon icon={faStreetView} />
            </Link>
            <span>Delivery Zones</span>
            <FontAwesomeIcon icon={faChevronUp} className="rotate" />
          </div>
          <div id="listItem_drop">
            <div>
              <Link to="/deliveryzone">
                <FontAwesomeIcon icon={faEye} />
                <span>View</span>
              </Link>
            </div>
            <div>
              <Link to="/addnewdeliveryzone/new">
                <FontAwesomeIcon icon={faPlus} />
                <span>Add</span>
              </Link>
            </div>
          </div>

          {/* Coupons */}
          <div className="listItem">
            <Link to="/coupon">
              <FontAwesomeIcon icon={faStar} />
            </Link>
            <span>Coupons</span>
            <FontAwesomeIcon icon={faChevronUp} className="rotate" />
          </div>
          <div id="listItem_drop">
            <div>
              <Link to="/coupon">
                <FontAwesomeIcon icon={faEye} />
                <span>View</span>
              </Link>
            </div>
            <div>
              <Link to="/addnewcoupon/new">
                <FontAwesomeIcon icon={faPlus} />
                <span>Add</span>
              </Link>
            </div>
          </div>

          {/* Orders */}
          <div className="listItem">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Orders</span>
            <FontAwesomeIcon icon={faChevronUp} className="rotate" />
          </div>
          <div id="listItem_drop">
            <div>
              <FontAwesomeIcon icon={faEye} />
              <span>View</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faPlus} />
              <span>Add</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faPlus} />
              <span>Add</span>
            </div>
          </div>

          {/* user Managment */}

          <div className="listItem">
            <Link to="/Groups">
              <FontAwesomeIcon icon={faUserCircle} />
            </Link>
            <span>User Managment</span>
            <FontAwesomeIcon icon={faChevronUp} className="rotate" />
          </div>
          <div id="listItem_drop">
            <div>
              <Link to="/groups">
                <FontAwesomeIcon icon={faUsers} />
                <span>Groups</span>
              </Link>
            </div>
            <div>
              <Link to="/users">
                <FontAwesomeIcon icon={faUser} />
                <span>Users</span>
              </Link>
            </div>
            <div>
              <Link to="/userpermission">
                <FontAwesomeIcon icon={faLock} />
                <span>User Permission</span>
              </Link>
            </div>
          </div>

          {/* Setting */}

          <div className="listItem">
            <Link to="/systemsettings">
              <FontAwesomeIcon icon={faCogs} />
            </Link>
            <span>Settings</span>
            <FontAwesomeIcon icon={faChevronUp} className="rotate" />
          </div>
          <div id="listItem_drop">
            <div>
              <Link to="/systemsettings">
                <FontAwesomeIcon icon={faCircleNotch} />
                <span>System Settings</span>
              </Link>
            </div>
            <div>
              <Link to="/generalsettings">
                <FontAwesomeIcon icon={faCircleNotch} />
                <span>Genral Settings</span>
              </Link>
            </div>
          </div>

          {/* Account Setting */}
          <div className="listItem">
            <Link to="/accountsettings">
              <FontAwesomeIcon icon={faCog} />

              <span>Account Settings</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="listItem">
            <FontAwesomeIcon icon={faPowerOff} />
            <span>Logout</span>
          </div>
        </div>
        {/* <!--sidebar end--> */}

        <div className="content">
          <Switch>
            <Route path="/category">
              <Category />
            </Route>

            <Route path="/addnewcategory/:id" component={AddNewCat} />

            <Route path="/products">
              <Products />
            </Route>

            <Route path="/addnewproduct" component={AddNewProduct} />

            <Route path="/addvariantproduct">
              <AddVariantProduct />
            </Route>

            <Route path="/deliveryzone">
              <DeliveryZone />
            </Route>
            <Route
              path="/addnewdeliveryzone/:id"
              component={AddNewDeliveryZone}
            />

            <Route path="/coupon">
              <Coupon />
            </Route>

            <Route path="/addnewcoupon/:id" component={AddNewCoupon} />

            <Route path="/groups">
              <UserManagementGroups />
            </Route>

            <Route path="/addnewgroup/:id" component={AddNewGroup} />

            <Route path="/updateproduct" />

            <Route path="/users">
              <UserManagementUsers />
            </Route>
            <Route path="/adduser">
              <AddUser />
            </Route>
            <Route path="/userpermission">
              <UserPermission />
            </Route>
            <Route path="/systemsettings">
              <SystemSetting />
            </Route>
            <Route path="/generalsettings">
              <GeneralSettings />
            </Route>
            <Route path="/accountsettings">
              <AccountSettings />
            </Route>

            <Route path="/">
              <DashBoard />
            </Route>
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
