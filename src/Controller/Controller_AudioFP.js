const { Fingerprints } = require("../Model/Audio_FP");
const { Song } = require("../Model/Song");
const fs = require("fs");
const {
  SV__GetFP,
  SV__CompareFP,
  SV__Create_Audio_FP,
  SV__find_Audio_FP,
} = require("../Service/Service_AudioFP");
const path = require("path");

const CTL__FPCheck = async (req, res) => {
  try {
    const fullSong = path.join(
      __dirname,
      "../Assets/Temp_File/FromOurHearts.mp3"
    );

    const findSong = path.join(__dirname, "../Assets/Temp_File/Test232.mp3");

    const findSong2 = path.join(
      __dirname,
      "../Assets/Song_Audio/20247310314393785.mp3"
    );

    const fullSong_fp = await SV__GetFP(findSong2);
    const findSong_fp = await SV__GetFP(findSong2);

    const result = await SV__CompareFP(fullSong_fp, findSong_fp);

    return res.status(200).json(result);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "FB get failed" });
  }
};

const CTL__FP_Song_Create = async (req, res) => {
  try {
    const { Song_Id } = req.body;
    const song = await Song.findOne({ Song_Id });
    if (song) {
      const songFile = path.join(
        __dirname,
        `../Assets/Song_Audio/${song.Song_Audio}`
      );
      const result = await SV__Create_Audio_FP(songFile, Song_Id);
      return res.status(200).json(result);
    } else {
      return res.status(200).json({ status: 404, message: "Song not exist" });
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "FP create failed" });
  }
};

const CTL__FP_Song_CreateAll = async (req, res) => {
  try {
    const list_song = await Song.aggregate([
      {
        $lookup: {
          from: "fingerprints",
          localField: "Song_Id",
          foreignField: "Song_Id",
          as: "list",
        },
      },
      { $match: { list: { $size: 0 } } },
      { $project: { list: 0 } },
    ]);
    list_song.forEach(async (song) => {
      const songFile = path.join(
        __dirname,
        `../Assets/Song_Audio/${song.Song_Audio}`
      );
      console.log(songFile);
      if (fs.existsSync(songFile)) {
        console.log("exist");
        await SV__Create_Audio_FP(songFile, song.Song_Id);
      } else {
        console.log("not exist");
      }
    });

    return res
      .status(200)
      .json({ status: 200, message: "FP create all complete" });
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "FP create all failed" });
  }
};

const CTL__find_Audio_FP = async (req, res) => {
  try {
    const file = path.join(
      __dirname,
      "../Assets/Song_Audio/20246222153252565.mp3"
    );
    if (!fs.existsSync(file)) {
      return res.status(200).json({ status: 404, message: "File patch error" });
    }

    const result = await SV__find_Audio_FP(file);

    if (result == false) {
      return res
        .status(200)
        .json({ status: 404, message: "There no match song" });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "FP find complete", data: result });
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "FP find failed" });
  }
};

module.exports = {
  CTL__FPCheck,
  CTL__FP_Song_Create,
  CTL__FP_Song_CreateAll,
  CTL__find_Audio_FP,
};
