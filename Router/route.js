const express = require('express');
const router = express.Router();


const { user, login } = require("../Controller/userController");
const { addPost,seePost,editPost} = require("../Controller/postController");
const {authentication,authorisation}=require("../middleware/auth")


router.post('/user', user);
router.post('/login', login);

router.post('/add-post',authentication,addPost);
router.get('/getpost',authentication,seePost);
router.put("/user/:userId",authentication,authorisation,editPost)

module.exports = router;

