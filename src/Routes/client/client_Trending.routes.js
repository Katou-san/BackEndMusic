const {
  CTL__Get_Slider,
  CTL__Get_Trending_Playlist,
  CTL__Get_Trending_Song,
  CTL__Get_Trending_Artist,
  CTL__Get_Trending_Album,
} = require("../../Controller/Controller_Trending");
const express = require("express");
const Router = express.Router();

//TODO localhost:8080/api/admin/v1/playlist
Router.get("/trending/slider", CTL__Get_Slider);
Router.get("/trending/song", CTL__Get_Trending_Song);
Router.get("/trending/album", CTL__Get_Trending_Album);
Router.get("/trending/playlist", CTL__Get_Trending_Playlist);
Router.get("/trending/artist", CTL__Get_Trending_Artist);
// Router.get("/trending/season", CTL__Get_Playlist);

module.exports = Router;
