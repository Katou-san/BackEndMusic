const PlaylistService = require("../Service/PlaylistService");

const CreatePlaylist = async (req, res) => {
  const { Id, Name, IdUser } = req.body;
  if (!Id || !Name || !IdUser) {
    return res.status(200).json({
      status: "ERR",
      message: "Playlist invalid",
    });
  }

  const response = await PlaylistService.CreatePlaylist(req.body);
  return res.status(200).json(response);
};

const UpdatePlaylist = async (req, res) => {
  const { Id, Name, IdUser } = req.body;
  if (!Id || !Name || !IdUser) {
    return res.status(200).json({
      status: "ERR",
      message: "Playlist invalid",
    });
  }

  const response = await PlaylistService.UpdatePlaylist(Id, req.body);
  return res.status(200).json(response);
};

const DeletePlaylist = async (req, res) => {
  const { Id, IdUser } = req.body;
  if (!Id || !IdUser) {
    return res.status(200).json({
      status: "ERR",
      message: "Playlist invalid",
    });
  }

  const response = await PlaylistService.DeletePlaylist(Id, IdUser);
  return res.status(200).json(response);
};

module.exports = { CreatePlaylist, UpdatePlaylist, DeletePlaylist };
