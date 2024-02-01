const { Song } = require("../Model/Song");
const path = require("path");
const default_limit = 5;
const max_item_in_page = 15;

const Create_Song_Service = (data, file) => {
  return new Promise(async (resolve, reject) => {
    const {
      Song_Name,
      Post_Time,
      Category_Id,
      User_Id,
      Lyrics,
      Tag,
      Color,
      Is_Publish,
    } = data;

    const New_Song_Name = Song_Name.toLowerCase();
    const Set_Name =
      User_Id + "_" + New_Song_Name.replaceAll(" ", "の20の") + "_" + Post_Time;
    try {
      const check = await Song.findOne({ Song_Id: Post_Time });
      if (check !== null) {
        resolve({
          status: "404",
          message: "Song already have!",
        });
      }

      const song = await Song.create({
        Song_Id: "Song_" + Post_Time,
        Song_Name: New_Song_Name,
        Song_Src: Set_Name + path.extname(file[0].originalname),
        Song_Image: Set_Name + path.extname(file[1].originalname),
        User_Id,
        Category_Id,
        Lyrics,
        Tag,
        Color,
        Is_Publish,
      });

      resolve({
        status: "200",
        message: "Song created!",
        data: song,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const CheckSong = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Song_Id, Song_Name } = data;
    try {
      const checkE = await Song.findOne({ Song_Id: Song_Id });
      if (checkE == null) {
        resolve({
          status: "404",
          message: "Song not found!",
        });
      } else {
        if (checkE.Song_Name == Song_Name) {
          resolve({
            status: "200",
            message: "Song founded",
          });
        } else {
          resolve({
            status: "404",
            message: "Song name wrong!",
          });
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};

const GetAllSong = (limit_value, skip_value, page_value) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (skip_value == 0 && page_value == 0) {
        const listSong = await Song.find({ Is_Publish: true }).limit(
          default_limit
        );
        if (listSong == null) {
          reject({
            status: "404",
            message:
              "cant get songs with limit " +
              limit_value +
              " skip " +
              skip_value +
              " page " +
              page_value,
          });
        }

        resolve({
          status: "200",
          message:
            "got songs with limit " +
            limit_value +
            " skip " +
            skip_value +
            " page " +
            page_value,
          data: listSong,
        });
      } else {
        const song_count = await Song.countDocuments({ Is_Publish: true });
        const listSong = await Song.find({ Is_Publish: true })
          .limit(limit_value)
          .skip(skip_value + max_item_in_page * page_value);

        if (listSong == null) {
          reject({
            status: "404",
            message:
              "cant get songs with limit " +
              limit_value +
              " skip " +
              skip_value +
              " page " +
              page_value,
          });
        }

        resolve({
          status: "200",
          message:
            "got songs with limit " +
            limit_value +
            " skip " +
            skip_value +
            " page " +
            page_value,
          data: listSong,
          page_total: Math.ceil(song_count / max_item_in_page),
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const Get_Song_Serice = (Song_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Find_Song = await Song.findOne({ Song_Id });
      if (Find_Song === null) {
        resolve({
          status: 404,
          message: "not found",
        });
      }
      resolve({
        status: "200",
        message: "Find Song Success",
        data: Find_Song,
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  CheckSong,
  Create_Song_Service,
  GetAllSong,
  Get_Song_Serice,
};
