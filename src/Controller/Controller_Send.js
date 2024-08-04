var formidable = require("formidable");
var fs = require("fs");
const path = require("path");

const Send_Song_Audio = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = { root: path.join(__dirname, "../Assets/Song_Audio") };

    if (!Id || Id == "null") {
      return res.sendFile(`default.png`, filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const Send_Song_Img = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = { root: path.join(__dirname, "../Assets/Song_Image") };

    if (!Id || Id == "null") {
      return res.sendFile(`default.png`, filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const Send_User_Avatar = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = { root: path.join(__dirname, "../Assets/User_Avatar") };

    if (!Id || Id == "null") {
      return res.sendFile(`default.png`, filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const Send_Playlist_Img = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = { root: path.join(__dirname, "../Assets/Playlist_Img") };

    if (!Id || Id == "null") {
      return res.sendFile(`default.png`, filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const Send_Playlist_Thumbnail = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = {
      root: path.join(__dirname, "../Assets/Playlist_Thumbnail"),
    };

    if (!Id || Id == "null") {
      return res.sendFile(`default.png`, filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const Send_Logo = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = {
      root: path.join(__dirname, "../Assets/Partner"),
    };

    if (!Id || Id == "null") {
      return res.sendFile(`default.png`, filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const Send_Ads_Image = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = {
      root: path.join(__dirname, "../Assets/Ads/Image"),
    };

    if (!Id || Id == "null") {
      return res.sendFile(`default.png`, filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const Send_Ads_Audio = async (req, res) => {
  try {
    const { Id } = req.params;
    const filePath = {
      root: path.join(__dirname, "../Assets/Ads/Audio"),
    };

    if (!Id || Id == "null") {
      return res.sendFile(`default.png`, filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    return res.sendFile(`${Id}`, filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = {
  Send_Song_Audio,
  Send_Song_Img,
  Send_User_Avatar,
  Send_Playlist_Thumbnail,
  Send_Playlist_Img,
  Send_Logo,
  Send_Ads_Image,
  Send_Ads_Audio,
};
