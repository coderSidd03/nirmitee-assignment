const express = require('express');
const router = express.Router();


const { user, login } = require("../Controller/userController");
const { addPost,seePost } = require("../Controller/postController");
const {authentication,authorisation}=require("../middleware/auth")


router.post('/user', user);
router.post('/login', login);

router.post('/add-post',authentication,addPost);
router.get('/getpost',authentication,seePost);

module.exports = router;

