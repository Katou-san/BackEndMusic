const { Category } = require("../Model/Category");
const { User } = require("../Model/User");

const CreateCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Id, Name } = data;
    try {
      const check = await Category.findOne({ Id: Id });
      if (check !== null) {
        resolve({
          status: "ERR",
          message: "Category is exist",
        });
      }
      const category = await Category.create({
        Id,
        Name,
      });
      resolve({
        status: "OK",
        message: "create playlist success",
        data: category,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const UpdateCategory = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let idCategory = "";
      const check = await Category.findOne({ Id: id });
      if (check === null) {
        resolve({
          status: "ERR",
          message: "Category is not exist",
        });
      }
      idCategory = check._id;
      const category = await Category.findOneAndUpdate(
        { _id: idCategory },
        data,
        {
          new: true,
        }
      );
      resolve({
        status: "OK",
        message: "Update Category success",
        data: category,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const DeleteCategory = (id, iduser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await Category.findOne({ Id: id });
      if (check === null) {
        resolve({
          status: "ERR",
          message: "Playlist not exist",
        });
      }

      const checkUser = await User.findOne({ Id: iduser });
      if (checkUser.isAdmin) {
        const idCategory = check._id;
        await Category.findByIdAndDelete({ _id: idCategory });
        resolve({
          status: "OK",
          message: "Delete Category success",
        });
      } else {
        resolve({
          status: "ERR",
          message: "Not have permission to delete that Category",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
};
