require("dotenv").config();
const jwt = require("jsonwebtoken");
const user = require("../models/userModel.js");

const SECRET = process.env.SECRET;

const userAuthentication = async (request, response, next) => {
  const { Authorization } = request.headers;

  if (!Authorization) {
    return response.status(400).json({ error: "Authorization Token Required" });
  }

  const token = Authorization.split("")[1];

  try {
    const { _id } = jwt.verify(token, SECRET);
    request.user = await user.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    response.status(400).json({ error: "Unauthorized Request" });
  }
};

module.exports = userAuthentication;
