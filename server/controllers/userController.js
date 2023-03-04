const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
// TODO - Invalidate old tokens/JTI
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
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const { filename } =
    req.files && req.files.length > 0 ? req.files[0] : { filename: null };
  const fileUrl = filename
    ? `${req.protocol}://${req.get("host")}/assets/userAvatars/${filename}`
    : null;

  const emailDomain = req.body.email.split("@")[1];
  const role = emailDomain === "mod.socialecho.com" ? "moderator" : "general";

  newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: role,
    avatar: fileUrl,
  });

  try {
    await newUser.save();
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
    const tokenPair = await RefreshToken.findOne({ accessToken });
    if (!tokenPair || tokenPair.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    await tokenPair.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
}

async function refreshToken(req, res) {
  const { refreshToken } = req.body;

  try {
    const existingToken = await RefreshToken.findOne({ refreshToken });
    if (!existingToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
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

async function getModProfile(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token, { complete: true });
  const userId = decodedToken.payload.id;

  try {
    const moderator = await User.findById(userId);
    if (!moderator) {
      return res.status(404).json({ message: "User not found" });
    }

    // exclude password from response
    const moderatorInfo = { ...moderator._doc };
    delete moderatorInfo.password;
    moderatorInfo.createdAt = moderatorInfo.createdAt.toLocaleString();

    return res.status(200).json({ moderatorInfo });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getUsers,
  addUser,
  signin,
  logout,
  refreshToken,
  getModProfile,
};
