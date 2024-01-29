const { Song } = require("../Model/Song");
const path = require("path");

const CreateSong = (data, file) => {
  return new Promise(async (resolve, reject) => {
    const { Song_Name, Post_Time, Category_Id, User_Id, Lyrics, Tag, Color } =
      data;

    const Set_Name = User_Id + "_" + Song_Name + "_" + Post_Time;
    try {
      const check = await Song.findOne({ Song_Id: Post_Time });
      if (check !== null) {
        resolve({
          status: "404",
          message: "Song already have!",
        });
      }

      const song = await Song.create({
        Song_Id: Post_Time,
        Song_Name: Song_Name,
        Song_Src: Set_Name + path.extname(file[0].originalname),
        Song_Image: Set_Name + path.extname(file[1].originalname),
        User_Id,
        Category_Id,
        Lyrics,
        Tag,
        Color,
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

const GetAllSong = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const listSong = await Song.find({ Is_Publish: true });

      if (listSong == null) {
        reject({
          status: "404",
          message: "cant get all songs",
        });
      }

      resolve({
        status: "200",
        message: "got list Song",
        data: listSong,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { CheckSong, CreateSong, GetAllSong };
