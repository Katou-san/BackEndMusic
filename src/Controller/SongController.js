const SongService = require("../Service/SongService");
const path = require("path");

const SendSong = async (req, res) => {
  try {
    res.sendFile("001-maybayngangtroi.mp3", {
      root: path.join(__dirname, "../SongList/"),
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "ERR",
      message: "Fork up song~",
    });
  }
};

module.exports = { SendSong };
