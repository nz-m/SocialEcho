const nodemailer = require("nodemailer");
const UserPreference = require("../../models/UserPreference");
const User = require("../../models/User");
const EmailVerification = require("../../models/EmailVerification");
const { query, validationResult } = require("express-validator");
const { decryptData } = require("../../utils/encryption");
const { verifyEmailHTML } = require("../../utils/emailTemplates");

const BASE_URL = process.env.BASE_URL;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;

const verifyEmailValidation = [
  query("email").isEmail().normalizeEmail(),
  query("code").isLength({ min: 5, max: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

const sendVerificationEmail = async (req, res) => {
  const USER = decryptData(process.env.EMAIL);
  const PASS = decryptData(process.env.PASSWORD);
  const { email, name } = req.body;

  const verificationCode = Math.floor(10000 + Math.random() * 90000);
  const verificationLink = `${BASE_URL}/auth/verify?code=${verificationCode}&email=${email}`;

  try {
    // transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"SocialEcho" <${USER}>`,
      to: email,
      subject: "Verify your email address",
      html: verifyEmailHTML(name, verificationLink, verificationCode),
    });

    const newVerification = new EmailVerification({
      email,
      verificationCode,
      messageId: info.messageId,
    });

    await newVerification.save();

    res.status(200).json({
      message: `Verification email was successfully sent to ${email}`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const verifyEmail = async (req, res) => {
  const { code, email } = req.query;

  try {
    const [isVerified, verification] = await Promise.all([
      User.findOne({ email, isEmailVerified: true }),
      EmailVerification.findOne({ email, verificationCode: code }),
    ]);

    if (isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    if (!verification) {
      return res
        .status(400)
        .json({ message: "Verification code is invalid or has expired" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true }
    ).exec();

    await Promise.all([
      EmailVerification.deleteMany({ email }).exec(),
      new UserPreference({
        user: updatedUser,
        enableContextBasedAuth: true,
      }).save(),
    ]);

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sendVerificationEmail,
  verifyEmail,
  verifyEmailValidation,
};
