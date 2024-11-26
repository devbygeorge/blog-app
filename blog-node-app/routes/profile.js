const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const profileController = require("../controllers/profileController");

// Get user profile
router.get("/", auth, profileController.getProfile);

// Edit user profile
router.put("/", auth, profileController.editProfile);

// Edit user password
router.put('/password', auth, profileController.editPassword);

module.exports = router;
