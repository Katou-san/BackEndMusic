const { User } = require("../Model/User");
const Service_User = require("../Service/Service_User");

const CreateUser = async (req, res) => {
  try {
    const { User_Id, User_Email, User_Pass, User_Name } = req.body;

    if (!User_Email) {
      return res.status(200).json({
        status: 404,
        message: "Email is required",
      });
    }

    if (!User_Pass && User_Pass.length >= 4) {
      return res.status(200).json({
        status: 404,
        message: "Pass is required",
      });
    }

    if (!User_Id && !User_Name) {
      return res.status(200).json({
        status: 404,
        message: "Id or Username is emty",
      });
    }

    const response = await Service_User.CreateUser(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      status: 404,
      message: "Create User failed",
    });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        status: 404,
        message: "ID is required",
      });
    }
    const response = await Service_User.UpdateUser(id, req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: 404,
      message: "Cant update user",
    });
  }
};

const DeletaUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        status: 404,
        message: "ID is required",
      });
    }
    const response = await Service_User.DeletaUser(id);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: 404,
      message: "Cant delete user",
    });
  }
};

const CheckUser = async (req, res) => {
  try {
    const { User_Email, User_Pass } = req.body;
    console.log(req.body);
    if (!User_Email) {
      return res.status(200).json({
        status: 404,
        message: "Email is required",
      });
    }

    if (!User_Pass) {
      return res.status(200).json({
        status: 404,
        message: "Pass is required",
      });
    }
    const response = await Service_User.CheckUser(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: 404,
      message: "Cant not create user",
    });
  }
};

module.exports = { CreateUser, UpdateUser, DeletaUser, CheckUser };
