const {
  SV__Get_Slider,
  SV__Get_Trending_Playlist,
  SV__Get_Trending_Album,
  SV__Get_Trending_Song,
  SV__Get_Trending_Artist,
  SV__Get_Trending_Season,
} = require("../Service/Service_Trending");

const CTL__Get_Slider = async (req, res) => {
  try {
    const respone = await SV__Get_Slider();
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Track failed" });
  }
};

const CTL__Get_Trending_Playlist = async (req, res) => {
  try {
    const respone = await SV__Get_Trending_Playlist();
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Track failed" });
  }
};

const CTL__Get_Trending_Album = async (req, res) => {
  try {
    const respone = await SV__Get_Trending_Album();
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Track failed" });
  }
};

const CTL__Get_Trending_Song = async (req, res) => {
  try {
    const respone = await SV__Get_Trending_Song();
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Track failed" });
  }
};

const CTL__Get_Trending_Artist = async (req, res) => {
  try {
    const respone = await SV__Get_Trending_Artist();
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Track failed" });
  }
};

const CTL__Get_Trending_Season = async (req, res) => {
  try {
    const respone = await SV__Get_Trending_Season();
    return res.status(200).json(respone);
  } catch (e) {
    new Error(e.message);
    return res.status(404).json({ status: 404, message: "Get Track failed" });
  }
};

module.exports = {
  CTL__Get_Slider,
  CTL__Get_Trending_Playlist,
  CTL__Get_Trending_Album,
  CTL__Get_Trending_Song,
  CTL__Get_Trending_Artist,
  CTL__Get_Trending_Season,
};
