const grocerySchema = require("../models/groceryModel.js");
const mongoose = require("mongoose");

const postUserGrocery = async (request, response) => {
  const { product, volume, quantity, description, user_id } = request.body;

  try {
    if (!product && !volume && !quantity && !description) {
      throw Error("All Fields are Empty");
    }
    if (
      (product && !volume && !quantity && !description) ||
      (!product && volume && !quantity && !description) ||
      (!product && !volume && quantity && !description) ||
      (!product && !volume && !quantity && description)
    ) {
      throw Error("3 Fields are Empty");
    }
    if (
      (product && volume && !quantity && !description) ||
      (!product && !volume && quantity && description) ||
      (product && !volume && !quantity && description) ||
      (!product && volume && quantity && !description) ||
      (!product && volume && !quantity && description) ||
      (product && !volume && quantity && !description)
    ) {
      throw Error("2 Fields are Empty");
    }
    if (!product && volume && quantity && description) {
      throw Error("Product is Empty");
    }
    if (!volume && product && quantity && description) {
      throw Error("Volume is Empty");
    }
    if (!quantity && product && volume && description) {
      throw Error("Quantity is Empty");
    }
    if (!description && product && volume && quantity) {
      throw Error("Description is Empty");
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
      throw Error("Invalid ID");
    }

    const grocery = await grocerySchema
      .find({ user_id: id })
      .sort({ createdAt: -1 });

    if (!grocery || grocery.length === 0) {
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
    if (!product && !volume && !quantity && !description) {
      throw Error("All Fields are Empty");
    }
    if (
      (product && !volume && !quantity && !description) ||
      (!product && volume && !quantity && !description) ||
      (!product && !volume && quantity && !description) ||
      (!product && !volume && !quantity && description)
    ) {
      throw Error("3 Fields are Empty");
    }
    if (
      (product && volume && !quantity && !description) ||
      (!product && !volume && quantity && description) ||
      (product && !volume && !quantity && description) ||
      (!product && volume && quantity && !description) ||
      (!product && volume && !quantity && description) ||
      (product && !volume && quantity && !description)
    ) {
      throw Error("2 Fields are Empty");
    }
    if (!product && volume && quantity && description) {
      throw Error("Product is Empty");
    }
    if (!volume && product && quantity && description) {
      throw Error("Volume is Empty");
    }
    if (!quantity && product && volume && description) {
      throw Error("Quantity is Empty");
    }
    if (!description && product && volume && quantity) {
      throw Error("Description is Empty");
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
