const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Bill,
  CTL__Get_Bill__Current,
} = require("../../Controller/Controller_Bill");

// Router.get(
//   "/bill/:id",
//   JWT_Verify_Token,
//   Validate_Role(["client", "creator"]),
//   CTL__Get_Bill
// );

Router.get(
  "/bills/:id",
  JWT_Verify_Token,
  Validate_Role(["client", "creator"]),
  CTL__Get_Bill__Current
);

module.exports = Router;
