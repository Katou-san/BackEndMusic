const express = require("express");
const Router = express.Router();
const Client_Router_Category = require("./client_Category.routes");
const Client_Router_User = require("./client_User.routes");
const Client_Router_Song = require("./client_Song.routes");
const Client_Router_Playlist = require("./client_Playlist.routes");
const Client_Router_Bill = require("./client_Bill.routes");
const Client_Router_Follow = require("./client_Follow.routes");
const Client_Router_Like = require("./client_Like.routes");
const Client_Router_Sub = require("./client_Sub.routes");
const Client_Router_Comment = require("./client_Comment.routes");
const Client_Router_Reply = require("./client_Reply.routes");
const Client_Router_Repost = require("./client_Repost.routes");
const Client_Router_Storage = require("./client_Storage.routes");
const Client_Router_Track = require("./client_Track.routes");
Router.use(Client_Router_User);
Router.use(Client_Router_Category);
Router.use(Client_Router_Song);
Router.use(Client_Router_Playlist);
Router.use(Client_Router_Bill);
Router.use(Client_Router_Follow);
Router.use(Client_Router_Like);
Router.use(Client_Router_Sub);
Router.use(Client_Router_Comment);
Router.use(Client_Router_Reply);
Router.use(Client_Router_Repost);
Router.use(Client_Router_Storage);
Router.use(Client_Router_Track);

module.exports = Router;
