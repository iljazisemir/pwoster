import React, { useContext, useEffect, useState } from "react";
import "../styles/pages/Profil.css";
import { useSelector } from "react-redux";
import ProfilContainer from "../components/Profil/ProfilContainer";
import TabTweet from "../components/Profil/TabTweet";
import { isEmpty } from "../components/Utils";
import { UidContext } from "../components/AppContext";

const Profil = ({ userPseudo, ...props }) => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const postData = useSelector((state) => state.postReducer);
  const [userProfil, setUserProfil] = useState("");

  useEffect(() => {
    !isEmpty(usersData) &&
      usersData.map((user) => {
        if (user.pseudo === userPseudo) {
          setUserProfil(user);
        }
      });
  });

  return userProfil._id === uid ? (
    <>
      <ProfilContainer
        userData={userData}
        postData={postData}
        usersData={usersData}
      />
      <TabTweet
        userData={userData}
        postData={postData}
        usersData={usersData}
        props={props}
      />
    </>
  ) : (
    <>
      <ProfilContainer
        userData={userProfil}
        postData={postData}
        usersData={usersData}
      />
      <TabTweet
        userData={userProfil}
        postData={postData}
        usersData={usersData}
        props={props}
      />
    </>
  );
};

export default Profil;
