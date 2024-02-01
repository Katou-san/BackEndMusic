const Service_Song = require("../Service/Service_Song");
var formidable = require("formidable");
var fs = require("fs");
const path = require("path");

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

const Create_Song = async (req, res) => {
  try {
    const response = await Service_Song.Create_Song_Service(
      req.body,
      req.files
    );
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "Cant not create song",
    });
  }
};

const Get_Song = async (req, res) => {
  try {
    const Song_Id = req.params.Song_Id;
    const response = await Service_Song.Get_Song_Serice(Song_Id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      status: "404",
      message: "Cant found song",
    });
  }
};

module.exports = { Create_Song, GetListSong, Get_Song };
