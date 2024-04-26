const {
  SV__Get_Employess,
  SV__Update_Employess,
  SV__Delete_Employess,
  SV__Create_Employess,
  SV__Login_Employess,
} = require("../Service/Admin__Service_Employess");
const { Validate_Employess } = require("../Util/Validate");

const CTL__Get_Employess = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const respone_id = await SV__Get_Employess(id);
      return res.status(200).json(respone_id);
    } else {
      const respone = await SV__Get_Employess(null);
      return res.status(200).json(respone);
    }
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Get Employess failed" });
  }
};

const CTL__Login_Employess = async (req, res) => {
  try {
    const { Employess_Email, Employess_Pass } = req.body;
    if (!Employess_Email || !Employess_Pass) {
      return res
        .status(200)
        .json({ status: 404, message: "email or pass is empty" });
    }

    const respone = await SV__Login_Employess(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Get Employess failed" });
  }
};

const CTL__Create_Employess = async (req, res) => {
  try {
    const { Employess_Email, Employess_Name, Employess_Pass } = req.body;
    if (!Employess_Email || !Employess_Name || !Employess_Pass) {
      return req
        .status(200)
        .json({ status: 404, message: "Email or name for Employess is empty" });
    }

    const result_Validate = Validate_Employess(
      Employess_Email,
      Employess_Name,
      Employess_Pass
    );
    if (result_Validate.status) {
      return req.status(200).json({
        status: 404,
        message: "Error validate!",
        error: result_Validate.Error,
      });
    }
    const respone = await SV__Create_Employess(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Employess failed" });
  }
};

const CTL__Update_Employess = async (req, res) => {
  try {
    const { Employess_Id } = req.body;
    if (!Employess_Id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Update_Employess(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Update Employess failed" });
  }
};

const CTL__Delete_Employess = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Delete_Employess(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Employess,
  CTL__Update_Employess,
  CTL__Delete_Employess,
  CTL__Create_Employess,
  CTL__Login_Employess,
};
