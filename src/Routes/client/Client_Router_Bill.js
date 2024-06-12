const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Bill,
  CTL__Create_Bill,
} = require("../../Controller/Controller_Bill");

//TODO localhost:8080/api/admin/v1/Bill
// Router.get("/bill", JWT_Verify_Token, CTL__Get_Bill);
Router.get("/bill/:id", JWT_Verify_Token, CTL__Get_Bill);
Router.post("/bill", CTL__Create_Bill);
module.exports = Router;
