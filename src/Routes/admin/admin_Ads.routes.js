const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const {
  CTL__Create_Ads,
  CTL__Update_Ads,
  CTL__Delete_Ads,
  CTL__Get_Ads,
} = require("../../Controller/Controller_Ads");
const { multer_Array } = require("../../Configs/Multer_Cus");
const uploadArray = multer_Array();
const Router = express.Router();

//TODO localhost:8080/api/admin/v1/Bill

Router.get(
  "/ads/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Get_Ads
);

Router.get(
  "/ads",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Get_Ads
);

Router.post(
  "/ads",
  JWT_Verify_Token,
  uploadArray.fields([{ name: "Ads_Image" }, { name: "Ads_Audio" }]),
  Validate_Role(["admin", "employess"]),
  CTL__Create_Ads
);

Router.put(
  "/ads/:id",
  JWT_Verify_Token,
  uploadArray.fields([{ name: "Ads_Image" }]),
  Validate_Role(["admin", "employess"]),
  CTL__Update_Ads
);

Router.delete(
  "/ads/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Delete_Ads
);

module.exports = Router;