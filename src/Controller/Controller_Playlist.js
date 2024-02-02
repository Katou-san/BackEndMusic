const Service_Playlist = require("../Service/Service_Playlist");

const Create_Playlist = async (req, res) => {
  try {
    const response = await Service_Playlist.Create_Playlist_Service(req.body);
    return res.status(200).json({
      status: 200,
      message: "Playlist created successfully",
      data: response,
    });
  } catch (err) {
    return res.status(404).json({
      status: "404",
      message: "Can not create Playlist",
    });
  }
};

const Update_Playlist = async (req, res) => {
  const User_Id = req.User_Id;
  const Playlist_Id = req.params.id;
  console.log(Playlist_Id);
  try {
    const response = await Service_Playlist.Update_Playlist_Service(
      User_Id,
      Playlist_Id,
      req.body
    );
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

const Get_Playlist = async (req, res) => {
  try {
    const Playlist_Id = req.params.id;
    if (!Playlist_Id) {
      return res.status(404).json({ status: "404", message: "Cant get " });
    }
    const response = await Service_Playlist.Get_Playlist_Service(Playlist_Id);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "Can not delete song",
    });
  }
};

module.exports = {
  Create_Playlist,
  Update_Playlist,
  Delete_Playlist,
  Get_Playlist,
};
