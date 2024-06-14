const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Track,
  CTL__Create_Track,
  CTL__Delete_Track,
} = require("../../Controller/Controller_Track");

//TODO localhost:8080/api/admin/v1/track

Router.get("/track/:id", CTL__Get_Track);
Router.post(
  "/track",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Create_Track
);

Router.delete(
  "/track/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Delete_Track
);

module.exports = Router;
