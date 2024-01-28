const UserService = require("../Service/UseService");

const CreateUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    // console.log(req.body);
    if (!Email) {
      return res.status(200).json({
        status: "ERR",
        message: "Email is required",
      });
    }

    if (!Password) {
      return res.status(200).json({
        status: "ERR",
        message: "Pass is required",
      });
    }
    const response = await UserService.CreateUser(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "ERR",
      message: "Cant not create user",
    });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "ID is required",
      });
    }
    const response = await UserService.UpdateUser(id, req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "ERR",
      message: "Cant update user",
    });
  }
};

const DeletaUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "ID is required",
      });
    }
    const response = await UserService.DeletaUser(id);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "ERR",
      message: "Cant delete user",
    });
  }
};

const CheckUser = async (req, res) => {
  try {
    const { Email, Pass } = req.body;
    if (!Email) {
      return res.status(200).json({
        status: "ERR",
        message: "Email is required",
      });
    }

    if (!Pass) {
      return res.status(200).json({
        status: "ERR",
        message: "Pass is required",
      });
    }
    const response = await UserService.CheckUser(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "ERR",
      message: "Cant not create user",
    });
  }
};

module.exports = { CreateUser, UpdateUser, DeletaUser, CheckUser };

// User = {
//   User_Id: "",
//   User_Email: "",
//   User_Pass: "",
//   User_Name: "",
//   User_Color: "",
//   Background:""
//   Avatar: "",
//   Number_Phone: "",
//   Follower: "",
//   Following: "",
//   Playlist: "",
//   List_Add_Songs: "",
//   List_Like_Song: "",
//   Rule:""
//   is_Premium: "",
// };
