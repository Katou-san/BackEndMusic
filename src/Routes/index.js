const dotenv = require("dotenv");
dotenv.config();
const RouterAdmin = require("./admin");
const RouterClient = require("./client");
const RouterSend = require("./Send");
const RouterPay = require("./Pay");
const routes = (app) => {
  //Todo Send File routes
  app.use("/api/v1/send", RouterSend);
  //?  localhost:8080/api/v1/send

  //Todo Pays routes
  app.use("/api/v1/pay", RouterPay);
  // app.post(`/api/v1/pay/callback`, () => {
  //   console.log("hello");
  // });
  //?  localhost:8080/api/v1/pay/vnpay
  //?  localhost:8080/api/v1/pay/momo

  //Todo Client routes
  app.use("/api/v1/", RouterClient);
  //?  localhost:8080/api/v1/user
  //?  localhost:8080/api/v1/employees
  //?  localhost:8080/api/v1/category
  //?  localhost:8080/api/v1/song
  //?  localhost:8080/api/v1/playlist
  //?  localhost:8080/api/v1/bill
  //?  localhost:8080/api/v1/comment
  //?  localhost:8080/api/v1/reply
  //?  localhost:8080/api/v1/like
  //?  localhost:8080/api/v1/repost
  //?  localhost:8080/api/v1/storage
  //?  localhost:8080/api/v1/track
  //?  localhost:8080/api/v1/premium

  //Todo Admin routes
  app.use("/api/admin/v1/", RouterAdmin);
  //?  localhost:8080/api/admin/v1/user
  //?  localhost:8080/api/admin/v1/employees
  //?  localhost:8080/api/admin/v1/role
  //?  localhost:8080/api/admin/v1/category
  //?  localhost:8080/api/admin/v1/song
  //?  localhost:8080/api/admin/v1/playlist
  //?  localhost:8080/api/admin/v1/bill
  //?  localhost:8080/api/admin/v1/comment
  //?  localhost:8080/api/admin/v1/reply
  //?  localhost:8080/api/admin/v1/like
  //?  localhost:8080/api/admin/v1/repost
  //?  localhost:8080/api/admin/v1/storage
  //?  localhost:8080/api/admin/v1/track
  //?  localhost:8080/api/admin/v1/premium
};

module.exports = routes;
