const mongoose = require('mongoose');
const userModel = require('../Model/userModel');
const postModel = require('../Model/PostModel');
const commentModel = require('../Model/commentModel');

const addPost = async function(req, res){
    try {
        let data = req.body;
        let userId = data.userId;

        let result = await userModel.findById(userId);
        if(!result) return res.send({message : "user not found."});

        let newPost = await postModel.create(data);
        return res.send({data : newPost});

    } catch (error) {
        return res.send({message : error.message});
    }
}

const seePost =  async function(req, res){
    try{
        let postDetails = await postModel.find({isDeleted:false}).select({postName:1,body:1,userId:1});
        if(postDetails)
        {
            return res.status(200).send({status:true,message:postDetails});
        }
        else
        {
            return res.status(404).send({status:false,message:"Required documents are not found"});
        }
    }catch(error)
    {
        return res.status(500).send({status:false,message:error.message});
    }
}

const editPost =  async function(req, res){
    try{
        let userId=req.param.userId;

        let updatedData=req.body;
        let updateUser = await postModel.findByIdAndUpdate({id:userId},{data:updatedData},{new:true});
        return res.send(200).
        send({status:true,message:"User details updated successfully",data:updateUser});


    }catch(error){
        return res.status(500).send({status:false,message:error.message});
    }

}

const deletePost =  function async(req, res){

}

 module.exports = {addPost,seePost, editPost,deletePost}