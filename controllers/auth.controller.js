const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils.js/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 jours

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password, tweetName } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password, tweetName });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
