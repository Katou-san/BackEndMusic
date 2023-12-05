const { Catalogy } = require("../Model/Catalogy");
const { User } = require("../Model/User");

const CreateCatalogy = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Id, Name } = data;
    try {
      const check = await Catalogy.findOne({ Id: Id });
      if (check !== null) {
        resolve({
          status: "ERR",
          message: "Catalogy is exist",
        });
      }
      const catalogy = await Catalogy.create({
        Id,
        Name,
      });
      resolve({
        status: "OK",
        message: "create playlist success",
        data: catalogy,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const UpdateCatalogy = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let idCatalogy = "";
      const check = await Catalogy.findOne({ Id: id });
      if (check === null) {
        resolve({
          status: "ERR",
          message: "Catalogy is not exist",
        });
      }
      idCatalogy = check._id;
      const catalogy = await Catalogy.findOneAndUpdate(
        { _id: idCatalogy },
        data,
        {
          new: true,
        }
      );
      resolve({
        status: "OK",
        message: "Update Catalogy success",
        data: catalogy,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const DeleteCatalogy = (id, iduser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await Catalogy.findOne({ Id: id });
      if (check === null) {
        resolve({
          status: "ERR",
          message: "Playlist not exist",
        });
      }

      const checkUser = await User.findOne({ Id: iduser });
      if (checkUser.isAdmin) {
        const idCatalogy = check._id;
        await Catalogy.findByIdAndDelete({ _id: idCatalogy });
        resolve({
          status: "OK",
          message: "Delete catalogy success",
        });
      } else {
        resolve({
          status: "ERR",
          message: "Not have permission to delete that catalogy",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  CreateCatalogy,
  DeleteCatalogy,
  UpdateCatalogy,
};
