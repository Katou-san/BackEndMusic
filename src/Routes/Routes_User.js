const express = require("express");
const Router = express.Router();
const Controller_User = require("../Controller/Controller_User");

Router.post("/Login", Controller_User.CheckUser);
Router.post("/Sign_up", Controller_User.CreateUser);
Router.put("/Update_user/:id", Controller_User.UpdateUser);
Router.delete("/Delete_user/:id", Controller_User.DeletaUser);
module.exports = Router;
