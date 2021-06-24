const mongoose = require("mongoose");
const { isEmail } = require("validator"); // npm i -s validator
const bcrypt = require("bcrypt"); // npm i -s bcrypt (control password)

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      trimp: true, // Gère les espaces
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      lowercase: true,
      trimp: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    tweetName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    profilePicture: {
      type: String,
      default: "../uploads/profil/random-user.png",
    },
    coverPicture: {
      type: String,
      default: "../uploads/cover/random-cover-user.jpg",
    },
    bio: {
      type: String,
      max: 160,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
    retweets: {
      type: [String],
    },
    conversations: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Permet de crypter le password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Permet de décrypter le password lors de la connexion

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
