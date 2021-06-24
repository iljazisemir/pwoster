const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 280,
      // required: true,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    retweet: {
      type: [String],
      required: true,
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
    quoteTweetId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("post", postSchema);
module.exports = PostModel;
