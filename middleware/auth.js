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
        let userData = await userModel.findById(userId)
        if (userData === null){
        return res.status(404).send({ status: false, message: "bookId does not exist" })
        }
        if (userData.userId != userLoggedIn) {
            return res.status(403).send({ status: false, message: "You are not authorised" })
        }
        next()
    } catch (err) {
        return res.status(500).send({ status: false, message: "Token Problem" })
    }
}

module.exports={authentication,authorisation}