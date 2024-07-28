const mongoose = require("mongoose");
const artistSchema = new mongoose.Schema(
  {
    Artist_Id: { type: String, required: true, unique: true },
    Artist_Name: { type: String, required: true, unique: true },
    User_Id: { type: String },
    Vertify: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Artist = mongoose.model("Artist", artistSchema);
module.exports = { Artist };
