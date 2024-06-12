const Service_Category = require("../Service/Service_Category");

const Get_All_Category = async (req, res) => {
  const response = await Service_Category.Get_All_Category_Service(req.body);
  return res.status(200).json(response);
};

const Create_Category = async (req, res) => {
  const { Category_Id, Category_Name } = req.body;
  if (!Category_Id || !Category_Name) {
    return res.status(200).json({
      status: "ERR",
      message: "Category invalid",
    });
  }

  const response = await Service_Category.Create_Category_Service(req.body);
  return res.status(200).json(response);
};

const Update_Category = async (req, res) => {
  const { Catalogy_Id, Catalogy_Name } = req.body;
  if (!Catalogy_Id || !Catalogy_Name) {
    return res.status(200).json({
      status: "ERR",
      message: "Category invalid",
    });
  }

  const response = await Service_Category.Update_Category_Service(Id, req.body);
  return res.status(200).json(response);
};

const Delete_Category = async (req, res) => {
  const { Id, IdUser } = req.body;
  if (!Id) {
    return res.status(200).json({
      status: "ERR",
      message: "Category invalid",
    });
  }

  const response = await Service_Category.Delete_Category_Service(Id, IdUser);
  return res.status(200).json(response);
};

module.exports = {
  Create_Category,
  Update_Category,
  Delete_Category,
  Get_All_Category,
};
