const Service_Category = require("../Service/Service_Category");

const Get_All_Category = async (req, res) => {
  const response = await Service_Category.Get_All_Category_Service(req.body);
  return res.status(200).json(response);
};

const CreateCategory = async (req, res) => {
  const { Category_Id, Category_Name } = req.body;
  if (!Category_Id || !Category_Name) {
    return res.status(200).json({
      status: "ERR",
      message: "Category invalid",
    });
  }

  const response = await Service_Category.CreateCategory(req.body);
  return res.status(200).json(response);
};

const UpdateCategory = async (req, res) => {
  const { Catalogy_Id, Catalogy_Name } = req.body;
  if (!Catalogy_Id || !Catalogy_Name) {
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

module.exports = {
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
  Get_All_Category,
};
