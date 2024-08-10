const mongoose = require("mongoose");
const fingerprintsSchema = new mongoose.Schema({
  Song_Id: { type: String, required: true, unique: true },
  FB_array: { type: String },
});

const Fingerprints = mongoose.model("Fingerprints", fingerprintsSchema);
module.exports = { Fingerprints };
