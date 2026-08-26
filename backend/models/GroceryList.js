const mongoose = require("mongoose");

const groceryListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recurring: {
      type: Boolean,
      default: false,
    },

    recurrence: {
      type: String,
      enum: ["none", "daily", "weekly", "monthly"],
      default: "none",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "GroceryList",
  groceryListSchema
);