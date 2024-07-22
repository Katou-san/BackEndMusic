const express = require("express");
const { CTL__Search_All } = require("../../Controller/Controller_Search");
const Router = express.Router();
//TODO localhost:8080/api/admin/v1/repost
Router.get("/searchs/:name", CTL__Search_All);
module.exports = Router;
