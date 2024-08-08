const { Comment } = require("../Model/Comment");
const { Song } = require("../Model/Song");
const { Convert_vUpdate, Get_Only__Array } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");
const { match, join, project } = require("../Util/QueryDB");

const getValue = {
  _id: 0,
  Comment_Id: 1,
  Song_Id: 1,
  User_Id: 1,
  Content: 1,
  Post_Time: 1,
};

//todo done!
const SV__Get_Comment = (Song_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await Comment.aggregate([
        match("Song_Id", Song_Id),
        join("users", "User_Id", "User_Id", "User"),
        project(getValue, { User: "$User" }),
        {
          $unwind: "$User",
        },
      ]).sort({ Post_Time: -1 });

      const result = Get_Only__Array(value, "User", ["User_Name", "Avatar"]);
      return resolve({
        status: 200,
        message: "Get comment for song complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Comment.js (SV_Get_Comment)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Comment = (data, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Song_Id, Content } = data;
      const Check_Song = Song.findOne({ Song_Id });
      if (!Check_Song) {
        return resolve({
          status: 404,
          message: "Song not found!",
          error: "Song not found!",
          data: {},
        });
      }
      const result = await Comment.create({
        Comment_Id: Create_Id("Comment"),
        Song_Id,
        User_Id,
        Content,
      });
      resolve({
        status: 200,
        message: "Create Comment complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Comment.js (SV_Create_Comment)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Update_Comment = (Comment_Id, data, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const UpdateData = Convert_vUpdate(data, [
        "_id",
        "Comment_Id",
        "Song_Id",
        "User_Id",
        "Post_Time",
      ]);
      const result = await Comment.findOneAndUpdate(
        { Comment_Id, User_Id },
        UpdateData,
        {
          new: true,
        }
      );
      if (!result) {
        return resolve({ status: 200, message: "Not found Comment with id" });
      }
      resolve({
        status: 200,
        message: "Updated Comment complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Comment.js (SV_Update_Comment)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Comment = (Comment_Id, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Comment.findOneAndDelete({
        Comment_Id,
        User_Id,
      });
      if (!result) {
        return resolve({ status: 404, message: "Not found Comment with id" });
      }
      resolve({
        status: 200,
        message: "Delete Comment complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Comment.js (SV_Delete_Comment)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Comment,
  SV__Update_Comment,
  SV__Delete_Comment,
  SV__Create_Comment,
};
