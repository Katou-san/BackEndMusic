const express = require("express");
const Router = express.Router();
const Controller_Role = require("../Controller/Controller_Role");

Router.post("/Create_Role", Controller_Role.Create_Role);

module.exports = Router;
