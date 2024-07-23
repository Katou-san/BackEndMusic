const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Repost,
  CTL__Create_Repost,
  CTL__Delete_Repost,
  CTL__Get_Repost_Song,
  CTL__Get_Repost_Current,
  // CTL__Update_Repost,
} = require("../../Controller/Controller_Repost");

//TODO localhost:8080/api/admin/v1/repost
Router.get("/repost/:id", CTL__Get_Repost);
Router.get("/reposts/:id", CTL__Get_Repost_Song);
Router.get("/reposts/:id/:song", CTL__Get_Repost_Current);
Router.post(
  "/repost",
  JWT_Verify_Token,
  Validate_Role(["client", "creator"]),
  CTL__Create_Repost
);

// Router.put(
//     "/repost",
//     JWT_Verify_Token,
//     Validate_Role(["admin", "employess"]),
//     CTL__Update_Repost
//   );

Router.delete(
  "/repost/:id",
  JWT_Verify_Token,
  Validate_Role(["client", "creator"]),
  CTL__Delete_Repost
);

module.exports = Router;
