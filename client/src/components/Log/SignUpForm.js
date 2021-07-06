import React, { useState } from "react";
import "../../styles/components/Log/SignUpForm.css";
import "../../styles/components/Log/Errors.css";
import axios from "axios";

const SignUpForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const confirmPasswordError = document.querySelector(
      ".confirmPassword.error"
    );

    confirmPasswordError.innerHTML = "";

    if (password !== confirmPassword) {
      confirmPasswordError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/register`,
        withCredentials: true,
        data: {
          pseudo,
          tweetName: pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            window.location = "/login";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <h2>S'inscrire sur Pwost</h2>
      <br />
      <form
        action=""
        className="form-container-register"
        onSubmit={handleRegister}
      >
        <div className="input-form">
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            className="input-effect"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <label>@Pseudo</label>
        </div>
        <div className="pseudo error"></div>
        <br />
        <div className="input-form">
          <input
            type="email"
            name="email"
            id="email"
            className="input-effect"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Email</label>
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
          <label>Mot de passe</label>
        </div>
        <div className="password error"></div>
        <br />
        <div className="input-form">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="input-effect"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <label>Confirmation mot de passe</label>
        </div>
        <div className="confirmPassword error"></div>
        <br />
        <input
          type="submit"
          value="S'inscrire"
          className="button-submit-form"
        />
      </form>
      <br />
    </>
  );
};

export default SignUpForm;
