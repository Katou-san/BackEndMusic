const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Premium,
  CTL__Create_Premium,
  CTL__Update_Premium,
  CTL__Delete_Premium,
} = require("../../Controller/Controller_Premium");

//TODO localhost:8080/api/admin/v1/premium
Router.get("/premium", CTL__Get_Premium);
Router.get("/premium/:id", JWT_Verify_Token, CTL__Get_Premium);
Router.post(
  "/premium",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Create_Premium
);

Router.put(
  "/premium/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Update_Premium
);

Router.delete(
  "/premium/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Delete_Premium
);

module.exports = Router;
