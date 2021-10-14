import React, { useContext, useState } from "react";
import "../styles/components/NavbarMobile.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "./Button";
import Logout from "./Log/Logout";
import { PopupCreatePostContext } from "../components/AppContext";

// SVG
import HomeSvg from "../styles/assets/svg/homeSvg";
import EnveloppeSvg from "../styles/assets/svg/enveloppeSvg";
import PersonSvg from "../styles/assets/svg/personSvg";
import AddFriends from "../styles/assets/svg/addFriends";

const Navbar = () => {
  const userData = useSelector((state) => state.userReducer);
  const [popupCreatePost, setPopupCreatePost] = useContext(
    PopupCreatePostContext
  );

  return (
    <>
      <Button
        className="button-navbar-mobile"
        onClick={() => setPopupCreatePost(true)}
      >
        Pwoster
      </Button>
      <div className="navbar-mobile-container">
        <NavLink
          exact
          to="/"
          activeClassName="active-navbar"
          className="tab-navbar-mobile-container"
        >
          <HomeSvg className="svg-navbar" />
        </NavLink>
        <NavLink
          to="/messages"
          className="tab-navbar-mobile-container"
          activeClassName="active-navbar"
        >
          <EnveloppeSvg className="svg-navbar" />
        </NavLink>
        <NavLink
          to={"/profil/" + userData.pseudo}
          activeClassName="active-navbar"
          className="tab-navbar-mobile-container"
        >
          <PersonSvg className="svg-navbar" />
        </NavLink>
        <NavLink
          to="/suggestions"
          activeClassName="active-navbar"
          className="tab-navbar-mobile-container"
        >
          <AddFriends className="svg-navbar" />
        </NavLink>
        <Logout className="svg-logout-navbar" />
      </div>
    </>
  );
};

export default Navbar;
