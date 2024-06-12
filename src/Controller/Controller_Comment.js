const {
  SV__Get_Comment,
  SV__Update_Comment,
  SV__Create_Comment,
  SV__Delete_Comment,
} = require("../Service/Service_Comment");

const CTL__Get_Comment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        status: 404,
        message: "Infomation is missing a comment",
      });
    }
    const respone_id = await SV__Get_Comment(id);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Comment failed" });
  }
};

const CTL__Create_Comment = async (req, res) => {
  try {
    const { Song_Id, Content } = req.body;
    if (!Song_Id || !User_Id || !Content) {
      return res
        .status(404)
        .json({ status: 404, message: "Not found id user" });
    }
    const respone = await SV__Create_Comment(req.body, req.Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Comment failed" });
  }
};

const CTL__Update_Comment = async (req, res) => {
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
    const respone = await SV__Update_Comment(id, req.body, req.Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Update Comment failed" });
  }
};

const CTL__Delete_Comment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Delete_Comment(id, req.Id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Comment,
  CTL__Update_Comment,
  CTL__Delete_Comment,
  CTL__Create_Comment,
};
