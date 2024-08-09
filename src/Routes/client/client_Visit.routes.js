const express = require("express");
const fs = require("fs");
const { User } = require("../../Model/User");
const Router = express.Router();

Router.get("/visit", async (req, res) => {
  try {
    const json = fs.readFileSync("./src/Assets/count.json", "utf-8");
    const obj = JSON.parse(json);
    obj.visits++;
    const newJSON = JSON.stringify(obj);
    fs.writeFileSync("./src/Assets/count.json", newJSON);
    return res.status(200).json(newJSON);
  } catch (e) {
    console.log(e);
  }
});

Router.get("/Test343", async (req, res) => {
  return res.status(200).json("hello");
});

module.exports = Router;
