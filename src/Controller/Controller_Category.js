const {
  SV__Get_Category,
  SV__Update_Category,
  SV__Delete_Category,
  SV__Create_Category,
} = require("../Service/Service_Category");

const CTL__Get_Category = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const respone_id = await SV__Get_Category(id);
      return res.status(200).json(respone_id);
    } else {
      const respone = await SV__Get_Category(null);
      return res.status(200).json(respone);
    }
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Get Category failed" });
  }
};

const CTL__Create_Category = async (req, res) => {
  try {
    const { Category_Name } = req.body;
    if (!Category_Name) {
      return res
        .status(200)
        .json({ status: 404, message: "id or name for category is empty" });
    }
    const respone = await SV__Create_Category(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Category failed" });
  }
};

const CTL__Update_Category = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Update_Category(id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Update Category failed" });
  }
};

const CTL__Delete_Category = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Delete_Category(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Category,
  CTL__Update_Category,
  CTL__Delete_Category,
  CTL__Create_Category,
};
