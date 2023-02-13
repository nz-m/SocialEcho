const bcrypt = require("bcrypt");
const User = require("../models/User");

function getUsers(req, res, next) {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => next(err));
}

// add user
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // if (req.files.length > 0) {
  //   newUser = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: hashedPassword,
  //     avatar: req.files[0].filename,
  //     role: req.body.role,
  //   });
  // } else {
    newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
  // }

  // save user
  try {
    const user = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User added successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User not added",
      error: err.message,
    });
  }
}

module.exports = {
  getUsers,
  addUser,
};
