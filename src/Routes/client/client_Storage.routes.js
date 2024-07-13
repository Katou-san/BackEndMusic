const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Storage,
  CTL__Create_Storage,
  CTL__Update_Storage,
  CTL__Delete_Storage,
} = require("../../Controller/Controller_Storage");

//TODO localhost:8080/api/admin/v1/Storage

Router.get("/storage/:id", CTL__Get_Storage);
Router.get("/storage", JWT_Verify_Token, CTL__Get_Storage);
Router.put("/storage/:id", JWT_Verify_Token, CTL__Get_Storage);

module.exports = Router;
