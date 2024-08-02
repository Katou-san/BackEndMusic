const express = require("express");
const {
  CTL__Get_Artist,
  CTL__Find_Artist,
  CTL__Get_Current_Artist,
} = require("../../Controller/Controller_Artist");
const Router = express.Router();

//TODO localhost:8080/api/admin/v1/Bill
Router.get("/artists/:type", CTL__Get_Artist);
Router.get("/artist/:id", CTL__Get_Current_Artist);
Router.get("/artist-search/:value", CTL__Find_Artist);

module.exports = Router;
