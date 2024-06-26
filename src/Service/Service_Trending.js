const { Song } = require("../Model/Song");
const { join, match, project, matchMany } = require("../Util/QueryDB");
const getValue = {
  _id: 0,
  Song_Id: 1,
  Song_Name: 1,
  Song_Image: 1,
  Song_Audio: 1,
  Artist: 1,
  User_Id: 1,
  Category_Id: 1,
  Lyrics: 1,
  Tag: 1,
  Color: 1,
  is_Publish: 1,
  Create_Date: 1,
};
const SV__Get_Slider = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getSong = await Song.aggregate([
        match("is_Publish", true),
        join("likes", "Song_Id", "Topic_Id", "like"),
        project(getValue, { likes: "$like.State" }),
      ]);

      let arrayMax = [];
      let arrayTemp = [];
      for (let i = 0; i < getSong.length; i++) {
        let max = 0;
        let index = 0;
        for (let j = 0; j < getSong.length; j++) {
          if (
            getSong[j].likes.length >= max &&
            !arrayTemp.includes(getSong[j].Song_Id)
          ) {
            max = getSong[j].likes.length;
            index = j;
          }
        }

        if (arrayMax.length < 6) {
          if (!arrayTemp.includes(getSong[index].Song_Id)) {
            arrayTemp.push(getSong[index].Song_Id);
            arrayMax.push(getSong[index]);
          }
        }
        max = 0;
      }

      console.log(arrayTemp);

      resolve({
        status: 200,
        data: arrayMax,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Trending_Song = () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({});
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Trending_Playlist = () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({});
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Trending_Artist = () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({});
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Trending_Season = () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({});
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};
const SV__Get_Trending_Album = () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({});
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Slider,
  SV__Get_Trending_Album,
  SV__Get_Trending_Artist,
  SV__Get_Trending_Playlist,
  SV__Get_Trending_Season,
  SV__Get_Trending_Song,
};
