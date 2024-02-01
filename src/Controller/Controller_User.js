const { User } = require("../Model/User");
const Service_User = require("../Service/Service_User");

const Sign_up_User = async (req, res) => {
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

    const response = await Service_User.Create_User_Service(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      status: 404,
      message: "Create User failed",
    });
  }
};

const Update_User = async (req, res) => {
  try {
    const User_Id = req.User_Id;
    console.log("User_Id: " + User_Id);
    const response = await Service_User.Update_User_Service(User_Id, req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: 404,
      message: "Cant update user",
    });
  }
};

const Delete_User = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        status: 404,
        message: "ID is required",
      });
    }
    const response = await Service_User.Deleta_User_Service(id);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: 404,
      message: "Cant delete user",
    });
  }
};

const Login_User = async (req, res) => {
  try {
    const { User_Email, User_Pass } = req.body;
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
    const response = await Service_User.Check_User_Service(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: 404,
      message: "Cant not Login",
    });
  }
};

const Get_Playlist_User = async (req, res) => {
  try {
    const User_Id = req.User_Id;
    if (!User_Id) {
      return res.status(200).json({
        status: 404,
        message: "Not Found Id",
      });
    }
    const response = await Service_User.Get_Playlist_User_Service(User_Id);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      status: 404,
      message: "Cant get data",
    });
  }
};

module.exports = {
  Sign_up_User,
  Update_User,
  Delete_User,
  Login_User,
  Get_Playlist_User,
};
