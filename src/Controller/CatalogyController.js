const CatalogyService = require("../Service/CatalogyService");

const CreateCatalogy = async (req, res) => {
  const { Id, Name } = req.body;
  if (!Id || !Name) {
    return res.status(200).json({
      status: "ERR",
      message: "Catalogy invalid",
    });
  }

  const response = await CatalogyService.CreateCatalogy(req.body);
  return res.status(200).json(response);
};

const UpdateCatalogy = async (req, res) => {
  const { Id, Name } = req.body;
  if (!Id || !Name) {
    return res.status(200).json({
      status: "ERR",
      message: "Catalogy invalid",
    });
  }

  const response = await CatalogyService.UpdateCatalogy(Id, req.body);
  return res.status(200).json(response);
};

const DeleteCatalogy = async (req, res) => {
  const { Id, IdUser } = req.body;
  if (!Id) {
    return res.status(200).json({
      status: "ERR",
      message: "Catalogy invalid",
    });
  }

  const response = await CatalogyService.DeleteCatalogy(Id, IdUser);
  return res.status(200).json(response);
};

module.exports = { CreateCatalogy, UpdateCatalogy, DeleteCatalogy };
