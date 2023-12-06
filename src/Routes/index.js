const UserRouter = require("./userRoutes");
const SongRouter = require("./songRoutes");
const PlaylistRoutes = require("./playlistRoutes");
const CatalogyRoutes = require("./categoryRoutes");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/song", SongRouter);
  app.use("/api/catalogy", CatalogyRoutes);
  app.use("/api/playlist", PlaylistRoutes);
};

module.exports = routes;
