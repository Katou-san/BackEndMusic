const UserRouter = require("./client/Routes_User");
const SongRouter = require("./client/Routes_song");
const PlaylistRoutes = require("./client/Routes_Playlist");
const CategoryRoutes = require("./client/Routes_Category");
const SendFile = require("./client/Routes_Send_File");
const verify_JWT = require("./client/Routes_JWT");
const Search = require("./client/Routes_Search");
const RoleRouter = require("./client/Routes_Role");

const RouterAdmin = require("./admin");
const RouterClient = require("./client");
const routes = (app) => {
  //Todo Client routes
  //?  localhost:8080/api/user
  app.use("/api/user", UserRouter);

  //?  localhost:8080/api/user
  app.use("/api/song", SongRouter);

  //?  localhost:8080/api/user
  app.use("/api/category", CategoryRoutes);

  //?  localhost:8080/api/user
  app.use("/api/playlist", PlaylistRoutes);

  //?  localhost:8080/api/user
  app.use("/api/send", SendFile);

  //?  localhost:8080/api/user
  app.use("/api/verifyT", verify_JWT);

  //?  localhost:8080/api/user
  app.use("/api/search", Search);

  //?  localhost:8080/api/user
  app.use("/api/Role", RoleRouter);
  //Todo Client routes
  app.use("/api/v1/", RouterClient);
  //?  localhost:8080/api/v1/user
  //?  localhost:8080/api/v1/song
  //?  localhost:8080/api/v1/playlist

  //Todo Admin routes
  app.use("/api/admin/v1/", RouterAdmin);
  //?  localhost:8080/api/admin/v1/user
  //?  localhost:8080/api/admin/v1/employees
  //?  localhost:8080/api/admin/v1/role
  //?  localhost:8080/api/admin/v1/category
  //?  localhost:8080/api/admin/v1/song
  //?  localhost:8080/api/admin/v1/playlist
};

module.exports = routes;
