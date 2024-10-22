const {
  SV__Get_Role,
  SV__Update_Role,
  SV__Delete_Role,
  SV__Create_Role,
  SV__Get_Role_User,
  SV__Get_Role_Current,
} = require("../Service/Service_Role");

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

const CTL__Get_Role_Current = async (req, res) => {
  try {
    if (!req.Id) {
      return res
        .status(200)
        .json({ status: 404, message: "Not found id user" });
    }
    const respone = await SV__Get_Role_Current(req.Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Role failed" });
  }
};

const CTL__Get_Role_User = async (req, res) => {
  try {
    const type = req.params.type;
    let respone;
    if (type == "admin") {
      respone = await SV__Get_Role_User(type);
    } else {
      respone = await SV__Get_Role_User(type);
    }

    return res.status(200).json(respone);
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
    if (!req.Id) {
      return res.status(200).json({ status: 404, message: "User id is empty" });
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
  CTL__Get_Role_User,
  CTL__Get_Role_Current,
};
