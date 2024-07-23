const {
  SV__Get_Follow,
  SV__Delete_Follow,
  SV__Create_Follow,
  SV__Get_Follow_Current,
} = require("../Service/Service_Follow");

const CTL__Get_Follow = async (req, res) => {
  try {
    const Id = req.params.id;
    if (!Id) {
      return res.status(200).json({
        status: 404,
        message: "Infomation is missing!",
        error: {
          Follower: "Infomation is missing!",
        },
        data: {},
      });
    }
    const respone_id = await SV__Get_Follow(Id);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Follow failed" });
  }
};

const CTL__Get_Follow_Current = async (req, res) => {
  try {
    const Id = req.params.id;
    if (!Id && !req.Id) {
      return res.status(200).json({
        status: 404,
        message: "Infomation is missing!",
        error: {
          Follower: "Infomation is missing!",
        },
        data: {},
      });
    }
    const respone_id = await SV__Get_Follow_Current(req.Id, Id);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Follow failed" });
  }
};

const CTL__Create_Follow = async (req, res) => {
  try {
    const { Following } = req.body;

    if (!Following || !req.Id) {
      return res
        .status(200)
        .json({ status: 404, message: "Name for Follow is empty" });
    }
    const respone = await SV__Create_Follow(Following, req.Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Follow failed" });
  }
};

const CTL__Delete_Follow = async (req, res) => {
  try {
    const Following = req.params.id;
    if (!Following || !req.Id) {
      return res.status(200).json({ status: 404, message: "Id is empty" });
    }
    const respone = await SV__Delete_Follow(req.Id, Following);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Unfollow failed! " });
  }
};

module.exports = {
  CTL__Get_Follow,
  CTL__Create_Follow,
  CTL__Delete_Follow,
  CTL__Get_Follow_Current,
};
