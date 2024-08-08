const {
  SV__Search_All,
  SV__Search_Type,
} = require("../Service/Service_Search");

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

const CTL__Search_Type = async (req, res) => {
  try {
    const { name, type } = req.params;
    if (!name) {
      return res.status(200).json({
        message: "Invalid value",
        error: { search_: "Invalid value" },
        data: {},
      });
    }

    if (
      type != "artist" &&
      type != "user" &&
      type != "song" &&
      type != "playlist" &&
      type != "album"
    ) {
      return res.status(200).json({
        status: 404,
        message: "Type invalid",
        error: { search_: "Type invalid" },
        data: {},
      });
    }

    const result = await SV__Search_Type(name, type);
    return res.status(200).json(result);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Role failed" });
  }
};

module.exports = {
  CTL__Search_All,
  CTL__Search_Type,
};
