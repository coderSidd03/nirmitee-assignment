const userModel = require('../Model/userModel');
const jwt = require('jsonwebtoken');

const user = async function(req , res){
    try {
        let data = req.body;
        let saveData = await userModel.create(data)
        return res.status(201).send({status : true, send : saveData})
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
    }
}

const login = async function(req, res){
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) return res.status(400).send({message : "Enter EmailId & password."});

    let user = await userModel.findOne({email : email , password : password});
    if(!user) return res.send({message : "user not found!!"});

    let token = jwt.sign({
        userId : user._id.toString()
    }, "Nimritee-Assignment") ;

    res.setHeader('x-api-key' , token);
    return res.send({data : {"token" : token}})
}

module.exports = {user , login}
