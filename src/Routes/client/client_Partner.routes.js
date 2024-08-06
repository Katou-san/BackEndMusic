const express = require("express");
const { CTL__Get_Partner } = require("../../Controller/Controller_Partner");
const Router = express.Router();
//TODO localhost:8080/api/admin/v1/partner

Router.get("/partner/:id", CTL__Get_Partner);

module.exports = Router;
