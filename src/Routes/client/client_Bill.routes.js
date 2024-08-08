const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Bill,
  CTL__Get_Bill__Current,
  CTL__Delete_Bill,
  CTL__Check_Bill,
} = require("../../Controller/Controller_Bill");

Router.get(
  "/bill",
  JWT_Verify_Token,
  Validate_Role(["client", "creator"]),
  CTL__Get_Bill__Current
);
Router.get(
  "/bills/:id",
  JWT_Verify_Token,
  Validate_Role(["client", "creator"]),
  CTL__Get_Bill__Current
);

Router.get("/check-bill", JWT_Verify_Token, CTL__Check_Bill);
Router.get("/check-bill/:id", JWT_Verify_Token, CTL__Check_Bill);

Router.delete(
  "/bill/:id",
  JWT_Verify_Token,
  Validate_Role(["client", "creator"]),
  CTL__Delete_Bill
);

module.exports = Router;
