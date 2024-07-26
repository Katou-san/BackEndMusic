const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Role,
  CTL__Create_Role,
  CTL__Update_Role,
  CTL__Delete_Role,
  CTL__Get_Role_User,
} = require("../../Controller/Controller_Role");

//TODO localhost:8080/api/admin/v1/role
Router.get(
  "/role",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Get_Role
);
Router.get(
  "/role/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Get_Role
);

Router.get("/roles/:type", CTL__Get_Role_User);
Router.post(
  "/role",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Create_Role
);
Router.put(
  "/role/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Update_Role
);
Router.delete(
  "/role/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Delete_Role
);

module.exports = Router;
