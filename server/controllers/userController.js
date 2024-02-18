require("dotenv").config();
const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "1d",
  });
};

const signupUser = async (request, response) => {
  const { email, name, password } = request.body;

  try {
    if (!email && !name && !password) {
      throw Error("All Fields are Empty");
    }
    if (!email && name && password) {
      throw Error("Email is Empty");
    }
    if (email && !name && password) {
      throw Error("Name is Empty");
    }
    if (email && name && !password) {
      throw Error("Password is Empty");
    }
    if (email && !name && !password) {
      throw Error("2 Fields are Empty");
    }
    if (!email && name && !password) {
      throw Error("2 Fields are Empty");
    }
    if (!email && !name && password) {
      throw Error("2 Fields are Empty");
    }
    if (!validator.isEmail(email)) {
      throw Error("Not a valid Email");
    }
    if (
      !validator.isLength(name, { min: 2, max: 50 }) ||
      !validator.isAlpha(name.replace(/[-' ]/g, ""))
    ) {
      throw Error("Invalid Name");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password is too weak");
    }

    const isEmailExist = await userModel.findOne({ email });

    if (isEmailExist) {
      throw Error("Email already in use");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({ email, name, password: hash });

    const token = createToken(user._id);

    response.status(200).json({ email, name, token });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

const loginUser = async (request, response) => {
  const { email, password } = request.body;
  let user = "";

  try {
    if (!email && !password) {
      throw Error("All Fields are Empty");
    }
    if (!email && password) {
      throw Error("Email is Empty");
    }
    if (email && !password) {
      throw Error("Password is Empty");
    }

    user = await userModel.findOne({ email });

    if (!user) {
      throw Error("Email does not exist");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw Error("Incorrect Password");
    }

    const token = createToken(user._id);

    const name = user.name;

    response.status(200).json({ email, name, token });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

module.exports = { signupUser, loginUser };
