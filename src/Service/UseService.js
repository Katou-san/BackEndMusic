const { User } = require("../Model/User");

const CreateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Id, Name, Email, Pass } = data;
    try {
      const check = await User.findOne({ Email: Email });
      if (check !== null) {
        resolve({
          status: "ERR",
          message: "email is already",
        });
      }

      console.log(Name);
      const user = await User.create({ Id, Name, Email, Pass });
      resolve({
        status: "OK",
        message: "create user success",
        data: user,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const UpdateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let idUser = "";
      const checkUserEmail = await User.findOne({ Email: id });
      if (checkUserEmail === null) {
        resolve({
          status: "ERR",
          message: "Not checkuser is null found",
        });
      }
      idUser = checkUserEmail._id;
      const user = await User.findOneAndUpdate({ _id: idUser }, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "update user success",
        data: user,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const DeletaUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserEmail = await User.findOne({ Email: id });
      if (checkUserEmail === null) {
        resolve({
          status: "ERR",
          message: "Not checkuser is null found",
        });
      }
      const idUser = checkUserEmail._id;
      await User.findByIdAndDelete({ _id: idUser });
      resolve({
        status: "OK",
        message: "Deleta user success",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const CheckUser = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Email, Pass } = data;
    try {
      const checkE = await User.findOne({ Email: Email });
      if (checkE == null) {
        resolve({
          status: "ERR",
          message: "not found Email",
        });
      }

      if (checkE.Pass === Pass) {
        resolve({
          status: "OK",
          message: "Login success",
          data: checkE,
        });
      }

      resolve({
        status: "ERR",
        message: "Login fail",
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { CreateUser, UpdateUser, DeletaUser, CheckUser };
