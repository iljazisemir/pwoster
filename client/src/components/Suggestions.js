import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/components/Suggestions.css";
import ButtonFollow from "../components/Profil/ButtonFollow";
import { isEmpty } from "./Utils";
import { Link } from "react-router-dom";

const Suggestions = () => {
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
      array.length = 3;

      return array;
    }

    shuffle(arraySuggestions);
    setSuggestionsRandom(arraySuggestions);
  }, [usersData, userData]);

  return (
    <div className="suggestions-container">
      <h3>Suggestions</h3>
      <div className="line-separator-suggestions"></div>
      {!isEmpty(suggestionsRandom) &&
        suggestionsRandom.map((user) => {
          return (
            <Link
              to={"/profil/" + user.pseudo}
              className="user-suggestions-container"
              key={user._id}
            >
              {/* <Link
                to={"/profil/" + user.pseudo}
                className="container-none-suggestions"
              ></Link> */}
              <div className="profile-suggestions">
                <div
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
      <Link to="/suggestions" className="see-more">
        Voir plus
      </Link>
    </div>
  );
};

export default Suggestions;
