const User_Service = require("../Service/Service_User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const express = require("express");
const Router = express.Router();

dotenv.config();
const JWT_Verify = (req, res, next) => {
  let Token = req.headers["x-access-token"];
  if (Token) {
    jwt.verify(Token, process.env.PRIVATE_KEY_JWT, (err, decoded) => {
      if (err) {
        res.send({
          is_Login: false,
          Access_Token: "",
          Data_User: {
            User_Id: "",
            User_Name: "",
            Avatar: "",
          },
        });
      } else {
        req.User_Id = decoded.User_Id;
        req.User_Email = decoded.User_Email;
        next();
      }
    });
  } else {
    res.send({
      is_Login: false,
      Access_Token: "",
      Data_User: {
        User_Id: "",
        User_Name: "",
        Avatar: "",
      },
    });
  }
};

Router.get("/IsUserAuth", JWT_Verify, async (req, res) => {
  try {
    const Respone = await User_Service.Check_Token_User_Service(req.User_Email);
    res.send(Respone);
  } catch (err) {
    res.send(err);
  }
});

module.exports = Router;
