require("dotenv").config();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

const userAuthentication = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(400).json({ error: "Authorization Required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    request.userModel = await userModel.findOne({ _id }).select("_id");

    next();
  } catch (err) {
    response.status(400).json({ error: "Unauthorized Request" });
  }
};

module.exports = userAuthentication;
