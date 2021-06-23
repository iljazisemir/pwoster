import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArrowLeftSvg from "../styles/assets/svg/arrowLeftSvg";
import ButtonFollow from "./Profil/ButtonFollow";
import { isEmpty } from "./Utils";

const AllSuggestions = () => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [suggestionsRandom, setSuggestionsRandom] = useState();

  useEffect(() => {
    let arraySuggestions = [];
    !isEmpty(usersData) &&
      !isEmpty(userData) &&
      usersData.map((user) => {
        if (!userData.following.includes(user._id) && user._id !== userData._id)
          arraySuggestions.push(user);
      });
    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    shuffle(arraySuggestions);
    setSuggestionsRandom(arraySuggestions);
  }, [usersData, userData]);

  return (
    <>
      <div className="top-home-container">
        <Link to="/">
          <ArrowLeftSvg className="left-arrow-svg" />
        </Link>
        <h3>Suggestions</h3>
      </div>
      <div className="container-all-suggestions">
        {!isEmpty(suggestionsRandom) &&
          suggestionsRandom.map((user) => {
            return (
              <Link
                to={"/profil/" + user.pseudo}
                className="user-all-suggestions-container"
                key={user._id}
              >
                <div className="profile-suggestions">
                  {/* <Link
                    to={"/profil/" + user.pseudo}
                    className="container-none-suggestions"
                  ></Link> */}
                  <div
                    to={"/profil/" + user.pseudo}
                    className="user-follow-container"
                  >
                    <img
                      src={user.profilePicture}
                      alt="profil picture"
                      className="profil-picture-post"
                    />
                  </div>
                  <div>
                    <div className="tweetName">{user.tweetName}</div>
                    <div className="info-post">@{user.pseudo}</div>
                  </div>
                </div>
                <ButtonFollow idToFollow={user._id} />
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default AllSuggestions;
