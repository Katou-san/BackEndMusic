// const { Shazam } = require("node-shazam");

const express = require("express");
const fs = require("fs");

const {
  CTL__FPCheck,
  CTL__FP_Song_Create,
  CTL__FP_Song_CreateAll,
  CTL__find_Audio_FP,
} = require("../../Controller/Controller_AudioFP");
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

Router.get("/Test343", CTL__FPCheck);

Router.post("/audiofp/createfp", CTL__FP_Song_Create);
Router.get("/audiofp/createAll", CTL__FP_Song_CreateAll);
Router.get("/audiofp/find", CTL__find_Audio_FP);

module.exports = Router;
