const { SV__Login_Google } = require("../Service/Service_Google");

const CTL__Login_Google = async (req, res) => {
  try {
    const result = await SV__Login_Google(req.body);
    return res.status(200).json(result);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Login Google fail!" });
  }
};

module.exports = {
  CTL__Login_Google,
};
