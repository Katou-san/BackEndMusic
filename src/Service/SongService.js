const { Song } = require("../Model/Song");
const path = require("path");

const CreateSong = (data, file) => {
  return new Promise(async (resolve, reject) => {
    //const { Id, Name, Avatar, Like, IdUser, CatalogyId, Lyric } = data;

    const { NameSong, PostTime, Category, IdUser, Like, Lyric } = data;
    try {
      const check = await Song.findOne({ Id: PostTime });
      if (check !== null) {
        resolve({
          status: "ERR",
          message: "Song already have!",
        });
      }
      const song = await Song.create({
        Id: PostTime,
        Name: NameSong,
        Avatar:
          IdUser +
          "_" +
          NameSong +
          "_" +
          PostTime +
          path.extname(file[1].originalname),
        src:
          IdUser +
          "_" +
          NameSong +
          "_" +
          PostTime +
          path.extname(file[0].originalname),
        Like,
        IdUser: IdUser,
        CatalogyId: Category,
        Lyric,
      });
      resolve({
        status: "OK",
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
    const { Id, Name } = data;
    try {
      const checkE = await Song.findOne({ Id: Id });
      if (checkE == null) {
        resolve({
          status: "ERR",
          message: "Song not found!",
        });
      } else {
        if (checkE.Name == Name) {
          resolve({
            status: "OK",
            message: "Song founded",
          });
        } else {
          resolve({
            status: "ERR",
            message: "Name song wrong!",
          });
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { CheckSong, CreateSong };
