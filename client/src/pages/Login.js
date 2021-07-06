import React, { useContext, useState } from "react";
import "../styles/pages/Login.css";
import { UidContext } from "../components/AppContext";
import { Redirect } from "react-router-dom";
import SignInForm from "../components/Log/SignInForm";
import SignUpForm from "../components/Log/SignUpForm";

// SVG
import LogoTwitterSvg from "../styles/assets/svg/logoTwitterSvg";

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const uid = useContext(UidContext);

  return (
    <>
      {!uid ? (
        <div className="login-container">
          <LogoTwitterSvg className="logo-twitter-login" />
          {signInForm ? (
            <>
              <SignInForm />
              <div
                className="button-register"
                onClick={() => setSignInForm(false)}
              >
                S'inscrire sur Pwost
              </div>
            </>
          ) : (
            <>
              <SignUpForm />
              <div
                className="button-register"
                onClick={() => setSignInForm(true)}
              >
                Se connecter à Pwost
              </div>
            </>
          )}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Login;
