const { multer_Single } = require("../../Configs/Multer_Cus");
const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Employess,
  CTL__Create_Employess,
  CTL__Update_Employess,
  CTL__Delete_Employess,
  CTL__Login_Employess,
} = require("../../Controller/Admin__Controller_Employess");

const uploadFile = multer_Single();
//TODO localhost:8080/api/admin/v1/employess
Router.get(
  "/employess",
  JWT_Verify_Token,
  Validate_Role(["employess", "admin"]),
  CTL__Get_Employess
);
Router.get(
  "/employess/:id",
  JWT_Verify_Token,
  Validate_Role(["employess", "admin"]),
  CTL__Get_Employess
);
Router.post("/employess/login", CTL__Login_Employess);

Router.post(
  "/employess",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Create_Employess
);
Router.put(
  "/employess",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  uploadFile.single("Avatar"),
  CTL__Update_Employess
);
Router.delete(
  "/employess/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Delete_Employess
);

module.exports = Router;
