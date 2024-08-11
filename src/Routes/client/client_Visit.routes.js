// const { Shazam } = require("node-shazam");

const express = require("express");
const fs = require("fs");
const {
  CTL__FPCheck,
  CTL__FP_Song_Create,
  CTL__FP_Song_CreateAll,
  CTL__find_Audio_FP,
} = require("../../Controller/Controller_AudioFP");
const { multer_Array } = require("../../Configs/Multer_Cus");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const { Validate_Role } = require("../../Middleware/Role_Validate");

const uploadArray = multer_Array();
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

Router.post(
  "/audiofp/createfp",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__FP_Song_Create
);
Router.get(
  "/audiofp/createAll",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__FP_Song_CreateAll
);
Router.post(
  "/audiofp/find",
  JWT_Verify_Token,
  uploadArray.fields([{ name: "Song_Find" }]),
  CTL__find_Audio_FP
);

module.exports = Router;
