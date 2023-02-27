const express = require("express");
const router = express.Router();

const { addUser, login } = require("../Controller/userController");
const {
  addPost,
  seePost,
  editPost,
  deletePost,
} = require("../Controller/postController");

const { authentication } = require("../middleware/auth");

router.post("/user/signup", addUser);
router.post("/user/login", login);

router.post("/post/add/:userId", authentication, addPost);
router.get("/post/get", authentication, seePost);
router.put("/post/update/:userId/:postId", authentication, editPost);
router.delete("/post/delete/:userId/:postId", authentication, deletePost);

module.exports = router;
