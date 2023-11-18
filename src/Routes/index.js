// const SongRouter = require("../Routes/SongRoutes");
const UserRouter = require("./userRoutes");
const routes = (app) => {
  app.use("/api/user", UserRouter);
  // app.use("/api/song", SongRouter);
};

module.exports = routes;
