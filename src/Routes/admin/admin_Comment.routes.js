const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Comment,
  CTL__Create_Comment,
  CTL__Update_Comment,
  CTL__Delete_Comment,
} = require("../../Controller/Controller_Comment");

//TODO localhost:8080/api/admin/v1/comment

Router.get("/comment/:id", CTL__Get_Comment);

Router.post(
  "/comment",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Create_Comment
);

Router.put(
  "/comment/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Update_Comment
);
Router.delete(
  "/comment/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Delete_Comment
);

module.exports = Router;
