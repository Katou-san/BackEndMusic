const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const { multer_Array } = require("../../Configs/Multer_Cus");
const express = require("express");
const uploadArray = multer_Array();

const {
  CTL__Get_Partner,
  CTL__Create_Partner,
  CTL__Update_Partner,
  CTL__Delete_Partner,
} = require("../../Controller/Controller_Partner");

const Router = express.Router();
//TODO localhost:8080/api/admin/v1/partner
Router.get("/partner/:type", JWT_Verify_Token, CTL__Get_Partner);
Router.get("/partner/:type/:id", JWT_Verify_Token, CTL__Get_Partner);
Router.post(
  "/partner",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  uploadArray.fields([
    { name: "Logo" },
    { name: "Partner_Image" },
    { name: "Partner_Audio" },
  ]),
  CTL__Create_Partner
);

Router.put(
  "/partner/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Update_Partner
);

Router.delete(
  "/partner/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Delete_Partner
);

module.exports = Router;
