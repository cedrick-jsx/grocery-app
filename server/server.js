require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute.js");
const accountRoute = require("./routes/accountRoute.js");
const groceryRoute = require("./routes/groceryRoute.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/account", accountRoute);
app.use("/api/grocery", groceryRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT, () => {
      console.log("Listening on Port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
