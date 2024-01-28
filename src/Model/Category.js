const mongoose = require("mongoose");
const catalogySchema = new mongoose.Schema(
  {
    Catalogy_Id: { type: String, required: true, unique: true },
    Catalogy_Name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Catalogy = mongoose.model("DataCatalogy", catalogySchema);
module.exports = { Catalogy };
