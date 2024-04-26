const express = require("express");
const Router = express.Router();
const Controller_Category = require("../../Controller/Controller_Category");

Router.get("/get_all_category", Controller_Category.Get_All_Category);
Router.post("/Create_category", Controller_Category.Create_Category);
Router.put("/Update_category/:id", Controller_Category.Update_Category);
Router.delete("/Delete_category/:id", Controller_Category.Delete_Category);
module.exports = Router;
