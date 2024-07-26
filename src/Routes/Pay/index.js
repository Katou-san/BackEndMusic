const express = require("express");
const Router = express.Router();

const zalopay = require("./ZaloPay");
Router.use("/zalopay", zalopay);
module.exports = Router;
