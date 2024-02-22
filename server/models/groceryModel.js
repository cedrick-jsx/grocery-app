const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    volume: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    is_done: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("grocery", grocerySchema);
