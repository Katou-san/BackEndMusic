const express = require("express");
const Router = express.Router();

const Client_Router_User = require("./Client_Router_User");
const Client_Router_Song = require("./Client_Router_Song");
const Client_Router_Playlist = require("./Client_Router_Playlist");
const Client_Router_Bill = require("./Client_Router_Bill");
Router.use(Client_Router_User);
Router.use(Client_Router_Song);
Router.use(Client_Router_Playlist);
Router.use(Client_Router_Bill);
module.exports = Router;
