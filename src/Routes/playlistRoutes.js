const express = require("express");
const Router = express.Router();
const PlaylistController = require("../Controller/PlaylistController");

Router.post("/Create_playlist", PlaylistController.CreatePlaylist);
Router.put("/Update_playlist/:id", PlaylistController.UpdatePlaylist);
Router.delete("/Delete_playlist/:id", PlaylistController.DeletePlaylist);
module.exports = Router;
