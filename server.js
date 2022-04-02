const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require("./Routes/routes");

const cors = require("cors");
app.use(cors());

app.use(express.json()); // So that, this api can read json data from request body...

const auth = require("./Middlewares/auth");

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    app.listen(process.env.PORT || 3003, () => {
      console.log("connected to db successfully!!");
      console.log("Server started running...");
    });
  })
  .catch((err) => console.log(err, "error while connecting to data base"));

app.get("/", (req, res, next) => {
  res.send("welcome");
});

app.get("/authenticate/:jwtToken", auth.authenticateUser);
app.use(routes);
