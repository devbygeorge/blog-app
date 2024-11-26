const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const blogController = require("../controllers/blogController");

// Create a new blog
router.post("/", auth, blogController.createBlog);

// Edit a blog
router.put("/:id", auth, blogController.editBlog);

// Get all blogs
router.get("/", blogController.getBlogs);

// Get unique blog
router.get("/:id", blogController.getBlog);

module.exports = router;
