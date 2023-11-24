const SongService = require("../Service/SongService");
var formidable = require("formidable");
var fs = require("fs");
const path = require("path");

const SendSong = async (req, res) => {
  try {
    const { Id, Name } = req.body;
    const response = await SongService.CheckSong(req.body);
    if (response.status != "ERR") {
      res.sendFile(`${Id}-${Name}.mp3`, {
        root: path.join(__dirname, "../SongList/"),
      });
    } else {
      return res.status(404).json({
        status: "ERR",
        message: "Fork up song~",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "ERR",
      message: "Fork up song~",
    });
  }
};

const CreateSong = async (req, res) => {
  try {
    const response = await SongService.CreateSong(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "ERR",
      message: "Cant not create song",
    });
  }
};

module.exports = { SendSong, CreateSong };
