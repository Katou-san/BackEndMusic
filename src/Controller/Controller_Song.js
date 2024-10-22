const path = require("path");
const { SV__Create_Audio_FP } = require("../Service/Service_AudioFP");
const {
  SV__Get_Song,
  SV__Update_Song,
  SV__Create_Song,
  SV__Delete_Song,
  SV__Get_SongM,
  SV__Delete_Song_Admin,
  SV__Update_Song_Admin,
  SV__Check_Delete_Song,
  SV__Check_Delete_Song_Admin,
} = require("../Service/Service_Song");

const CTL__Get_Song = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const respone_id = await SV__Get_Song(id);
      return res.status(200).json(respone_id);
    } else {
      const respone = await SV__Get_Song(null);
      return res.status(200).json(respone);
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get song failed" });
  }
};

const CTL__Get_SongM = async (req, res) => {
  try {
    const type = req.params.type;
    if (type) {
      if (
        String(type).toLowerCase() != "user" &&
        String(type).toLowerCase() != "admin"
      ) {
        return res.status(200).json({
          status: 404,
          message: "Type not supported",
          error: { Song_Manage: "Type not supported" },
        });
      }
      const respone = await SV__Get_SongM(String(type).toLowerCase());
      return res.status(200).json(respone);
    } else {
      return res.status(200).json({
        status: 404,
        message: "Invalid type",
        error: { Song_Manage: "Invalid type" },
      });
    }
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Get song manage failed" });
  }
};

const CTL__Create_Song = async (req, res) => {
  try {
    const { Song_Name, Song_Audio, Category_Id, Artist } = req.body;
    if (!req.Id) {
      return res
        .status(404)
        .json({ status: 404, message: "Not found id user" });
    }

    if (!Song_Name || !Song_Audio || !Category_Id || !Artist) {
      return res.status(404).json({ status: 404, message: "Input is Empty" });
    }
    const respone = await SV__Create_Song(req.body, req.Id);

    //===============tao fp============
    if (respone.status == 200) {
      const file = path.join(__dirname, `../Assets/Song_Audio/${Song_Audio}`);
      await SV__Create_Audio_FP(file, respone.data.Song_Id);
    }

    //=================================

    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Create song failed" });
  }
};

const CTL__Check_Song_Delete = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    if (!req.Id) {
      return res
        .status(404)
        .json({ status: 404, message: "Not found id user" });
    }
    const respone = await SV__Check_Delete_Song(id, req.Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete song failed " });
  }
};

const CTL__Update_Song = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.Id) {
      return res
        .status(404)
        .json({ status: 404, message: "Not found id user" });
    }
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Update_Song(id, req.body, req.Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Update Song failed" });
  }
};

const CTL__Delete_Song = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }

    if (!req.Id) {
      return res
        .status(404)
        .json({ status: 404, message: "Not found id user" });
    }
    const respone = await SV__Delete_Song(id, req.Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete song failed " });
  }
};

const CTL__Check_Song_Delete_Admin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    if (!req.Id) {
      return res
        .status(404)
        .json({ status: 404, message: "Not found id user" });
    }
    const respone = await SV__Check_Delete_Song_Admin(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Not found song " });
  }
};

const CTL__Delete_Song_Admin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    if (!req.Id) {
      return res
        .status(404)
        .json({ status: 404, message: "Not found id user" });
    }
    const respone = await SV__Delete_Song_Admin(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete song failed " });
  }
};

const CTL__Update_Song_Admin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.Id) {
      return res
        .status(404)
        .json({ status: 404, message: "Not found id user" });
    }
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Update_Song_Admin(id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Update Song failed" });
  }
};

module.exports = {
  CTL__Get_Song,
  CTL__Update_Song,
  CTL__Delete_Song,
  CTL__Create_Song,
  CTL__Get_SongM,
  CTL__Delete_Song_Admin,
  CTL__Update_Song_Admin,
  CTL__Check_Song_Delete,
  CTL__Check_Song_Delete_Admin,
};
