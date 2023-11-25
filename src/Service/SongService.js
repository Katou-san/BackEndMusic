const { Song } = require("../Model/Song");

// const CreateSong = (data) => {
//   console.log(data);
//   return new Promise(async (resolve, reject) => {
//     console.log(data);
//     const { Id, Name } = data;
//     try {
//       const check = await Song.findOne({ Id: Id });
//       if (check !== null) {
//         resolve({
//           status: "ERR",
//           message: "Song already have!",
//         });
//       }
//       const song = await Song.create({ Id, Name });
//       resolve({
//         status: "OK",
//         message: "Song created!",
//         data: song,
//       });
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

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

module.exports = { CheckSong };
