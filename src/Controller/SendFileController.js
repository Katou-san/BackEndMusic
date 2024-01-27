var formidable = require("formidable");
var fs = require("fs");
const path = require("path");

const getAudio = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = { root: path.join(__dirname, "../Song_Audio") };
    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Success");
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const getImage = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = { root: path.join(__dirname, "../Song_Image") };
    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Success");
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = { getAudio, getImage };
