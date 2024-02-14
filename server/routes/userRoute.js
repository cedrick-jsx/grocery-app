const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", (request, response) => {
  response.status(200).json({ message: "Server is running" });
});

router.post("/login", loginUser);
router.post("/signup", signupUser);

module.exports = router;
