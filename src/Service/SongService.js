const { Song } = require("../Model/Song");

const CreateSong = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Id, Name } = data;
    try {
      const check = await Song.findOne({ Id: Id });
      if (check !== null) {
        resolve({
          status: "ERR",
          message: "Song already have!",
        });
      }

      console.log(Name);
      const song = await Song.create({ Id, Name });
      //can them lenh tao nhac
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

module.exports = { CreateSong };
