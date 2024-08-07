const express = require("express");
const fs = require("fs");
const { User } = require("../../Model/User");
const Router = express.Router();

Router.get("/visit", async (req, res) => {
  try {
    const json = fs.readFileSync("./src/Assets/count.json", "utf-8");
    const obj = JSON.parse(json);
    obj.visits++;
    const newJSON = JSON.stringify(obj);
    fs.writeFileSync("./src/Assets/count.json", newJSON);
    return res.status(200).json(newJSON);
  } catch (e) {
    console.log(e);
  }
});

Router.get("/Test343", async (req, res) => {
  const a = await User.aggregate([
    {
      $match: {
        $and: [
          {
            $or: [
              { $text: { $search: "client" } },
              { User_Name: RegExp("client", "i") },
            ],
          },
          { is_Admin: false, Status: 1 },
        ],
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "User_Id",
        foreignField: "Following",
        as: "follower_list",
      },
    },
    {
      $project: {
        _id: 0,
        User_Id: 1,
        User_Email: 1,
        User_Name: 1,
        Color: 1,
        Avatar: 1,
        Role_Id: 1,
        Create_date: 1,
        follower: { $size: "$follower_list" },
      },
    },
    { $sort: { follower: -1 } },
    { $limit: 20 },
  ]);

  console.log(a);
  return res.status(200).json(a);
});

module.exports = Router;
