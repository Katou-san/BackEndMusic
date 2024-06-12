const express = require("express");
const Router = express.Router();
const Admin_Router_Category = require("./Admin_Router_Category");
const Admin_Router_User = require("./Admin_Router_User");
const Admin_Router_Role = require("./Admin_Router_Role");
const Admin_Router_Song = require("./Admin_Router_Song");
const Admin_Router_Playlist = require("./Admin_Router_Playlist");
Router.use(Admin_Router_User);
Router.use(Admin_Router_Category);
Router.use(Admin_Router_Role);
Router.use(Admin_Router_Song);
Router.use(Admin_Router_Playlist);

module.exports = Router;
