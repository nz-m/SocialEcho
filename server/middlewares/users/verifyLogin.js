const nodemailer = require("nodemailer");
const SuspiciousLogin = require("../../models/suspicious-login.model");
const UserContext = require("../../models/context.model");
const User = require("../../models/user.model");
const EmailVerification = require("../../models/email.model");
const { query, validationResult } = require("express-validator");
const { decryptData } = require("../../utils/encryption");
const { verifyLoginHTML } = require("../../utils/emailTemplates");

const BASE_URL = process.env.BASE_URL;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;

const verifyLoginValidation = [
  query("email").isEmail().normalizeEmail(),
  query("id").isLength({ min: 24, max: 24 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
const sendLoginVerificationEmail = async (req, res) => {
  const USER = decryptData(process.env.EMAIL);
  const PASS = decryptData(process.env.PASSWORD);

  const currentContextData = req.currentContextData;

  const email = req.user.email;
  const name = req.user.name;
  const id = currentContextData.id;
  const verificationLink = `${BASE_URL}/verify-login?id=${id}&email=${email}`;
  const blockLink = `${BASE_URL}/block-device?id=${id}&email=${email}`;

  try {
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
      subject: "Action Required: Verify Recent Login",
      html: verifyLoginHTML(
        name,
        verificationLink,
        blockLink,
        currentContextData
      ),
    });

    const newVerification = new EmailVerification({
      email,
      verificationCode: id,
      messageId: info.messageId,
      for: "login",
    });

    await newVerification.save();

    res.status(401).json({
      message: `Access blocked due to suspicious activity. Verification email was sent to your email address.`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const verifyLogin = async (req, res) => {
  const id = req.query.id;
  const email = req.query.email;

  try {
    const suspiciousLogin = await SuspiciousLogin.findById(id);

    if (!suspiciousLogin || suspiciousLogin.email !== email) {
      return res.status(400).json({ message: "Invalid verification link" });
    }

    const newContextData = new UserContext({
      user: suspiciousLogin.user,
      email: suspiciousLogin.email,
      ip: suspiciousLogin.ip,
      city: suspiciousLogin.city,
      country: suspiciousLogin.country,
      device: suspiciousLogin.device,
      deviceType: suspiciousLogin.deviceType,
      browser: suspiciousLogin.browser,
      os: suspiciousLogin.os,
      platform: suspiciousLogin.platform,
    });

    await newContextData.save();
    await SuspiciousLogin.findOneAndUpdate(
      { _id: id },
      { $set: { isTrusted: true, isBlocked: false } },
      { new: true }
    );

    res.status(200).json({ message: "Login verified" });
  } catch (err) {
    res.status(500).json({ message: "Could not verify your login" });
  }
};

const blockLogin = async (req, res) => {
  const id = req.query.id;
  const email = req.query.email;

  try {
    const suspiciousLogin = await SuspiciousLogin.findById(id);

    if (!suspiciousLogin || suspiciousLogin.email !== email) {
      return res.status(400).json({ message: "Invalid verification link" });
    }

    await SuspiciousLogin.findOneAndUpdate(
      { _id: id },
      { $set: { isBlocked: true, isTrusted: false } },
      { new: true }
    );

    res.status(200).json({ message: "Login blocked" });
  } catch (err) {
    res.status(500).json({ message: "Could not block your login" });
  }
};

module.exports = {
  verifyLoginValidation,
  sendLoginVerificationEmail,
  verifyLogin,
  blockLogin,
};
