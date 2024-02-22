require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

const userAuthentication = async (request, response, next) => {
  const { authorization } = request.headers;

  try {
    if (!authorization) {
      throw Error("Unauthorized Request");
    }

    const token = authorization.split(" ")[1];

    const { _id } = jwt.verify(token, process.env.SECRET);

    request.userModel = await userModel.findOne({ _id }).select({ _id: 1 });

    next();
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

module.exports = userAuthentication;
