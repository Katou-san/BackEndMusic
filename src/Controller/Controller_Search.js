const { SV__Search_All } = require("../Service/Service_Search");

const CTL__Search_All = async (req, res) => {
  try {
    const name = req.params.name;
    if (!name) {
      return res.status(200).json({
        message: "Invalid value",
        error: { search_: "Invalid value" },
        data: {},
      });
    }
    const result = await SV__Search_All(name);
    return res.status(200).json(result);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Role failed" });
  }
};

module.exports = {
  CTL__Search_All,
};
