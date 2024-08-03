const {
  SV__Get_Partner,
  SV__Update_Partner,
  SV__Delete_Partner,
  SV__Create_Partner,
  SV__Find_Partner,
} = require("../Service/Service_Partner");

const CTL__Get_Partner = async (req, res) => {
  try {
    const id = req.params.id;
    const respone_id = await SV__Get_Partner(id);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Partner failed" });
  }
};

const CTL__Find_Partner = async (req, res) => {
  try {
    const name = req.params.name;
    const respone_id = await SV__Find_Partner(name);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Partner failed" });
  }
};

const CTL__Create_Partner = async (req, res) => {
  try {
    const { Partner_Name, Phone, Logo, Contract_num, Status } = req.body;
    if (!Partner_Name || !Phone || !Logo || !Contract_num || !Status) {
      return res.status(200).json({
        status: 404,
        message: "Information is missing!",
        error: { parner: "Information is missing!" },
        data: {},
      });
    }

    const respone = await SV__Create_Partner(req.Id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Partner failed" });
  }
};

const CTL__Update_Partner = async (req, res) => {
  try {
    const Partner_Id = req.params.id;
    if (!Partner_Id) {
      return res.status(200).json({
        status: 404,
        message: "Not found Id!",
        error: { parner: "Not found Id!" },
        data: {},
      });
    }
    const respone = await SV__Update_Partner(Partner_Id, req.Id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Update Partner failed" });
  }
};

const CTL__Delete_Partner = async (req, res) => {
  try {
    const Partner_Id = req.params.id;
    if (!Partner_Id) {
      return res.status(200).json({
        status: 404,
        message: "Not found Id!",
        error: { parner: "Not found Id!" },
        data: {},
      });
    }
    const respone = await SV__Delete_Partner(Partner_Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Partner,
  CTL__Find_Partner,
  CTL__Create_Partner,
  CTL__Update_Partner,
  CTL__Delete_Partner,
};
