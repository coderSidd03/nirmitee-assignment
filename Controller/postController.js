const mongoose = require('mongoose');
const userModel = require('../Model/userModel');
const postModel = require('../Model/PostModel');
const commentModel = require('../Model/commentModel');

const addPost = async function(req, res){
    try {
        let data = req.body;
        let userId = data.userId;

        let result = await userModel.findById({userId});
        if(!result) return res.send({message : "user not found."});

        let newPost = await postModel.create(data);
        return res.send({data : newPost});

    } catch (error) {
        return res.send({message : error.message});
    }
}


module.exports = {addPost}