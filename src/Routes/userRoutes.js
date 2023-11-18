const express = require("express");
const Router = express.Router();
const UserController = require("../Controller/UserController");

Router.post("/Login", UserController.CheckUser);
Router.post("/Sign_up", UserController.CreateUser);
Router.put("/Update_user/:id", UserController.UpdateUser);
Router.delete("/Delete_user/:id", UserController.DeletaUser);
Router.get("/testAPI", UserController.testAPI);
module.exports = Router;
