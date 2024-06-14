const { Reply } = require("../Model/Reply");
const { Like } = require("../Model/Like");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");

//todo done!
const SV__Get_Reply = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Reply.find({ Comment_Id: id });
      if (!result) {
        return resolve({ status: 404, message: "Not found Reply with id" });
      }

      return resolve({
        status: 200,
        message: "Get Reply complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Reply.js (SV_Get_Reply)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Reply = (data, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Comment_Id, Content } = data;

      const result = await Reply.create({
        Reply_Id: Create_Id("Reply", Math.floor(Math.random() * 1000)),
        Comment_Id,
        User_Id,
        Content,
      });
      resolve({
        status: 200,
        message: "Create Reply complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Reply.js (SV_Create_Reply)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Update_Reply = (id, data, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const UpdateData = Convert_vUpdate(data, [
        "_id",
        "Reply_Id",
        "Song_Id",
        "User_Id",
        "Post_Time",
      ]);
      const result = await Reply.findOneAndUpdate(
        { Reply_Id: id, User_Id },
        UpdateData,
        {
          new: true,
        }
      );
      if (!result) {
        return resolve({ status: 200, message: "Not found Reply with id" });
      }
      resolve({
        status: 200,
        message: "Updated Reply complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Reply.js (SV_Update_Reply)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Reply = (id, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Reply.findOneAndDelete({ Reply_Id: id, User_Id });
      if (!result) {
        return resolve({ status: 404, message: "Not found Reply with id" });
      }
      const Delete_Like = await Like.findOneAndDelete({ Topic_Id: id });
      if (!Delete_Like) {
      }
      resolve({
        status: 200,
        message: "Delete Reply complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Reply.js (SV_Delete_Reply)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Reply,
  SV__Update_Reply,
  SV__Delete_Reply,
  SV__Create_Reply,
};
