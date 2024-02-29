const grocerySchema = require("../models/groceryModel.js");
const mongoose = require("mongoose");

const postUserGrocery = async (request, response) => {
  const { product, volume, quantity, description, user_id, is_done } =
    request.body;

  try {
    if (!product && !volume && !quantity && !description) {
      throw Error("All Fields Required");
    }
    if (
      (product && !volume && !quantity && !description) ||
      (!product && volume && !quantity && !description) ||
      (!product && !volume && quantity && !description) ||
      (!product && !volume && !quantity && description)
    ) {
      throw Error("3 Fields Required");
    }
    if (
      (product && volume && !quantity && !description) ||
      (!product && !volume && quantity && description) ||
      (product && !volume && !quantity && description) ||
      (!product && volume && quantity && !description) ||
      (!product && volume && !quantity && description) ||
      (product && !volume && quantity && !description)
    ) {
      throw Error("2 Fields Required");
    }
    if (!product && volume && quantity && description) {
      throw Error("Product Required");
    }
    if (!volume && product && quantity && description) {
      throw Error("Volume Required");
    }
    if (!quantity && product && volume && description) {
      throw Error("Quantity Required");
    }
    if (!description && product && volume && quantity) {
      throw Error("Description Required");
    }
    if (quantity < 1) {
      throw Error("Quantity atleast 1");
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
      is_done,
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
  const { product, volume, quantity, description, is_done } = request.body;

  try {
    if (!is_done) {
      if (!product && !volume && !quantity && !description) {
        throw Error("All Fields Required");
      }
      if (
        (product && !volume && !quantity && !description) ||
        (!product && volume && !quantity && !description) ||
        (!product && !volume && quantity && !description) ||
        (!product && !volume && !quantity && description)
      ) {
        throw Error("3 Fields Required");
      }
      if (
        (product && volume && !quantity && !description) ||
        (!product && !volume && quantity && description) ||
        (product && !volume && !quantity && description) ||
        (!product && volume && quantity && !description) ||
        (!product && volume && !quantity && description) ||
        (product && !volume && quantity && !description)
      ) {
        throw Error("2 Fields Required");
      }
      if (!product && volume && quantity && description) {
        throw Error("Product Required");
      }
      if (!volume && product && quantity && description) {
        throw Error("Volume Required");
      }
      if (!quantity && product && volume && description) {
        throw Error("Quantity Required");
      }
      if (!description && product && volume && quantity) {
        throw Error("Description Required");
      }
      if (quantity < 1) {
        throw Error("Quantity atleast 1");
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw Error("Invalid ID");
      }
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
