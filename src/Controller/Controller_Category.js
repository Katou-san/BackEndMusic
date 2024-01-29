const Service_Category = require("../Service/Service_Category");

const CreateCategory = async (req, res) => {
  const { Id, Name } = req.body;
  if (!Id || !Name) {
    return res.status(200).json({
      status: "ERR",
      message: "Category invalid",
    });
  }

  const response = await Service_Category.CreateCategory(req.body);
  return res.status(200).json(response);
};

const UpdateCategory = async (req, res) => {
  const { Id, Name } = req.body;
  if (!Id || !Name) {
    return res.status(200).json({
      status: "ERR",
      message: "Category invalid",
    });
  }

  const response = await Service_Category.UpdateCategory(Id, req.body);
  return res.status(200).json(response);
};

const DeleteCategory = async (req, res) => {
  const { Id, IdUser } = req.body;
  if (!Id) {
    return res.status(200).json({
      status: "ERR",
      message: "Category invalid",
    });
  }

  const response = await Service_Category.DeleteCategory(Id, IdUser);
  return res.status(200).json(response);
};

module.exports = { CreateCategory, UpdateCategory, DeleteCategory };
