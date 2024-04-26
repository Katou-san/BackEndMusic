const {
  SV__Get_Role,
  SV__Update_Role,
  SV__Delete_Role,
  SV__Create_Role,
} = require("../Service/Admin__Service_Role");

const CTL__Get_Role = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const respone_id = await SV__Get_Role(id);
      return res.status(200).json(respone_id);
    } else {
      const respone = await SV__Get_Role(null);
      return res.status(200).json(respone);
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Role failed" });
  }
};

const CTL__Create_Role = async (req, res) => {
  try {
    const { Role_Name } = req.body;
    if (!Role_Name) {
      return res
        .status(200)
        .json({ status: 404, message: "Name for role is empty" });
    }
    const respone = await SV__Create_Role(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Create Role failed" });
  }
};

const CTL__Update_Role = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Update_Role(id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Update Role failed" });
  }
};

const CTL__Delete_Role = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "Id is empty" });
    }
    const respone = await SV__Delete_Role(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Role,
  CTL__Create_Role,
  CTL__Update_Role,
  CTL__Delete_Role,
};
