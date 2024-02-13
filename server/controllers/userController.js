require("dotenv").config();
const user = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, {
    expiresIn: "1d",
  });
};

const signupUser = async (request, response) => {
  const { email, name, password } = request.body;

  try {
    const isUser = await user.signup(email, name, password);
    const token = createToken(isUser._id);

    response.status(200).json({ email, name, token });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

const loginUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const isUser = await user.login(email, password);
    const token = createToken(isUser._id);
    const name = isUser.name;

    response.status(200).json({ email, name, token });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

module.exports = { signupUser, loginUser };
