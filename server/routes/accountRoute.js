const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication.js");
const {
  getUserAccount,
  updateUserAccount,
} = require("../controllers/accountController.js");

const router = express.Router();

router.use(userAuthentication);

router.get("/:email", getUserAccount);
router.patch("/:id", updateUserAccount);

module.exports = router;
