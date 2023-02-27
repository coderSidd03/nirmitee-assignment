const mongoose = require("mongoose");

const checkEmptyBody = (object) => {
  return Object.keys(object).length > 0;
};

const isValidObjectId = (objectId) => {
  return mongoose.Types.ObjectId.isValid(objectId);
};

const isValid = (value) => {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

//* USER DETAILS VALIDATIONS *//
const isValidName = (name) => {
  return /^[a-zA-Z ]+$/.test(name);
};

const isValidEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
const isValidPassword = (password) => {
  return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).test(password);
};

module.exports = {
  checkEmptyBody,
  isValid,
  isValidEmail,
  isValidObjectId,
  isValidName,
  isValidPassword,
};
