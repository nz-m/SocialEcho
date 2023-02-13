const express = require("express");
const router = express.Router();

// internal imports

const { getUsers, addUser } = require("../controllers/userController");

const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/usersValidator");
const avatarUpload = require("../middlewares/users/avatarUpload");

//get all users
router.get("/", getUsers);

//add user
router.post(
  "/",
  // avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser
);

//get user by id
// router.get("/:id", getUserById);

module.exports = router;
