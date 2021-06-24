const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer"); // npm i -s multer || npm i multer@2.0.0-rc.1
const upload = multer();

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user db
router.get("/", userController.getAllUser);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload
router.post(
  "/uploadProfil",
  upload.single("file"),
  uploadController.uploadProfil
);
router.post(
  "/uploadCover",
  upload.single("file"),
  uploadController.uploadCover
);

module.exports = router;
