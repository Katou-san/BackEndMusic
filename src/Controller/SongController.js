const SongService = require("../Service/SongService");
var formidable = require("formidable");
var fs = require("fs");
const path = require("path");
path;
const SendSong = async (req, res) => {
  try {
    const { src } = req.body;
    const response = await SongService.CheckSong(req.body);
    if (response.status != "ERR") {
      res.sendFile(`${src}.mp3`, {
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

const GetListSong = async (req, res) => {
  try {
    const respone = await SongService.GetAllSong();
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "ERR",
      message: "cant get all songs",
    });
  }
};

const CreateSong = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.files);
    const { NameSong, PostTime, Category, IdUser } = req.body;
    const response = await SongService.CreateSong(req.body, req.files);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "ERR",
      message: "Cant not create song",
    });
  }
};

module.exports = { SendSong, CreateSong, GetListSong };
