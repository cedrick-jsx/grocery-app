require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);

app.get("/api/server", (request, response) => {
  response.status(200).json({ message: "Server is running" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to Database");
      console.log("Listening on Port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

module.exports = app;
