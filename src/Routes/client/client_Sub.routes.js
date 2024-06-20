const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const { CTL__Get_Subscription } = require("../../Controller/Controller_Sub");

//TODO localhost:8080/api/admin/v1/premium
Router.get("/premium", CTL__Get_Subscription);
Router.get("/premium/:id", CTL__Get_Subscription);

module.exports = Router;
