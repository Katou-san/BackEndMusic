const {
  SV__Get_Playlist,
  SV__Update_Playlist,
  SV__Delete_Playlist,
  SV__Create_Playlist,
} = require("../Service/Service_Playlist");

const CTL__Get_Playlist = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const respone_id = await SV__Get_Playlist(id);
      return res.status(200).json(respone_id);
    } else {
      const respone = await SV__Get_Playlist(null);
      return res.status(200).json(respone);
    }
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Get Playlist failed" });
  }
};

const CTL__Create_Playlist = async (req, res) => {
  try {
    const { Playlist_Name } = req.body;

    if (!Playlist_Name || !req.Id) {
      return res.status(404).json({ status: 404, message: "Input is Empty" });
    }

    console.log(req.body);

    const respone = await SV__Create_Playlist(req.Id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Playlist failed" });
  }
};

const CTL__Update_Playlist = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Update_Playlist(id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Update Playlist failed" });
  }
};

const CTL__Delete_Playlist = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Delete_Playlist(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete playlist failed " });
  }
};

module.exports = {
  CTL__Get_Playlist,
  CTL__Update_Playlist,
  CTL__Delete_Playlist,
  CTL__Create_Playlist,
};
