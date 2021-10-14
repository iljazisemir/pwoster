import React, { useContext, useState } from "react";
import "../styles/components/MainContainer.css";
import { PopupCreatePostContext } from "../components/AppContext";
import ContainerCreatePost from "./Post/ContainerCreatePost";
import CreatePost from "./Post/CreatePost";
import NavbarMobile from "./NavbarMobile";

const MainContainer = (props) => {
  const [popupCreatePost, setPopupCreatePost] = useContext(
    PopupCreatePostContext
  );

  return (
    <>
      <div className="main-container">{props.children}</div>
      {popupCreatePost && (
        <ContainerCreatePost setPopupCreatePost={setPopupCreatePost}>
          <CreatePost />
        </ContainerCreatePost>
      )}
    </>
  );
};

export default MainContainer;
