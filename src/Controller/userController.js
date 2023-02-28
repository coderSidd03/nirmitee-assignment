const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  checkEmptyBody,
  isValid,
  isValidEmail,
  isValidObjectId,
  isValidName,
  isValidPassword,
} = require("../Validations/validation");

const addUser = async function (req, res) {
  try {
    if (!checkEmptyBody(req.body))
      return res.status(400).send({ status: false, message: "empty body" });
    const { name, title, email, password } = req.body;
    if (!name)
      return res.status(400).send({ status: false, message: "enter name" });
    if (!isValidName(name))
      return res
        .status(400)
        .send({ status: false, message: `name: ${name} is invalid !!` });

    if (!title)
      return res.status(400).send({ status: false, message: "enter title" });
    if (!["Mr", "Mrs", "Miss"].includes(title))
      return res
        .status(400)
        .send({ status: false, message: `title: ${title} is invalid !!` });

    if (!email)
      return res.status(400).send({ status: false, message: "enter email" });
    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: `email: ${email} is invalid !!` });

    if (!password)
      return res.status(400).send({ status: false, message: "enter password" });
    if (!isValidPassword(password))
      return res.status(400).send({
        status: false,
        message: `password: ${password} is invalid !! at least one letter one special character one number needed length must be 8-15`,
      });

    const checkUser = await userModel.findOne({ email: email });
    if (checkUser)
      return res.status(403).send({
        status: false,
        message: `email: ${email} is already registered`,
      });

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    let saveData = await userModel.create(req.body);
    return res.status(201).send({ status: true, send: saveData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const login = async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password)
    return res.status(400).send({ message: "Enter email & password." });

  let user = await userModel.findOne({ email: email });
  if (!user) return res.send({ message: "user not found!!" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(404).send({
      status: false,
      message: `incorrect password given for the account linked with email : ${email}. please check the password and try again !! `,
    });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
    },
    "Nimritee-Assignment",
    { expiresIn: "2h" }
  );

  res.header("Authorization", token);
  return res.status(201).send({
    status: "true",
    message: "Success",
    data: { user: `${user.title}. ${user.name}`, token: token },
  });
};

module.exports = { addUser, login };
