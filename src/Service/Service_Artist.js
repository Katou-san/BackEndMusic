const { Artist } = require("../Model/Artist");
const { Song } = require("../Model/Song");
const { Create_Id } = require("../Util/Create_Id");

const SV__Get_Artist_V = (Type = "true") => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Artist.find({ Vertify: Boolean(Type) });
      return resolve({
        status: 200,
        message: "Get vertify artist complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "Something went wrong in Service_Artist.js (SV__Get_Artist_V)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Current_Artist = (Type = "true", Name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Artist.find({
        Vertify: Boolean(Type),
        Artist_Name: Name,
      });
      return resolve({
        status: 200,
        message: "Get vertify artist complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "Something went wrong in Service_Artist.js (SV__Get_Artist_V)",
      });
      throw new Error(err);
    }
  });
};

const SV__Find_Artist = (Value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Artist.find({
        Vertify: true,
        Artist_Name: String(Value).toLowerCase().trim(),
      });
      return resolve({
        status: 200,
        message: "Find vertify artist complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "Something went wrong in Service_Artist.js (SV__Get_Artist_V)",
      });
      throw new Error(err);
    }
  });
};

const SV__Create_Artist = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Artist_Name, User_Id = "", Vertify = false } = data;

      const checkName = await Artist.findOne({
        Artist_Name: String(Artist_Name).toLowerCase().trim(),
      });
      if (checkName) {
        return resolve({
          status: 404,
          message: "Artist name exist",
        });
      } else {
        const result = await Artist.create({
          Artist_Id: Create_Id("Artist"),
          Artist_Name: String(Artist_Name).toLowerCase().trim(),
          User_Id,
          Vertify,
        });

        if (!result) {
          return resolve({
            status: 404,
            message: "Artist create failed!",
          });
        }
        return resolve({
          status: 200,
          message: "Create artist complete!",
          data: result,
        });
      }
    } catch (err) {
      reject({
        status: 404,
        message:
          "Something went wrong in Service_Artist.js (SV__Create_Artist)",
      });
      throw new Error(err);
    }
  });
};

const SV__Create_Artist_Song = (Artist_Name) => {
  const Artist_Id = Create_Id("Artist");
  if (String(Artist_Name).length > 1) {
    checkArist = Artist.create({
      Artist_Id: Artist_Id,
      Artist_Name: String(Artist_Name).toLowerCase().trim(),
      Vertify: false,
      User_Id: "",
    });
    return Artist_Id;
  } else {
    return "";
  }
};

const SV__Update_Artist = (Artist_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await Artist.findOne({
        Artist_Id,
      });

      if (!check) {
        return resolve({
          status: 404,
          message: "Artist not exist",
        });
      }
      let Update_V = Convert_vUpdate(data, ["Artist_Id", "_id", "Artist_Name"]);

      const result = await Artist.findOneAndUpdate(
        { Artist_Id: Artist_Id },
        Update_V,
        {
          new: true,
        }
      );

      if (!result) {
        return resolve({
          status: 404,
          message: "Artist create failed!",
        });
      }
      return resolve({
        status: 200,
        message: "Update artist complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "Something went wrong in Service_Artist.js (SV__Update_Artist)",
      });
      throw new Error(err);
    }
  });
};

const SV__Delete_Artist = (Artist_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkArtist = await Artist.findOne({
        Artist_Id,
      });

      if (!checkArtist) {
        return resolve({
          status: 404,
          message: "Artist not exist",
        });
      }

      const check = await Song.findOne({
        Artist: checkArtist.Artist_Name,
      });
      if (check) {
        return resolve({
          status: 404,
          message: "Artist is using",
        });
      }

      const result = await Artist.findOneAndDelete({
        Artist_Id: checkArtist.Artist_Id,
      });
      return resolve({
        status: 200,
        message: "Delete artist complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "Something went wrong in Service_Artist.js (SV__Update_Artist)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Artist_V,
  SV__Create_Artist,
  SV__Update_Artist,
  SV__Delete_Artist,
  SV__Find_Artist,
  SV__Get_Current_Artist,
  SV__Create_Artist_Song,
};
