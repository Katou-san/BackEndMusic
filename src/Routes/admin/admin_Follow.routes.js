const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Create_Follow,
  CTL__Delete_Follow,
  CTL__Get_Follow,
} = require("../../Controller/Controller_Follow");

//TODO localhost:8080/api/admin/v1/follow
Router.get("/follow/:id", CTL__Get_Follow);
Router.post("/follow", JWT_Verify_Token, CTL__Create_Follow);

Router.delete("/follow/:id", JWT_Verify_Token, CTL__Delete_Follow);

module.exports = Router;
