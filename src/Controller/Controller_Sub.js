const {
  SV__Get_Subscription,
  SV__Update_Subscription,
  SV__Delete_Subscription,
  SV__Create_Subscription,
} = require("../Service/Service_Sub");

const CTL__Get_Subscription = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const respone_id = await SV__Get_Subscription(id);
      return res.status(200).json(respone_id);
    } else {
      const respone = await SV__Get_Subscription();
      return res.status(200).json(respone);
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Premium failed" });
  }
};

const CTL__Create_Subscription = async (req, res) => {
  try {
    const { Sub_Title, Price, Content, Duration, Storage } = req.body;
    if (!Sub_Title || !Price || !Content || !Duration || !Storage) {
      return res
        .status(200)
        .json({ status: 404, message: "Infonmation is missing!" });
    }
    const respone = await SV__Create_Subscription(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create subscription failed" });
  }
};

const CTL__Update_Subscription = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Update_Subscription(id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Update Premium failed" });
  }
};

const CTL__Delete_Subscription = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "Id is empty" });
    }
    const respone = await SV__Delete_Subscription(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Subscription,
  CTL__Create_Subscription,
  CTL__Update_Subscription,
  CTL__Delete_Subscription,
};
