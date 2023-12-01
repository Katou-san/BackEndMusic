const mongoose = require("mongoose");
const catalogySchema = new mongoose.Schema(
  {
    Id: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Catalogy = mongoose.model("DataCatalogy", catalogySchema);
module.exports = { Catalogy };
