const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const Controller_Song = require("../../Controller/Controller_Song");
const path = require("path");
const multer = require("multer");

const storagePath = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath = file.mimetype.split("/")[0];
    if (filePath == "audio") {
      cb(null, "./src/Assets/Song_Audio");
    } else if (filePath === "image") {
      cb(null, "./src/Assets/Song_Image");
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.User_Id +
        "_" +
        req.body.Song_Name.toLowerCase().replaceAll(" ", "の20の") +
        "_" +
        req.body.Post_Time +
        path.extname(file.originalname)
    );
  },
});
const uploadFile = multer({ storage: storagePath });

Router.post(
  "/UploadSong",
  JWT_Verify_Token,
  uploadFile.array("Files"),
  Controller_Song.Create_Song
);
Router.get("/Get_List_Song", Controller_Song.Get_List_Song);

Router.get("/find_song/:Song_Id", Controller_Song.Get_Song);
Router.get(
  "/manage_get_song/:Song_Id",
  JWT_Verify_Token,
  Controller_Song.Manage_Get_Song
);

Router.post("/delete_song", JWT_Verify_Token, Controller_Song.Delete_Song);

module.exports = Router;
