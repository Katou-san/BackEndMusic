const Service_Role = require("../Service/Service_Role");

const Create_Role = async (req, res) => {
  try {
    const response = await Service_Role.Create_Role_Service(req.body);
    return res.status(200).json({
      status: 200,
      message: "Role created successfully",
      data: response,
    });
  } catch (err) {
    return res.status(404).json({
      status: "404",
      message: "Can not create Role",
    });
  }
};

module.exports = { Create_Role };
