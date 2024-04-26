const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Role,
  CTL__Create_Role,
  CTL__Update_Role,
  CTL__Delete_Role,
} = require("../../Controller/Admin__Controller_Role");

//TODO localhost:8080/api/admin/v1/role
Router.get("/role", JWT_Verify_Token, Validate_Role(["admin"]), CTL__Get_Role);
Router.get(
  "/role/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Get_Role
);
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
