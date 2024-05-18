const { Category } = require("../Model/Category");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");

const SV__Get_Category = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id != null) {
        const result = await Category.findOne({ Category_Id: id });
        if (!result) {
          return resolve({
            status: 200,
            message: "Not found Category with id",
          });
        }
        return resolve({
          status: 200,
          message: "Get Category complete!",
          data: result,
        });
      }

      const allCategorys = await Category.find();
      resolve({
        status: 200,
        message: "get all Categorys complete!",
        data: allCategorys,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Category.js (SV_Get_Category)",
      });
      throw new Error(err);
    }
  });
};

const SV__Create_Category = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Category_Name } = data;
      const findCate = await Category.findOne({ Category_Name });
      if (findCate) {
        return resolve({
          status: 404,
          message: "Category is exist",
        });
      }

      const result = await Category.create({
        Category_Id: Create_Id("Category", Category_Name),
        Category_Name,
      });

      resolve({
        status: 200,
        message: "create Category success",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const SV__Update_Category = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Update_Value = Convert_vUpdate(data, ["Category_Id", "_id"]);
      const result = await Category.findOneAndUpdate(
        { Category_Id: id },
        Update_Value,
        {
          new: true,
        }
      );

      if (!result) {
        return resolve({ status: 200, message: "Not found Category with id" });
      }

      resolve({
        status: 200,
        message: "Updated Category complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Category.js (SV_Update_Category)",
      });
      throw new Error(err);
    }
  });
};

const SV__Delete_Category = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Category.findOneAndDelete({ Category_Id: id });
      if (!result) {
        return resolve({ status: 200, message: "Not found Category with id" });
      }
      resolve({
        status: 200,
        message: "Delete Category complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Category.js (SV_Delete_Category)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Category,
  SV__Update_Category,
  SV__Delete_Category,
  SV__Create_Category,
};
