const mongoose = require("mongoose");

const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    added: { type: Date, default: Date.now },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    user: { type: String, required: true },
    photo: { type: String, required: false },
    updated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "items",
  }
);

module.exports = mongoose.model("Item", itemSchema);
