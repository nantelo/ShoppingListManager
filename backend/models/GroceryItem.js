const mongoose = require("mongoose");

const groceryItemSchema = new mongoose.Schema(
  {
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroceryList",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    unit: {
      type: String,
      default: "pcs",
    },

    purchased: {
      type: Boolean,
      default: false,
    },

    purchasedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "GroceryItem",
  groceryItemSchema
);