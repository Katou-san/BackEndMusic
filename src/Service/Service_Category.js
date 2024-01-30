const { Category } = require("../Model/Category");
const { User } = require("../Model/User");

const Get_All_Category_Service = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Values_Category = await Category.find();
      resolve({
        status: 200,
        message: "Get add Category success",
        data: Values_Category,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Create_Category_Service = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Category_Id, Category_Name } = data;
    try {
      const check = await Category.findOne({ Category_Id });
      if (check !== null) {
        resolve({
          status: 404,
          message: "Category is exist",
        });
      }
      const category = await Category.create({
        Category_Id,
        Category_Name,
      });

      resolve({
        status: 200,
        message: "create Category success",
        data: category,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Update_Category_Service = (id, data) => {
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

const Delete_Category_Service = (id, iduser) => {
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
  Create_Category_Service,
  Delete_Category_Service,
  Update_Category_Service,
  Get_All_Category_Service,
};
