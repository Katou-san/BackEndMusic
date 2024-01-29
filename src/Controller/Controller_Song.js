const Service_Song = require("../Service/Service_Song");
var formidable = require("formidable");
var fs = require("fs");
const path = require("path");
path;
const SendSong = async (req, res) => {
  try {
    const { src } = req.body;
    const response = await Service_Song.CheckSong(req.body);
    if (response.status != "404") {
      res.sendFile(`${src}.mp3`, {
        root: path.join(__dirname, "../SongList/"),
      });
    } else {
      return res.status(404).json({
        status: "404",
        message: "Song not sended",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "Song not sended - err",
    });
  }
};

const GetListSong = async (req, res) => {
  try {
    const respone = await Service_Song.GetAllSong();
    return res.status(200).json(respone);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "cant get all songs",
    });
  }
};

const CreateSong = async (req, res) => {
  try {
    const response = await Service_Song.CreateSong(req.body, req.files);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "Cant not create song",
    });
  }
};

module.exports = { SendSong, CreateSong, GetListSong };
