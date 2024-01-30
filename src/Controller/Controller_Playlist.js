const Service_Playlist = require("../Service/Service_Playlist");

const Create_Playlist = async (req, res) => {
  try {
    const response = await Service_Playlist.Create_Playlist_Service(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "Can not create song",
    });
  }
};

const Update_Playlist = async (req, res) => {
  try {
    const response = await Service_Playlist.Update_Playlist_Service(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "Can not update song",
    });
  }
};

const Delete_Playlist = async (req, res) => {
  try {
    const response = await Service_Playlist.Delete_Playlist_Service(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "Can not delete song",
    });
  }
};

module.exports = { Create_Playlist, Update_Playlist, Delete_Playlist };
