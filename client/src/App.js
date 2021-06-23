import React, { useEffect, useState } from "react";
import "./App.css";
import Routes from "./components/Routes";
import { UidContext, PopupCreatePostContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const [popupCreatePost, setPopupCreatePost] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <PopupCreatePostContext.Provider
        value={[popupCreatePost, setPopupCreatePost]}
      >
        <Routes />
      </PopupCreatePostContext.Provider>
    </UidContext.Provider>
  );
};

export default App;
