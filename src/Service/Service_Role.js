const { Role } = require("../Model/Roles");

const Create_Role_Service = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Role_Id, Role_Name } = data;
      const check = await Role.findOne().or([
        { Role_Id: Role_Id },
        { Role_Name: Role_Name },
      ]);
      if (check !== null) {
        resolve({
          status: "404",
          message: "Role already have!",
        });
      }

      const role = await Role.create({
        Role_Id: "Role_" + Post_Time,
        Role_Name: Role_Name,
      });

      resolve({
        status: "200",
        message: "Role created!",
        data: role,
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { Create_Role_Service };
