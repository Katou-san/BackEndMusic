const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");

const User_Service = require("../../Service/Service_User");
const express = require("express");
const Router = express.Router();

Router.get("/IsUserAuth", JWT_Verify_Token, async (req, res) => {
  try {
    const Respone = await User_Service.Check_Token_User_Service(req.User_Email);
    res.send(Respone);
  } catch (err) {
    res.send(err);
  }
});

module.exports = Router;