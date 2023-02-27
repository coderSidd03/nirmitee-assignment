const express = require('express');
const router = express.Router();

const { user, login } = require("../Controller/userController");
const { addPost } = require("../Controller/postController");


router.post('/user', user);
router.post('/login', login);

router.post('/add-post', addPost);

module.exports = router;

