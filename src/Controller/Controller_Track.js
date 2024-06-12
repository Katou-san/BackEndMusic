const {
  SV__Get_Track,
  SV__Delete_Track,
  SV__Create_Track,
} = require("../Service/Service_Track");

const CTL__Get_Track = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      return res.status(200).json({
        status: 404,
        message: "Id playlist is emty",
      });
    }
    const respone_id = await SV__Get_Track(id);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Track failed" });
  }
};

const CTL__Create_Track = async (req, res) => {
  try {
    const { Playlist_Id, Song_Id } = req.body;
    if (!Playlist_Id || !Song_Id) {
      return res
        .status(200)
        .json({ status: 404, message: "Infomation is emty" });
    }
    const respone = await SV__Create_Track(req.Id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Track failed" });
  }
};

const CTL__Delete_Track = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "Id is empty" });
    }
    const respone = await SV__Delete_Track(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Track,
  CTL__Create_Track,
  CTL__Update_Track,
  CTL__Delete_Track,
};
