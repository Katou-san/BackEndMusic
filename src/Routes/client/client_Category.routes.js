const express = require("express");
const Router = express.Router();
const { CTL__Get_Category } = require("../../Controller/Controller_Category");

//TODO localhost:8080/api/admin/v1/category
Router.get("/category", CTL__Get_Category);
Router.get("/category/:id", CTL__Get_Category);

module.exports = Router;
