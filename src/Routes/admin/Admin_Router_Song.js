const { multer_Single } = require("../../Configs/Multer_Cus");
const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Song,
  CTL__Update_Song,
} = require("../../Controller/Admin__Controller_Song");

const uploadFile = multer_Single();

//TODO localhost:8080/api/admin/v1/song
Router.get("/song", CTL__Get_Song);
Router.get("/song/:id", CTL__Get_Song);
Router.put("/song/:id", CTL__Update_Song);
// Router.delete("/song/:id", CTL__Update_User);

module.exports = Router;
