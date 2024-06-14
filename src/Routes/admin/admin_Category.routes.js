const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Category,
  CTL__Create_Category,
  CTL__Update_Category,
  CTL__Delete_Category,
} = require("../../Controller/Controller_Category");

//TODO localhost:8080/api/admin/v1/category
Router.get("/category", CTL__Get_Category);
Router.get("/category/:id", JWT_Verify_Token, CTL__Get_Category);
Router.post(
  "/category",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Create_Category
);
Router.put(
  "/category/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Update_Category
);
Router.delete(
  "/category/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Delete_Category
);

module.exports = Router;
