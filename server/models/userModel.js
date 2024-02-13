const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, name, password) {
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

  if (!validator.isEmail(email) && email) {
    throw Error("Not a valid Email");
  }
  if (!validator.isStrongPassword(password) && password) {
    throw Error("Password is too weak");
  }

  const isEmailExist = await this.findOne({ email });

  if (isEmailExist) {
    throw Error("Email already in use");
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await this.create({ email, name, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email && !password) {
    throw Error("Field is empty");
  }
  if (!email && password) {
    throw Error("Email is empty");
  }
  if (email && !password) {
    throw Error("Password is empty");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email does not exist");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("user", userSchema);
