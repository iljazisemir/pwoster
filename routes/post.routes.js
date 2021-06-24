const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer"); // npm i -s multer || npm i multer@2.0.0-rc.1
const upload = multer();

// post
router.get("/", postController.readPost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like/:id", postController.likePost);
router.patch("/unlike/:id", postController.unlikePost);
router.patch("/retweet/:id", postController.retweetPost);
router.patch("/unretweet/:id", postController.unretweetPost);

// comments
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/update-comment-post/:id", postController.updateComment);
router.patch("/delete-comment-post/:id", postController.deleteComment);

module.exports = router;
