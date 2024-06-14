const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const { CTL__Get_Premium } = require("../../Controller/Controller_Premium");

//TODO localhost:8080/api/admin/v1/premium
Router.get("/premium", CTL__Get_Premium);
Router.get("/premium/:id", CTL__Get_Premium);

module.exports = Router;
