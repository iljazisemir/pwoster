import React, { useContext, useState } from "react";
import "../styles/components/Navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "./Button";
import Logout from "./Log/Logout";
import { PopupCreatePostContext } from "../components/AppContext";

// SVG
import LogoTwitterSvg from "../styles/assets/svg/logoTwitterSvg";
import HomeSvg from "../styles/assets/svg/homeSvg";
import HashSvg from "../styles/assets/svg/hashSvg";
import BellSvg from "../styles/assets/svg/bellSvg";
import EnveloppeSvg from "../styles/assets/svg/enveloppeSvg";
import PersonSvg from "../styles/assets/svg/personSvg";

const Navbar = () => {
  const userData = useSelector((state) => state.userReducer);
  const [popupCreatePost, setPopupCreatePost] = useContext(
    PopupCreatePostContext
  );

  return (
    <div className="navbar-container">
      <div>
        <NavLink exact to="/">
          <LogoTwitterSvg className="svg-logo-twitter" />
        </NavLink>
        <NavLink
          exact
          to="/"
          activeClassName="active-navbar"
          className="tab-navbar-container"
        >
          <HomeSvg className="svg-navbar" />
          <h3>Accueil</h3>
        </NavLink>
        <NavLink
          to="/messages"
          className="tab-navbar-container"
          activeClassName="active-navbar"
        >
          <EnveloppeSvg className="svg-navbar" />
          <h3>Messages</h3>
        </NavLink>
        <NavLink
          to={"/profil/" + userData.pseudo}
          activeClassName="active-navbar"
          className="tab-navbar-container"
        >
          <PersonSvg className="svg-navbar" />
          <h3>Profil</h3>
        </NavLink>
        <Button
          className="button-navbar"
          onClick={() => setPopupCreatePost(true)}
        >
          Tweeter
        </Button>
      </div>
      <div className="profil-navbar-container">
        <div className="left-profil-navbar-container">
          <div className="profile-picture-navbar-container">
            <img
              src={userData.profilePicture}
              alt="Profile Picture"
              className="profile-picture-navbar"
            />
          </div>
          <div>
            <div className="tweetName">{userData.tweetName}</div>
            <div className="userName">@{userData.pseudo}</div>
          </div>
        </div>
        <Logout className="svg-logout-navbar" />
      </div>
    </div>
  );
};

export default Navbar;
