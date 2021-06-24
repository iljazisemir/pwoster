const router = require("express").Router();
const messageController = require("../controllers/message.controller");

router.get("/", messageController.getMessages);
router.post("/", messageController.createConversation);
router.delete("/:id", messageController.deleteConversation);
router.patch("/send-message/:id", messageController.sendMessage);

module.exports = router;
