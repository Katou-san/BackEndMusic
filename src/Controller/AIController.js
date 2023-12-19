const axios = require("axios");
const fs = require("fs");
const AiFindSong = async (req, res) => {
  console.log(req);
  // var data = {
  //   api_token: "e3ab7373ffcd3d57251911870d54b205",
  //   file: fs.createReadStream(file),
  //   return: "apple_music,spotify",
  // };

  // axios({
  //   method: "post",
  //   url: "https://api.audd.io/",
  //   data: data,
  //   headers: { "Content-Type": "multipart/form-data" },
  // })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  return res.status(200).json({
    status: "ERR",
    message: "Category invalid",
  });
};
module.exports = { AiFindSong };
