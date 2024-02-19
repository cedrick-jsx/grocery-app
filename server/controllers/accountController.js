const userModel = require("../models/userModel.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const getUserAccount = async (request, response) => {
  const { email } = request.params;

  try {
    if (!validator.isEmail(email)) {
      throw Error("Invalid Email");
    }

    const userAccount = await userModel.findOne({ email });

    if (!userAccount) {
      throw Error("No Account Found");
    }

    response.status(200).json(userAccount);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

const updateUserAccount = async (request, response) => {
  const { id } = request.params;
  const { name, password } = request.body;
  let userAccount = "";

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("No Account Found");
    }
    if (!name) {
      throw Error("Name is Empty");
    }
    if (
      !validator.isLength(name, { min: 2, max: 50 }) ||
      !validator.isAlpha(name.replace(/[-' ]/g, ""))
    ) {
      throw Error("Invalid Name");
    }
    if (!validator.isStrongPassword(password) && password) {
      throw Error("Password is too weak");
    }

    if (password) {
      const hash = await bcrypt.hash(password, 10);

      userAccount = await userModel.findByIdAndUpdate(
        id,
        {
          name,
          password: hash,
        },
        { new: true }
      );
    } else if (!password) {
      userAccount = await userModel.findByIdAndUpdate(
        id,
        { name },
        {
          new: true,
        }
      );
    }

    if (!userAccount) {
      throw Error("No Account Found");
    }

    response.status(200).json(userAccount.name);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

module.exports = {
  getUserAccount,
  updateUserAccount,
};
