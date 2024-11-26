const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const commentController = require("../controllers/commentController");

// Add a comment
router.post("/", auth, commentController.addComment);

// Edit a comment
router.put("/:id", auth, commentController.editComment);

// Get comments for a blog
router.get("/blog/:blogId", commentController.getComments);

module.exports = router;
