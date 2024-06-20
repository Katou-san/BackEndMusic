const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    Category_Id: { type: String, required: true, unique: true },
    Category_Name: { type: String, required: true },
    User_Id: { type: String, required: true },
    Create_Date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Categories", CategorySchema);
module.exports = { Category };
