const { User } = require("../Model/User");
const { Song } = require("../Model/Song");

const fs = require("fs");
const { Subscription } = require("../Model/Subscription");
const { Bill } = require("../Model/Bill");

const SV_Get_Dashboard_1 = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const Song_num = await Song.aggregate([{ $count: "Song_Number" }]);

      const User_num = await User.aggregate([
        {
          $match: {
            is_Admin: false,
            Role_Id: "@Role20245122193264076client",
          },
        },
        { $count: "user_number" },
      ]);

      const Revenue_num = await Subscription.aggregate([
        {
          $lookup: {
            from: "bills",
            localField: "Sub_Id",
            foreignField: "Sub_Id",
            as: "result",
          },
        },
        {
          $project: {
            total: {
              $multiply: ["$Price", { $size: "$result" }],
            },
          },
        },
        {
          $group: {
            _id: "totalRevenue",
            totalValue: { $sum: { $sum: "$total" } },
          },
        },
        { $project: { _id: 0, totalValue: 1 } },
      ]);
      const json = fs.readFileSync("./src/Assets/count.json", "utf-8");

      return resolve({
        status: 200,
        message: "Get dashboard complete!",
        data: {
          Song_num: Song_num[0].Song_Number,
          User_num: User_num[0].user_number,
          Revenue_num: Revenue_num[0].totalValue,
          Visit_num: JSON.parse(json).visits,
        },
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Song.js (SV_Get_Dashboard_1)",
      });
      throw new Error(err);
    }
  });
};

const SV_Get_Dashboard_char1 = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const Revenue_char_data = await Bill.aggregate([
        {
          $lookup: {
            from: "subscriptions",
            localField: "Sub_Id",
            foreignField: "Sub_Id",
            as: "result",
          },
        },
        { $unwind: { path: "$result" } },
        {
          $project: {
            _id: 0,
            price: "$result.Price",
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
        },
        {
          $group: {
            _id: { month: "$month", year: "$year" },
            reve: { $sum: "$price" },
          },
        },
        {
          $project: {
            _id: 0,
            reve: 1,
            month: "$_id.month",
            year: "$_id.year",
            title: {
              $concat: [
                { $toString: "$_id.month" },
                "-",
                { $toString: "$_id.year" },
              ],
            },
          },
        },
        { $sort: { year: -1, month: 1 } },
      ]);

      return resolve({
        status: 200,
        message: "Get dashboard_char1 complete!",
        data: Revenue_char_data,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Song.js (SV_Get_Dashboard_char1)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV_Get_Dashboard_1,
  SV_Get_Dashboard_char1,
};
