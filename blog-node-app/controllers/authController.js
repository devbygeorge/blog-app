const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already registered.");

    // Create new user
    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generate JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.header("Authorization", token).send({ token, user });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user credentials
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password.");

    // Generate JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.header("Authorization", token).send({ token, user });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found.");

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordExpire = Date.now() + 3600000; // 1 hour

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = resetPasswordExpire;

  await user.save();

  // Send email
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: "Password Reset Request",
    text: `You are receiving this because you (or someone else) have requested a password reset. Please click on the following link: ${resetUrl}`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) return res.status(500).send("Email could not be sent.");
    res.send("Password reset email sent.");
  });
};

exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  // Find user by reset token and check if token has not expired
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).send("Invalid or expired password reset token.");

  // Update password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.send("Password has been reset.");
};
