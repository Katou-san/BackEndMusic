const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    Category_Id: { type: String, required: true, unique: true },
    Category_Name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Data_Category", CategorySchema);
module.exports = { Category };
