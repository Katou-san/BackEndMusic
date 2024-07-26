const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");

const express = require("express");
const Router = express.Router();

const {
  CTL_Get_Dashboard_1,
  CTL_Get_Dashboard_char1,
} = require("../../Controller/Controller_Dashboard");

Router.get(
  "/dashboard_1",
  JWT_Verify_Token,
  Validate_Role(["employess", "admin"]),
  CTL_Get_Dashboard_1
);

Router.get(
  "/dashboard_char_1",
  JWT_Verify_Token,
  Validate_Role(["employess", "admin"]),
  CTL_Get_Dashboard_char1
);

module.exports = Router;
