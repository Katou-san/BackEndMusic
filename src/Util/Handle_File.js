var fs = require("fs");

const Delete_File = (file, id) => {
  if (!id) return true;
  if (id && file) {
    if (id != "null") {
      fs.unlinkSync(`./src/Assets/${file}/${id}`);
      return true;
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

module.exports = { Delete_File, Delete_Many_File };
