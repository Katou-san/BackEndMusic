const { User } = require("../Model/User");
const { Song } = require("../Model/Song");
const fs = require("fs");

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

      const json = fs.readFileSync("./src/Assets/count.json", "utf-8");

      return resolve({
        status: 200,
        message: "Get dashboard complete!",
        data: {
          Song_num: Song_num[0].Song_Number,
          User_num: User_num[0].user_number,
          Revenue_num: 0,
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

module.exports = {
  SV_Get_Dashboard_1,
};
