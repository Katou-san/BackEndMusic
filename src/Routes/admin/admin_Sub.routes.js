const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Subscription,
  CTL__Create_Subscription,
  CTL__Update_Subscription,
  CTL__Delete_Subscription,
} = require("../../Controller/Controller_Sub");

//TODO localhost:8080/api/admin/v1/subscription
Router.get("/sub", CTL__Get_Subscription);
Router.get("/sub/:id", CTL__Get_Subscription);
Router.post(
  "/sub",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Create_Subscription
);

Router.put(
  "/sub/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Update_Subscription
);

Router.delete(
  "/sub/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Delete_Subscription
);

module.exports = Router;
