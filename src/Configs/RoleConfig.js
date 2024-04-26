const { Role } = require("../Model/Role");

const Validate_Role = (Permission = []) => {
  return async (req, res, next) => {
    const Get_Role = await Role.findOne({ Role_Id: req.Role });
    if (!Get_Role) {
      return res.status(200).json({ status: 404, message: "Not found role" });
    }
    if (Permission.includes(String(Get_Role.Role_Name).toLowerCase())) {
      next();
    } else {
      return res
        .status(200)
        .json({ status: 404, message: "You dont have a permission" });
    }
  };
};

module.exports = { Validate_Role };
