const {
  SV__Get_Playlist,
  SV__Update_Playlist,
  SV__Delete_Playlist,
  SV__Create_Playlist,
  SV__Get_PlaylistM,
  SV__Get_PlaylistDF,
} = require("../Service/Service_Playlist");

const CTL__Get_Playlist = async (req, res) => {
  try {
    const id = req.params.id;
    const type = req.params.type;
    if (id) {
      const respone_id = await SV__Get_Playlist(type ? type : 1, id);
      return res.status(200).json(respone_id);
    } else {
      const respone = await SV__Get_Playlist(type ? type : 1, null);
      return res.status(200).json(respone);
    }
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Get Playlist failed" });
  }
};

const CTL__Get_PlaylistM = async (req, res) => {
  try {
    const by = req.params.by;
    const type = req.params.type;
    if (by) {
      if (
        String(by).toLowerCase() != "user" &&
        String(by).toLowerCase() != "admin"
      ) {
        return res.status(200).json({
          status: 404,
          message: `${by} not supported`,
          error: { Playlist_Manage: `${by} not supported` },
        });
      }
      const respone = await SV__Get_PlaylistM(
        String(by).toLowerCase(),
        type ?? 1
      );
      return res.status(200).json(respone);
    } else {
      return res.status(200).json({
        status: 404,
        message: "Invalid by",
        error: { Song_Manage: "Invalid by" },
      });
    }
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Get song manage failed" });
  }
};

const CTL__Get_PlaylistDF = async (req, res) => {
  try {
    const type = req.params.type;
    if (!req.Id) {
      return res.status(200).json({
        status: 404,
        message: `Not found id user`,
        error: { Get_Playlist: `Not found id user` },
      });
    }

    if (!type) {
      return res.status(200).json({
        status: 404,
        message: `Not found type playlist`,
        error: { Get_Playlist: `Not found type playlist` },
      });
    }

    const respone = await SV__Get_PlaylistDF(req.Id, type);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Get song manage failed" });
  }
};

const CTL__Create_Playlist = async (req, res) => {
  try {
    const { Playlist_Name } = req.body;

    if (!Playlist_Name || !req.Id) {
      return res.status(404).json({ status: 404, message: "Input is Empty" });
    }

    const respone = await SV__Create_Playlist(req.Id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Fail Playlist failed" });
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
  CTL__Get_PlaylistM,
  CTL__Get_PlaylistDF,
};
