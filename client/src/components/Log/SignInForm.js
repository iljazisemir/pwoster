import React, { useState } from "react";
import "../../styles/components/Log/SignInForm.css";
import "../../styles/components/Log/Errors.css";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2>Se connecter à Pwoster</h2>
      <br />
      <form action="" onSubmit={handleLogin}>
        <div className="input-form">
          <input
            type="email"
            name="email"
            id="email"
            className="input-effect"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="email error"></div>
        <br />
        <div className="input-form">
          <input
            type="password"
            name="password"
            id="password"
            className="input-effect"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label htmlFor="password">Mot de passe</label>
        </div>
        <div className="password error"></div>
        <br />
        <input
          type="submit"
          className="button-submit-form"
          value="Se connecter"
        />
      </form>
      <br />
    </>
  );
};

export default SignInForm;
