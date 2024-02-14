require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute.js");
const path = require("path");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);

app.get("/api/server", (request, response) => {
  response.status(200).json({ message: "Server is running" });
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (request, response) => {
  try {
    response.sendFile(path.join(__dirname, "/client/build/index.html"));
  } catch (err) {
    response.status(400).send(err);
  }
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to Database");
      console.log("Listening on Port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
