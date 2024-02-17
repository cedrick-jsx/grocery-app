const grocerySchema = require("../models/groceryModel.js");
const mongoose = require("mongoose");

const postUserGrocery = async (request, response) => {
  const { product, volume, quantity, description, user_id } = request.body;

  try {
    if (!product || !volume || !quantity || !description || !user_id) {
      throw Error("All Fields Required");
    }

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      throw Error("Invalid ID");
    }

    const grocery = await grocerySchema.create({
      product,
      volume,
      quantity,
      description,
      user_id,
    });

    response.status(200).json(grocery);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

const getUserGrocery = async (request, response) => {
  const { id } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error({ error: "Invalid ID" });
    }

    const grocery = await grocerySchema
      .find({ user_id: id })
      .sort({ createdAt: -1 });

    if (grocery.length === 0) {
      throw Error("No Grocery Found");
    }

    response.status(200).json(grocery);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

const updateUserGrocery = async (request, response) => {
  const { id } = request.params;
  const { product, volume, quantity, description } = request.body;

  try {
    if (!product || !volume || !quantity || !description) {
      throw Error("All Fields Required");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID");
    }

    const grocery = await grocerySchema.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!grocery) {
      throw Error("No Grocery Found");
    }

    response.status(200).json(grocery);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

const deleteUserGrocery = async (request, response) => {
  const { id } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Error("Invalid ID");
    }

    const grocery = await grocerySchema.findByIdAndDelete(id);

    if (!grocery) {
      throw Error("No Grocery Found");
    }

    response.status(200).json(grocery);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

module.exports = {
  postUserGrocery,
  getUserGrocery,
  updateUserGrocery,
  deleteUserGrocery,
};
