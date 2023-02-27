const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
  try {
    let token = req.headers["authorization"];
    if (!token)
      return res.status(403).send({ status: false, message: "Token required" });

    // console.log(token)

    let user = token.split(" ");

    jwt.verify(user[1], "Nimritee-Assignment", (error, decodedToken) => {
      if (error)
        return res.status(400).send({ status: false, message: error.message });
      req.userId = decodedToken.userId;
      next();
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//========================================================Authorisation==============================================================

// const authorisation = async function (req, res, next) {
//     try {
//         let userId = req.params.userId;
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res
//                 .status(400)
//                 .send({ status: false, message: "Please enter correct userId" });
//         }
//         let userLoggedIn = req.decodedToken.userId;
//         let userData = await userModel.findById(userId);
//         if (userData === null) {
//             return res
//                 .status(404)
//                 .send({ status: false, message: "bookId does not exist" });
//         }
//         if (userData.userId != userLoggedIn) {
//             return res
//                 .status(403)
//                 .send({ status: false, message: "You are not authorised" });
//         }
//         next();
//     } catch (err) {
//         return res.status(500).send({ status: false, message: "Token Problem" });
//     }
// };

module.exports = { authentication };
