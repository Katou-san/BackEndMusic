const CategoryService = require("../Service/CategoryService");

const CreateCategory = async (req, res) => {
  const { Id, Name } = req.body;
  if (!Id || !Name) {
    return res.status(200).json({
      status: "ERR",
      message: "Category invalid",
    });
  }

  const response = await CategoryService.CreateCategory(req.body);
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

  const response = await CategoryService.UpdateCategory(Id, req.body);
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

  const response = await CategoryService.DeleteCategory(Id, IdUser);
  return res.status(200).json(response);
};

module.exports = { CreateCategory, UpdateCategory, DeleteCategory };
