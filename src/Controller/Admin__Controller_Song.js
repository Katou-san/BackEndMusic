const {
  SV__Get_Song,
  SV__Update_Song,
} = require("../Service/Admin__Service_Song");

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

const CTL__Update_Song = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Update_Song(id, req.body);
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
    const respone = await SV__Delete_User(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = { CTL__Get_Song, CTL__Update_Song, CTL__Delete_Song };
