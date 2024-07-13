const {
  SV__Get_Like,
  SV__Update_Like,
  SV__Delete_Like,
  SV__Create_Like,
} = require("../Service/Service_Like");

const CTL__Get_Like = async (req, res) => {
  try {
    const Topic_Id = req.params.topic;
    const Type = req.params.type;
    if (req.Id) {
      const respone_id = await SV__Get_Like(Topic_Id, Type, req.Id);
      return res.status(200).json(respone_id);
    }
    const respone_id = await SV__Get_Like(Topic_Id, Type);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Like failed" });
  }
};

const CTL__Create_Like = async (req, res) => {
  try {
    const { Topic_Id, Type, State } = req.body;
    if (!Topic_Id || Type == undefined || State == undefined) {
      return res.status(200).json({ status: 404, message: "Cant like" });
    }
    const respone = await SV__Create_Like(req.Id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: " Like failed" });
  }
};

const CTL__Update_Like = async (req, res) => {
  try {
    const { Type, Topic_Id, State } = req.body;
    if (!Topic_Id || Type == null || State == null) {
      return res
        .status(200)
        .json({ status: 404, message: "Cant update state" });
    }
    const respone = await SV__Update_Like(Topic_Id, req.Id, Type, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Update like failed" });
  }
};

const CTL__Delete_Like = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "Id is empty" });
    }
    const respone = await SV__Delete_Like(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Like,
  CTL__Create_Like,
  CTL__Update_Like,
  CTL__Delete_Like,
};
