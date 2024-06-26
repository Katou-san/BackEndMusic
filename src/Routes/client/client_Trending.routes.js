const { CTL__Get_Slider } = require("../../Controller/Controller_Trending");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();

//TODO localhost:8080/api/admin/v1/playlist
Router.get("/trending/slider", CTL__Get_Slider);
// Router.get("/trending/song", CTL__Get_Playlist);
// Router.get("/trending/album", CTL__Get_Playlist);
// Router.get("/trending/playlist", CTL__Get_Playlist);
// Router.get("/trending/artist", CTL__Get_Playlist);
// Router.get("/trending/season", CTL__Get_Playlist);

module.exports = Router;
