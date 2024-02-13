require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute.js");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(cors(
  {
    origin:["https://cedrick-grocery-app.vercel.app"],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
));
app.options('*', cors());

app.use(express.json());
app.use("/api/user", userRoute);

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
