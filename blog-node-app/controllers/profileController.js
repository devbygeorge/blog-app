const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.editProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        profile: { firstName, lastName, bio, avatar },
      },
      { new: true }
    ).select("-password");

    res.send(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.editPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Find the user based on the ID from the JWT token
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send("Current password is incorrect.");
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the updated user
    await user.save();

    res.send("Password updated successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
};
