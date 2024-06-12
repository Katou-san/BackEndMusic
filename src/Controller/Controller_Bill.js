const {
  SV__Get_Bill,
  SV__Delete_Bill,
  SV__Create_Bill,
} = require("../Service/Service_Bill");

const CTL__Get_Bill = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const respone_id = await SV__Get_Bill(id);
      return res.status(200).json(respone_id);
    } else {
      const respone = await SV__Get_Bill();
      return res.status(200).json(respone);
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Bill failed" });
  }
};

const CTL__Create_Bill = async (req, res) => {
  try {
    const { User_Id, Premium_Id } = req.body;
    if (!User_Id || !Premium_Id) {
      return res
        .status(200)
        .json({ status: 404, message: "Information is missing! " });
    }
    const respone = await SV__Create_Bill(User_Id, Premium_Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Create Bill failed" });
  }
};

const CTL__Delete_Bill = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Delete_Bill(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Bill,
  CTL__Delete_Bill,
  CTL__Create_Bill,
};
