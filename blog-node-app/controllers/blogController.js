const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const date = new Date();

    const blog = new Blog({
      author: req.user._id,
      title,
      content,
      image,
      date,
    });
    await blog.save();
    res.send(blog);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;
    const date = new Date();

    // Find and update blog
    const blog = await Blog.findOneAndUpdate(
      { _id: id, author: req.user._id },
      { title, content, image, date },
      { new: true }
    );

    if (!blog) return res.status(404).send("Blog not found or unauthorized.");

    res.send(blog);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username");
    res.send(blogs);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog by ID and populate the author information
    const blog = await Blog.findById(id)
      .populate("author", "username")
      .populate({
        path: "comments", // Populate the comments field
        populate: {
          path: "author", // Populate the author field within each comment
          select: "username", // Include only the username of the comment author
        },
      });

    if (!blog) {
      return res.status(404).send("Blog not found.");
    }

    res.send(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
};
