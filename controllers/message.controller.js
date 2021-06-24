const MessageModel = require("../models/message.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId; // Pour que les ID soit reconnus par la DB

module.exports.getMessages = async (req, res) => {
  const messages = await MessageModel.find();
  res.status(200).json(messages);
};

module.exports.createConversation = async (req, res) => {
  if (
    !ObjectID.isValid(req.body.user1Id) ||
    !ObjectID.isValid(req.body.user2Id)
  )
    return res.status(400).send("ID unknow : " + req.params.id);

  const newConversation = new MessageModel({
    user1Id: req.body.user1Id,
    user2Id: req.body.user2Id,
    messages: [],
  });

  try {
    const conversation = await newConversation.save();

    await UserModel.findByIdAndUpdate(
      req.body.user1Id,
      {
        $addToSet: {
          conversations: conversation.id,
        },
      },
      { new: true, upsert: true },
      (err, docs) => {
        // if (!err) return res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    );

    await UserModel.findByIdAndUpdate(
      req.body.user2Id,
      {
        $addToSet: {
          conversations: conversation.id,
        },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) return res.status(201).json(conversation);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteConversation = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  UserModel.findByIdAndUpdate(
    req.body.user1Id,
    {
      $pull: {
        conversations: req.params.id,
      },
    },
    { new: true, upsert: true },
    (err, docs) => {
      // if (!err) return res.status(201).json(docs);
      if (err) return res.status(400).json(err);
    }
  );

  UserModel.findByIdAndUpdate(
    req.body.user2Id,
    {
      $pull: {
        conversations: req.params.id,
      },
    },
    { new: true, upsert: true },
    (err, docs) => {
      // if (!err) return res.status(201).json(docs);
      if (err) return res.status(400).json(err);
    }
  );

  MessageModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Update error : " + err);
  });
};

module.exports.sendMessage = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  try {
    await MessageModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          messages: {
            senderId: req.body.senderId,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.status(200).send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
