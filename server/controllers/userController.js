const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");


// sign in
async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    // delete existing refresh token for user
    await RefreshToken.deleteOne({ user: existingUser._id });

    // create new instance of RefreshToken model and save to database
    const newRefreshToken = new RefreshToken({
      user: existingUser._id,
      refreshToken,
    });
    await newRefreshToken.save();

    // send token and refresh token to client
    res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function getUsers(req, res, next) {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => next(err));
}

// add user
async function addUser(req, res, next) {
  console.log(req.body);
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    const { filename } = req.files[0];
    newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      avatar: filename,
    });
  } else {
    newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      avatar: null,
    });
  }

  // save user
  try {
    const user = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User added successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "User not added",
      error: err.message,
    });
  }
}

module.exports = {
  getUsers,
  addUser,
  signin,
};
