const {
  SV__Update_User,
  SV__Delete_User,
  SV__Get_User,
  SV__Create_User,
  SV__Login_User,
  SV__Oauth,
} = require("../Service/Service_User");
const { Validate_Login, Validate_SignUp } = require("../Util/Validate");

// TODO: done!
const CTL__Get_User = async (req, res) => {
  try {
    const id = req.params.id;
    const type = req.params.type;
    if (type) {
      if (type != "email" && type != "id") {
        return res.status(200).json({
          status: 404,
          message: "Invalid type",
          error: {
            User: "Invalid type",
          },
          data: {},
        });
      } else {
        if (id) {
          const respone_id = await SV__Get_User(id, type);
          return res.status(200).json(respone_id);
        } else {
          return res.status(200).json({
            status: 404,
            message: "Invalid id",
            error: {
              User: "Invalid id",
            },
            data: {},
          });
        }
      }
    } else {
      const respone = await SV__Get_User(null, null);
      return res.status(200).json(respone);
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get user failed" });
  }
};
// TODO: Done!
const CTL__Create_User = async (req, res) => {
  try {
    const { User_Email, User_Name, User_Pass, User_ConfirmPass } = req.body;
    const Result_Validate = Validate_SignUp(
      User_Email,
      User_Name,
      User_Pass,
      User_ConfirmPass
    );

    if (!User_Email || !User_Name || !User_ConfirmPass || !User_Pass) {
      return res.status(200).json({
        status: 404,
        message: "Input null!",
        Error: {
          email: !User_Email ? "null" : "not null",
          name: !User_Name ? "null" : "not null",
          pass: !User_Pass ? "null" : "not null",
          confiPass: !User_ConfirmPass ? "null" : "not null",
        },
      });
    }
    if (Result_Validate.status) {
      return res.status(200).json({
        status: 404,
        message: "Error Validate!",
        Error: Result_Validate.Error,
      });
    }

    const respone = await SV__Create_User(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Create user failed" });
  }
};

// TODO: done!
const CTL__Login_User = async (req, res) => {
  try {
    const { User_Email, User_Pass } = req.body;
    console.log(User_Email);
    if (!User_Email) {
      return res.status(200).json({
        status: 404,
        message: "Email is null",
        error: { email: "Email is null" },
      });
    }

    if (!User_Pass) {
      return res.status(200).json({
        status: 404,
        message: "Pass is null",
        error: { pass: "Pass is null" },
      });
    }

    if (Validate_Login(User_Email, User_Pass).status) {
      return res.status(200).json({
        status: 404,
        message: "Somthing wrong!",
        error: Validate_Login(User_Email, User_Pass).Error,
      });
    }

    const respone = await SV__Login_User(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    // new Error(e.message);
    return res.status(404).json({ status: 404, message: "Login failed" });
  }
};

const CTL__Oauth = async (req, res) => {
  try {
    if (!req.Id || !req.Email || !req.Role) {
      return res
        .status(200)
        .json({ status: 404, message: "Oauth missing data" });
    }
    const respone = await SV__Oauth(req.Id, req.Email, req.Role);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(404).json({ status: 404, message: "Oauth failed" });
  }
};

//! TODO: NEED UPDATE
const CTL__Update_User = async (req, res) => {
  try {
    const { User_Email } = req.body;
    console.log(res.body);
    if (!User_Email) {
      return res.status(200).json({ status: 404, message: "Id is empty" });
    }

    const respone = await SV__Update_User(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Update user failed" });
  }
};

//! TODO: NEED UPDATE
const CTL__Delete_User = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Delete_User(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_User,
  CTL__Create_User,
  CTL__Update_User,
  CTL__Delete_User,
  CTL__Login_User,
  CTL__Oauth,
};
