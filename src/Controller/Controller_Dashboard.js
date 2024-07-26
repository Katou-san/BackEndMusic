const {
  SV_Get_Dashboard_1,
  SV_Get_Dashboard_char1,
} = require("../Service/Service_Dashboard");

const CTL_Get_Dashboard_1 = async (req, res) => {
  try {
    const respone_1 = await SV_Get_Dashboard_1();
    return res.status(200).json(respone_1);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Get dashboard failed" });
  }
};

const CTL_Get_Dashboard_char1 = async (req, res) => {
  try {
    const respone_1 = await SV_Get_Dashboard_char1();
    return res.status(200).json(respone_1);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Get dashboard char failed" });
  }
};

module.exports = {
  CTL_Get_Dashboard_1,
  CTL_Get_Dashboard_char1,
};
