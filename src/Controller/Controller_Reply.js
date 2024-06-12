const {
  SV__Get_Reply,
  SV__Update_Reply,
  SV__Create_Reply,
  SV__Delete_Reply,
} = require("../Service/Service_Reply");

const CTL__Get_Reply = async (req, res) => {
  try {
    const Comment_Id = req.params.id;
    if (!Comment_Id) {
      return res.status(200).json({
        status: 404,
        message: "Infomation is missing a Reply",
      });
    }
    const respone_id = await SV__Get_Reply(Comment_Id);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Reply failed" });
  }
};

const CTL__Create_Reply = async (req, res) => {
  try {
    const { Comment_Id, Content } = req.body;
    if (!Comment_Id || !req.Id || !Content) {
      return res
        .status(404)
        .json({ status: 404, message: "Not found id user" });
    }
    const respone = await SV__Create_Reply(req.body, req.Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Reply failed" });
  }
};

const CTL__Update_Reply = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.Id) {
      return res
        .status(404)
        .json({ status: 404, message: "Not found id user" });
    }
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Update_Reply(id, req.body, req.Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Update Reply failed" });
  }
};

const CTL__Delete_Reply = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Delete_Reply(id, req.Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Reply,
  CTL__Update_Reply,
  CTL__Delete_Reply,
  CTL__Create_Reply,
};
