const express = require("express");
const Router = express.Router();
const CategoryController = require("../Controller/CategoryController");

Router.post("/Create_category", CategoryController.CreateCategory);
Router.put("/Update_category/:id", CategoryController.UpdateCategory);
Router.delete("/Delete_category/:id", CategoryController.DeleteCategory);
module.exports = Router;
