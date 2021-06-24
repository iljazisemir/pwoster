import React from "react";
import axios from "axios";
import cookie from "js-cookie";

// SVG
import LogoutSvg from "../../styles/assets/svg/logoutSvg";

const Logout = ({ className }) => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => {
        console.log(err);
      });
    window.location = "/login";
  };
  return <LogoutSvg className={className} onClick={logout} />;
};

export default Logout;
