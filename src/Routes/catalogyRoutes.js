const express = require("express");
const Router = express.Router();
const CatalogyController = require("../Controller/CatalogyController");

Router.post("/Create_catalogy", CatalogyController.CreateCatalogy);
Router.put("/Update_catalogy/:id", CatalogyController.UpdateCatalogy);
Router.delete("/Delete_catalogy/:id", CatalogyController.DeleteCatalogy);
module.exports = Router;
