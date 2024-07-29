const {
  SV__Get_Artist_V,
  SV__Find_Artist,
  SV__Create_Artist,
  SV__Update_Artist,
  SV__Delete_Artist,
  SV__Get_Current_Artist,
} = require("../Service/Service_Artist");

const CTL__Get_Current_Artist = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "Not found type" });
    }

    const respone_id = await SV__Get_Current_Artist(id);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Artist failed" });
  }
};

const CTL__Get_Artist = async (req, res) => {
  try {
    const Type = req.params.type;
    if (!Type) {
      return res.status(200).json({ status: 404, message: "Not found type" });
    }
    const respone_id = await SV__Get_Artist_V(Type);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Artist failed" });
  }
};

const CTL__Find_Artist = async (req, res) => {
  try {
    const Value = req.params.value;
    if (!Value) {
      return res
        .status(200)
        .json({ status: 404, message: "Information is missing! " });
    } else {
      const respone_id = await SV__Find_Artist(Value);
      return res.status(200).json(respone_id);
    }
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Artist failed" });
  }
};

const CTL__Create_Artist = async (req, res) => {
  try {
    const { Artist_Name } = req.body;
    if (!Artist_Name && String(Artist_Name).length > 2) {
      return res
        .status(200)
        .json({ status: 404, message: "Name artist is missing" });
    }

    const respone = await SV__Create_Artist(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Artist failed" });
  }
};

const CTL__Update_Artist = async (req, res) => {
  try {
    const Artist_Id = req.params.id;
    const { Artist_Name } = req.body;

    if (!Artist_Id) {
      return res
        .status(200)
        .json({ status: 404, message: "Not found id Artist" });
    }

    if (Artist_Name != undefined) {
      if (!Artist_Name && String(Artist_Name).length > 3) {
        return res
          .status(200)
          .json({ status: 404, message: "Name artist is missing" });
      }
    }
    const respone = await SV__Update_Artist(Artist_Id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Artist failed" });
  }
};

const CTL__Delete_Artist = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Delete_Artist(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Current_Artist,
  CTL__Get_Artist,
  CTL__Delete_Artist,
  CTL__Create_Artist,
  CTL__Find_Artist,
  CTL__Update_Artist,
};
