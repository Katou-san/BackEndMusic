const Service_Search = require("../Service/Service_Search");

const Search_All = async (req, res) => {
  try {
    const response = await Service_Search.Search_All(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: "404",
      message: "Search All Error",
    });
  }
};

module.exports = {
  Search_All,
};
