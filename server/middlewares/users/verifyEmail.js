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
      for: "signup",
    });

    await newVerification.save();

    res.status(200).json({
      message: `Verification email was successfully sent to ${email}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const sendLoginVerificationEmail = async (req, res) => {
  const USER = decryptData(process.env.EMAIL);
  const PASS = decryptData(process.env.PASSWORD);

  const mismatchedProps = req.mismatchedProps;
  const currentContextData = req.currentContextData;

  const userId = req.user._id;
  const email = req.user.email;
  const name = req.user.name;

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
      subject: "New login attempt detected",
      html: `
          <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      <p>Hi ${name},</p>
      <p>Our system has detected that a new login was attempted using the following details:</p>
      <ul style="list-style: none; padding-left: 0;">
        <li><strong>Time:</strong> ${currentContextData.time}</li>
        <li><strong>IP Address:</strong> ${currentContextData.ip}</li>
        <li><strong>Location:</strong> ${currentContextData.city}, ${currentContextData.country}</li>
        <li><strong>Device:</strong> ${currentContextData.device} ${currentContextData.deviceType}</li>
        <li><strong>Browser:</strong> ${currentContextData.browser}</li>
        <li><strong>Operating System:</strong> ${currentContextData.os}</li>
        <li><strong>Platform:</strong> ${currentContextData.platform}</li>
      </ul>
      <p>Please verify that this login was authorized. If you believe this was an unauthorized attempt, please contact our support team immediately.</p>
    </div>

          `,
    });

    const newVerification = new EmailVerification({
      email,
      verificationCode,
      messageId: info.messageId,
      for: "login",
    });

    await newVerification.save();

    res.status(401).json({
      message: `Access blocked due to suspicious activity. Verification email was sent to your email address.`,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const verifyEmail = async (req, res, next) => {
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

    req.userId = updatedUser._id;
    req.email = updatedUser.email;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sendVerificationEmail,
  verifyEmail,
  verifyEmailValidation,
  sendLoginVerificationEmail,
};
