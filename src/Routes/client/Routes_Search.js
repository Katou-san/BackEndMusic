const express = require("express");
const Router = express.Router();
const Controller_Search = require("../../Controller/Controller_Search");

Router.get("/Search_All/:Value", Controller_Search.Search_All);
module.exports = Router;
