const express = require("express");
const Router = express.Router();
const Controller_Category = require("../Controller/Controller_Category");

Router.post("/Create_category", Controller_Category.CreateCategory);
Router.put("/Update_category/:id", Controller_Category.UpdateCategory);
Router.delete("/Delete_category/:id", Controller_Category.DeleteCategory);
module.exports = Router;
