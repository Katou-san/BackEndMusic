const {
  SV__Get_Repost,
  SV__Update_Repost,
  SV__Delete_Repost,
  SV__Create_Repost,
} = require("../Service/Service_Repost");

const CTL__Get_Repost = async (req, res) => {
  try {
    const respone_id = await SV__Get_Repost(req.Id);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Repost failed" });
  }
};

const CTL__Create_Repost = async (req, res) => {
  try {
    const { Repost_Name } = req.body;
    if (!Repost_Name) {
      return res
        .status(200)
        .json({ status: 404, message: "id or name for Repost is empty" });
    }
    const respone = await SV__Create_Repost(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Repost failed" });
  }
};

const CTL__Delete_Repost = async (req, res) => {
  try {
    const Repost_id = req.params.id;
    if (!Repost_id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Delete_Repost(req.Id, Repost_id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Repost,
  CTL__Update_Repost,
  CTL__Delete_Repost,
  CTL__Create_Repost,
};
