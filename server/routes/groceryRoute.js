const express = require("express");
const userAuthentication = require("../middlewares/userAuthentication.js");
const {
  postUserGrocery,
  getUserGrocery,
  updateUserGrocery,
  deleteUserGrocery,
} = require("../controllers/groceryController.js");

const router = express.Router();

router.use(userAuthentication);

router.post("/", postUserGrocery);

router
  .route("/:id")
  .get(getUserGrocery)
  .patch(updateUserGrocery)
  .delete(deleteUserGrocery);

module.exports = router;
