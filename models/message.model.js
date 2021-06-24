const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    user1Id: {
      type: String,
      required: true,
    },
    user2Id: {
      type: String,
      required: true,
    },
    messages: {
      type: [
        {
          senderId: String,
          text: String,
          timestamp: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("message", messageSchema);
module.exports = MessageModel;
