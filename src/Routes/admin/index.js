const express = require("express");
const Router = express.Router();
const Admin_Router_Category = require("./admin_Category.routes");
const Admin_Router_User = require("./admin_User.routes");
const Admin_Router_Role = require("./admin_Role.routes");
const Admin_Router_Song = require("./admin_Song.routes");
const Admin_Router_Playlist = require("./admin_Playlist.routes");
const Admin_Router_Bill = require("./admin_Bill.routes");
const Admin_Router_Follow = require("./admin_Follow.routes");
const Admin_Router_Like = require("./admin_Like.routes");
const Admin_Router_Premium = require("./admin_Premium.routes");
const Admin_Router_Comment = require("./admin_Comment.routes");
const Admin_Router_Reply = require("./admin_Reply.routes");
const Admin_Router_Repost = require("./admin_Repost.routes");
const Admin_Router_Storage = require("./admin_Storage.routes");
const Admin_Router_Track = require("./admin_Track.routes");
Router.use(Admin_Router_User);
Router.use(Admin_Router_Category);
Router.use(Admin_Router_Role);
Router.use(Admin_Router_Song);
Router.use(Admin_Router_Playlist);
Router.use(Admin_Router_Bill);
Router.use(Admin_Router_Follow);
Router.use(Admin_Router_Like);
Router.use(Admin_Router_Premium);
Router.use(Admin_Router_Comment);
Router.use(Admin_Router_Reply);
Router.use(Admin_Router_Repost);
Router.use(Admin_Router_Storage);
Router.use(Admin_Router_Track);

module.exports = Router;
