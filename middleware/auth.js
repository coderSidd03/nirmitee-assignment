const postModel = require("../Model/PostModel")
const userModel = require("../Model/userModel")
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")



const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(400).send({ status: false, message: "Token required" })

        // console.log(token)

        jwt.verify(token, "Nimritee-Assignment", (error, decodedToken) => {
            if (error) {
                return res.status(401).send({ status: false, message: "token is invalid"} );

            }
            req["decodedToken"] = decodedToken    //this line for we can access this token outside the middleware

            // console.log(decodedToken )

            next()

        });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


//========================================================Authorisation==============================================================

const authorisation = async function (req, res, next) {
    try {
        let userId = req.params.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, message: "Please enter correct userId" })
        }
        let userLoggedIn = req.decodedToken.userId
        let postData = await postModel.findById(userId)
        if (postData === null){
        return res.status(404).send({ status: false, message: "userId does not exist in postmodel" })
        }
        if (postData.userId != userLoggedIn) {
            return res.status(403).send({ status: false, message: "You are not authorised" })
        }
        next()
    } catch (err) {
        return res.status(500).send({ status: false, message:err.message})
    }
}

module.exports={authentication,authorisation}