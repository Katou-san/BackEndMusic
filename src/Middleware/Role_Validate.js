const { Role } = require("../Model/Role");
const { User } = require("../Model/User");

const Premium_Check = (email, id, role) => {
  return new Promise(async (resolve, reject) => {
    const Get_User = await User.findOne({
      User_Id: id,
      User_Email: email,
      Role: role,
    }).select({ is_Premium: 1 });
    if (!Get_User) return resolve(false);
    if (!Get_User.is_Premium) return resolve(false);
    return resolve(true);
  });
};

const Validate_Role = (Permission = [], Premium = false) => {
  return async (req, res, next) => {
    const Get_User = await User.findOne({
      User_Id: req.Id,
      User_Email: req.email,
      Role_Id: req.Role,
    });

    const Get_Role = await Role.findOne({ Role_Id: Get_User.Role_Id });
    if (!Get_Role) {
      return res.status(200).json({ status: 404, message: "Not found role" });
    }
    if (Permission.includes(String(Get_Role.Role_Name).toLowerCase())) {
      if (Premium && Get_Role.Role_Name.toLowerCase() == "client") {
        if (await Premium_Check(req.email, req.Id, req.Role)) {
          return next();
        } else {
          return res.status(200).json({
            status: 404,
            message: "You need to sign up for membership",
          });
        }
      } else {
        return next();
      }
    } else {
      return res
        .status(200)
        .json({ status: 404, message: "You dont have a permission" });
    }
  };
};

module.exports = { Validate_Role };
