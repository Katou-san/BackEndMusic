const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Role,
  CTL__Get_Role_Current,
} = require("../../Controller/Controller_Role");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");

//TODO localhost:8080/api/admin/v1/repost
Router.get("/role/:id", CTL__Get_Role);
Router.get("/roles", JWT_Verify_Token, CTL__Get_Role_Current);
module.exports = Router;
