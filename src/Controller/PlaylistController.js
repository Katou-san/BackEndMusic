const PlaylistService = require("../Service/PlaylistService");

const CreatePlaylist = async (req, res) => {
  const { Playlist_Id, Playlist_Name, User_Id } = req.body;
  if (!Playlist_Id || !Playlist_Name || !User_Id) {
    return res.status(200).json({
      status: "404",
      message: "Playlist invalid",
    });
  }

  const response = await PlaylistService.CreatePlaylist(req.body);
  return res.status(200).json(response);
};

const UpdatePlaylist = async (req, res) => {
  const { Playlist_Id, Playlist_Name, User_Id } = req.body;
  if (!Playlist_Id || !Playlist_Name || !User_Id) {
    return res.status(200).json({
      status: "404",
      message: "Playlist invalid",
    });
  }

  const response = await PlaylistService.UpdatePlaylist(Playlist_Id, req.body);
  return res.status(200).json(response);
};

const DeletePlaylist = async (req, res) => {
  const { Playlist_Id, User_Id } = req.body;
  if (!Playlist_Id || !User_Id) {
    return res.status(200).json({
      status: "404",
      message: "Playlist invalid",
    });
  }

  const response = await PlaylistService.DeletePlaylist(Playlist_Id, req.body);
  return res.status(200).json(response);
};

module.exports = { CreatePlaylist, UpdatePlaylist, DeletePlaylist };
