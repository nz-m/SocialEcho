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
      accessToken,
    });
    await newRefreshToken.save();

    // send BOTH tokens to client AND the user data
    res.status(200).json({
      accessToken,
      refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
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

async function logout(req, res) {
  const { refreshToken } = req.body;
  const accessToken = req.headers.authorization?.split(" ")[1];

  try {
    // Find the associated refresh token for the access token
    const tokenPair = await RefreshToken.findOne({ accessToken });
    if (!tokenPair || tokenPair.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Remove the access and refresh tokens from the database
    await tokenPair.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function refreshToken(req, res) {
  const { refreshToken } = req.body;

  try {
    // Check if refresh token is valid
    const existingToken = await RefreshToken.findOne({ refreshToken });
    if (!existingToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Get the user associated with the refresh token
    const existingUser = await User.findById(existingToken.user);
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const refreshTokenExpiresAt =
      jwt.decode(existingToken.refreshToken).exp * 1000;
    if (Date.now() >= refreshTokenExpiresAt) {
      await existingToken.deleteOne();
      return res.status(401).json({ message: "Expired refresh token" });
    }

    const payload = {
      id: existingUser._id,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1h",
    });

    // Update expiry time of existing refresh token
    existingToken.refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });
    await existingToken.save();

    // Return new access token
    return res.status(200).json({
      accessToken,
      refreshToken: existingToken.refreshToken,
      accessTokenUpdatedAt: new Date().toLocaleString(),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getUsers,
  addUser,
  signin,
  logout,
  refreshToken,
};
