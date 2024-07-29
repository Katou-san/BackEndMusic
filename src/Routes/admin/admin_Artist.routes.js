const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const {
  CTL__Get_Artist,
  CTL__Find_Artist,
  CTL__Create_Artist,
  CTL__Update_Artist,
  CTL__Delete_Artist,
  CTL__Get_Current_Artist,
} = require("../../Controller/Controller_Artist");
const Router = express.Router();

//TODO localhost:8080/api/admin/v1/Bill
Router.get(
  "/artists/:type",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Get_Artist
);

Router.get(
  "/artist/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Get_Current_Artist
);

Router.get("/artist-search/:value", CTL__Find_Artist);
Router.post(
  "/artist",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Create_Artist
);

Router.put(
  "/artist/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Update_Artist
);

Router.delete(
  "/artist/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Delete_Artist
);

module.exports = Router;
