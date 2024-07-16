const multer = require("multer");
const path = require("path");
const { Get_Current_Time } = require("../Util/Get_Time");
const { getFileSize } = require("../Util/Handle_File");

const handle_Link = (nameFile = "") => {
  switch (nameFile.toLowerCase()) {
    case "song_audio":
      return { status: true, url: "./src/Assets/Song_Audio" };
    case "song_image":
      return { status: true, url: "./src/Assets/Song_Image" };
    case "image":
      return { status: true, url: "./src/Assets/Playlist_Img" };
    case "thumbnail":
      return { status: true, url: "./src/Assets/Playlist_Thumbnail" };
    case "logo":
      return { status: true, url: "./src/Assets/Partner" };
    case "partner_image":
      return { status: true, url: "./src/Assets/Partner" };
    case "partner_audio":
      return { status: true, url: "./src/Assets/Partner" };

    default:
      return { status: false, url: "./src/Assets/Test" };
  }
};

function multer_Single(src = "./src/Assets/Test") {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, src);
    },
    filename: function (req, file, cb) {
      let Currentdate = req.body.Post_Time
        ? req.body.Post_Time
        : Get_Current_Time();
      const FileName = Currentdate + path.extname(file.originalname);
      req.body[file.fieldname] = FileName;
      cb(null, FileName);
    },
  });

  return multer({ storage: storage });
}

function multer_Array() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file != undefined) {
        const get_Link = handle_Link(file.fieldname);
        if (!get_Link.status) {
          console.error("not found Name file mutler");
        }
        cb(null, get_Link.url || "./src/Assets/Test");
      }
    },
    filename: function (req, file, cb) {
      let Currentdate = req.body.Post_Time
        ? req.body.Post_Time
        : Get_Current_Time();
      if (file != undefined) {
        const filename = Currentdate + path.extname(file.originalname);
        req.body[file.fieldname] = filename;
        cb(null, filename);
      }
    },
  });

  return multer({ storage: storage, limits: { fieldSize: 2097152 } });
}

module.exports = { multer_Single, multer_Array };
