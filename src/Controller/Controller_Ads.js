const {
  SV__Get_Ads,
  SV__Create_Ads,
  SV__Update_Ads,
  SV__Delete_Ads,
} = require("../Service/Service_Ads");

const CTL__Get_Ads = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      const respone_id = await SV__Get_Ads(null);
      return res.status(200).json(respone_id);
    }
    const respone_id = await SV__Get_Ads(id);
    return res.status(200).json(respone_id);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Artist failed" });
  }
};

const CTL__Create_Ads = async (req, res) => {
  try {
    const {
      Ads_Name,
      Partner_Id,
      Ads_Image,
      Ads_Audio,
      Content,
      Start_time,
      End_time,
    } = req.body;
    if (
      !Ads_Name ||
      !Partner_Id ||
      !Ads_Image ||
      !Ads_Audio ||
      !Content ||
      !Start_time ||
      !End_time
    ) {
      return res
        .status(200)
        .json({ status: 404, message: "Info ads is missing!" });
    }

    if (!req.Id) {
      return res
        .status(200)
        .json({ status: 404, message: "User id is missing!" });
    }

    const respone = await SV__Create_Ads(req.Id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Create Artist failed" });
  }
};

const CTL__Update_Ads = async (req, res) => {
  try {
    const Artist_Id = req.params.id;

    if (!Artist_Id) {
      return res
        .status(200)
        .json({ status: 404, message: "Not found id Artist" });
    }

    const respone = await SV__Update_Ads(Artist_Id, req.body);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Update Artist failed" });
  }
};

const CTL__Delete_Ads = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({ status: 404, message: "id is empty" });
    }
    const respone = await SV__Delete_Ads(id);
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res
      .status(404)
      .json({ status: 404, message: "Delete user failed " });
  }
};

module.exports = {
  CTL__Get_Ads,
  CTL__Delete_Ads,
  CTL__Create_Ads,
  // CTL__Find_Ads,
  CTL__Update_Ads,
};
