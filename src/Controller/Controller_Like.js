const {
  SV__Get_Like,
  SV__Update_Like,
  SV__Delete_Like,
  SV__Create_Like,
} = require("../Service/Service_Like");

const CTL__Get_Like = async (req, res) => {
  try {
    const Topic_Id = req.params.id;
    const Type = req.params.type;
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
    if (!Topic_Id || !Type || !State) {
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
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Update_Like(id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Update Like failed" });
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
