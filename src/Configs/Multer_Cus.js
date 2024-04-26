const multer = require("multer");
const path = require("path");
const { Get_Current_Time } = require("../Util/Get_Time");

function multer_Single(src = "./src/Assets/Test") {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, src);
    },
    filename: function (req, file, cb) {
      const Currentdate = Get_Current_Time();
      const FileName = Currentdate + path.extname(file.originalname);
      req.body[file.fieldname] = FileName;
      cb(null, FileName);
    },
  });

  return multer({ storage: storage });
}

function multer_Array(src = "./src/Assets/Test") {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, src);
    },
    filename: function (req, file, cb) {
      const filename = "test" + path.extname(file.originalname);
      req.body.Avatar = filename;
      cb(null, filename);
    },
  });

  return multer({ storage: storage });
}

module.exports = { multer_Single };
