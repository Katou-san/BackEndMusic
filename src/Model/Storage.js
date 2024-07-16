const mongoose = require("mongoose");
const StorageSchema = new mongoose.Schema(
  {
    User_Id: { type: String, required: true },
    Limit: { type: Number, required: true, default: 50 },
    Used: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Storage = mongoose.model("Storages", StorageSchema);
module.exports = { Storage };
