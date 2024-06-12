const {
  SV__Get_Premium,
  SV__Update_Premium,
  SV__Delete_Premium,
  SV__Create_Premium,
} = require("../Service/Service_Premium");

const CTL__Get_Premium = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const respone_id = await SV__Get_Premium(id);
      return res.status(200).json(respone_id);
    } else {
      const respone = await SV__Get_Premium();
      return res.status(200).json(respone);
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Premium failed" });
  }
};

const CTL__Create_Premium = async (req, res) => {
  try {
    const { Premium_Title, Price, Content, Duration } = req.body;
    if (!Premium_Title || !Price || !Content || !Duration) {
      return res
        .status(200)
        .json({ status: 404, message: "Infonmation is missing!" });
    }
    const respone = await SV__Create_Premium(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Premium failed" });
  }
};

const CTL__Update_Premium = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Update_Premium(id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Update Premium failed" });
  }
};

const CTL__Delete_Premium = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "Id is empty" });
    }
    const respone = await SV__Delete_Premium(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Premium,
  CTL__Create_Premium,
  CTL__Update_Premium,
  CTL__Delete_Premium,
};
