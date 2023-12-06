const SongService = require("../Service/SongService");
var formidable = require("formidable");
var fs = require("fs");
const path = require("path");

const SendSong = async (req, res) => {
  try {
    const { Id, IdUser } = req.body;
    const response = await SongService.CheckSong(req.body);
    if (response.status != "ERR") {
      res.sendFile(`${Id}-${IdUser}.mp3`, {
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
    console.log(req.body);
    console.log(req.files);
    return res.status(200).json({
      status: "Okk",
      message: "add song finished successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "ERR",
      message: "Cant not create song",
    });
  }
};

module.exports = { SendSong, CreateSong };
