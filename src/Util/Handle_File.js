var fs = require("fs");

const Delete_File = (file, id) => {
  if (!id) return true;
  if (id && file) {
    if (id != "null" && id != "undefined" && id != "") {
      try {
        fs.unlinkSync(`./src/Assets/${file}/${id}`);
        return true;
      } catch (error) {
        console.log("not found file " + id + " in " + file);
        return false;
      }
    }
  } else {
    return false;
  }
};

const Delete_Many_File = (array = [{ url: "", idFile: "" }], deny = []) => {
  array.map((item) => {
    if (
      !deny.includes(item.idFile) &&
      item.idFile != undefined &&
      item.idFile != "null" &&
      item.idFile
    ) {
      Delete_File(item.url, item.idFile);
    }
  });
};

const getFileSize = (file) => {
  const getfile = fs.statSync(`./src/Assets/Song_Audio/${file}`);
  const fileSize = getfile.size / (1024 * 1024);
  return fileSize;
};

module.exports = { Delete_File, Delete_Many_File, getFileSize };
