const UserRouter = require("./Routes_User");
const SongRouter = require("./Routes_Song");
const PlaylistRoutes = require("./Routes_Playlist");
const CatalogyRoutes = require("./Routes_Category");
const SendFile = require("./Routes_Send_File");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/song", SongRouter);
  app.use("/api/catalogy", CatalogyRoutes);
  app.use("/api/playlist", PlaylistRoutes);
  app.use("/api/send", SendFile);
};

module.exports = routes;
