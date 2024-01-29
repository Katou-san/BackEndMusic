const Service_Playlist = require("../Service/Service_Playlist");

const CreatePlaylist = async (req, res) => {
  try {
    const response = await Service_Playlist.CreatePlaylist(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "Can not create song",
    });
  }
};

const UpdatePlaylist = async (req, res) => {
  try {
    const response = await Service_Playlist.UpdatePlaylist(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "Can not update song",
    });
  }
};

const DeletePlaylist = async (req, res) => {
  try {
    const response = await Service_Playlist.DeletePlaylist(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "Can not delete song",
    });
  }
};

module.exports = { CreatePlaylist, UpdatePlaylist, DeletePlaylist };
