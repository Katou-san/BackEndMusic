const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./Routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

routes(app);

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("Connect Database successfully!");
  })
  .catch((err) => {
    console.log("Connect Database failed!");
  });

app.listen(port, () => {
  console.log("Server is running in http://localhost:" + port);
});
