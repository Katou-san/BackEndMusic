var formidable = require("formidable");
var fs = require("fs");
const path = require("path");

const Send_Song_Audio = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = { root: path.join(__dirname, "../Song_Audio") };
    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const Send_Song_Img = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = { root: path.join(__dirname, "../Song_Image") };
    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const Send_User_Avatar = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = { root: path.join(__dirname, "../User_Avatar") };
    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = { Send_Song_Audio, Send_Song_Img, Send_User_Avatar };
