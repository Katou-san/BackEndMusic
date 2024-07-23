const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Reply,
  CTL__Create_Reply,
  CTL__Update_Reply,
  CTL__Delete_Reply,
} = require("../../Controller/Controller_Reply");

//TODO localhost:8080/api/admin/v1/reply

Router.get("/reply/:id", CTL__Get_Reply);

Router.post(
  "/reply",
  JWT_Verify_Token,
  Validate_Role(["client", "creator"]),
  CTL__Create_Reply
);

Router.put(
  "/reply/:id",
  JWT_Verify_Token,
  Validate_Role(["client", "creator"]),
  CTL__Update_Reply
);
Router.delete(
  "/reply/:id",
  JWT_Verify_Token,
  Validate_Role(["client", "creator"]),
  CTL__Delete_Reply
);

module.exports = Router;
