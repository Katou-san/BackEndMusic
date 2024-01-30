const UserRouter = require("./Routes_User");
const SongRouter = require("./Routes_Song");
const PlaylistRoutes = require("./Routes_Playlist");
const CategoryRoutes = require("./Routes_Category");
const SendFile = require("./Routes_Send_File");
const verify_JWT = require("./Routes_JWT");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/song", SongRouter);
  app.use("/api/category", CategoryRoutes);
  app.use("/api/playlist", PlaylistRoutes);
  app.use("/api/send", SendFile);
  app.use("/api/verifyT", verify_JWT);
};

module.exports = routes;
