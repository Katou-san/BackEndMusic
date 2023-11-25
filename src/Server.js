const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./Routes");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
routes(app);

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("connect mongoDB success");
  })
  .catch((err) => {
    console.log("connect fail");
  });
app.listen(port, () => {
  console.log("Server is running in http://localhost:" + port);
});
