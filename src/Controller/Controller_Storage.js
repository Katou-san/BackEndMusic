const {
  SV__Get_Storage,
  SV__Update_Storage,
  SV__Update_Storage_Premium,
  SV__Delete_Storage,
  SV__Create_Storage,
} = require("../Service/Service_Storage");

const CTL__Get_Storage = async (req, res) => {
  try {
    const User_Id = req.params.id;
    if (User_Id) {
      const respone_id = await SV__Get_Storage(User_Id);
      return res.status(200).json(respone_id);
    }
    if (!req.Id) {
      return res.status(200).json({
        status: 404,
        message: "Not found storage for user",
      });
    }
    const respone_id = await SV__Get_Storage(req.Id);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Storage failed" });
  }
};

const CTL__Create_Storage = async (req, res) => {
  try {
    const { User_Id } = req.body;
    if (!User_Id) {
      return res
        .status(200)
        .json({ status: 404, message: "Infomation is emty" });
    }
    const respone = await SV__Create_Storage(User_Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Storage failed" });
  }
};

const CTL__Update_Storage = async (req, res) => {
  try {
    if (!req.Id) {
      return res
        .status(200)
        .json({ status: 404, message: "Infomation is emty" });
    }
    const respone = await SV__Update_Storage(req.Id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Storage failed" });
  }
};

const CTL__Update_Storage_Premium = async (req, res) => {
  try {
    const Premium_Id = req.body;
    if (!req.Id || !Premium_Id) {
      return res
        .status(200)
        .json({ status: 404, message: "Infomation is emty" });
    }
    const respone = await SV__Update_Storage_Premium(req.Id, Premium_Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Storage failed" });
  }
};

const CTL__Delete_Storage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "Id is empty" });
    }
    const respone = await SV__Delete_Storage(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Storage,
  CTL__Create_Storage,
  CTL__Update_Storage,
  CTL__Update_Storage_Premium,
  CTL__Delete_Storage,
};
