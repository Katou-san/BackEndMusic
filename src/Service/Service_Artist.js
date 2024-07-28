import { Artist } from "../Model/Artist";
import { Song } from "../Model/Song";

const SV__Get_Artist_V = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Artist.find({ Vertify: true });

      if (!result) {
        return resolve({
          status: 200,
          message: "No vertify artist",
          data: result,
        });
      }
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

const SV__Get_Artist_nV = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Artist.find({ Vertify: false });

      if (!result) {
        return resolve({
          status: 200,
          message: "No non-vertify artist",
          data: result,
        });
      }
      return resolve({
        status: 200,
        message: "Get non-vertify artist complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "Something went wrong in Service_Artist.js (SV__Get_Artist_nV)",
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

const SV__Update_Artist = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Artist_Id, Artist_Name, User_Id = "", Vertify = false } = data;

      const check = await Artist.findOne({
        Artist_Id: Artist_Id,
      });

      if (!check) {
        return resolve({
          status: 404,
          message: "Artist not exist",
        });
      }
      let Update_V = Convert_vUpdate(data, ["Artist_Id", "_id"]);
      if (Artist_Name == null && Artist_Name == undefined) {
        Update_V = {
          ...Update_V,
          Artist_Name: String(Artist_Name).toLowerCase().trim(),
        };
      }

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
        message: "Create artist complete!",
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
    //   try {
    //     const check = await Song.findOne({
    //       Artist_Id: Artist_Id,
    //     });
    //     if (!check) {
    //       return resolve({
    //         status: 404,
    //         message: "Artist not exist",
    //       });
    //     }
    //     let Update_V = Convert_vUpdate(data, ["Artist_Id", "_id"]);
    //     if (Artist_Name == null && Artist_Name == undefined) {
    //       Update_V = {
    //         ...Update_V,
    //         Artist_Name: String(Artist_Name).toLowerCase().trim(),
    //       };
    //     }
    //     const result = await Artist.findOneAndUpdate(
    //       { Artist_Id: Artist_Id },
    //       Update_V,
    //       {
    //         new: true,
    //       }
    //     );
    //     if (!result) {
    //       return resolve({
    //         status: 404,
    //         message: "Artist create failed!",
    //       });
    //     }
    //     return resolve({
    //       status: 200,
    //       message: "Create artist complete!",
    //       data: result,
    //     });
    //   } catch (err) {
    //     reject({
    //       status: 404,
    //       message:
    //         "Something went wrong in Service_Artist.js (SV__Update_Artist)",
    //     });
    //     throw new Error(err);
    //   }
  });
};

module.exports = {
  SV__Get_Artist_V,
  SV__Get_Artist_nV,
  SV__Create_Artist,
  SV__Update_Artist,
};
