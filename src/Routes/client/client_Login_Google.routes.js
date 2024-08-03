const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const { CTL__Login_Google } = require("../../Controller/Controller_Google");

const Router = express.Router();

Router.post("/user/login-google", CTL__Login_Google);

module.exports = Router;
