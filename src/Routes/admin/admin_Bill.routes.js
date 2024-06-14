const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Bill,
  CTL__Create_Bill,
  CTL__Delete_Bill,
} = require("../../Controller/Controller_Bill");

//TODO localhost:8080/api/admin/v1/Bill
Router.get("/bill", CTL__Get_Bill);
Router.get("/bill/:id", JWT_Verify_Token, CTL__Get_Bill);
Router.post(
  "/bill",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Create_Bill
);

Router.delete(
  "/bill/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Delete_Bill
);

module.exports = Router;
