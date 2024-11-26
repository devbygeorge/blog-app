const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

exports.addComment = async (req, res) => {
  try {
    const { blogId, text } = req.body;
    const date = new Date();

    const comment = new Comment({
      blog: blogId,
      author: req.user._id,
      text,
      date,
    });

    await comment.save();

    // Update the blog's comments array
    await Blog.findByIdAndUpdate(blogId, {
      $push: { comments: comment._id },
    });

    res.send(comment);
  } catch (err) {
    console.log(err)
    res.status(500).send("Server error");
  }
};

exports.editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const date = new Date();

    // Find and update comment
    const comment = await Comment.findOneAndUpdate(
      { _id: id, author: req.user._id },
      { text, date },
      { new: true }
    );

    if (!comment)
      return res.status(404).send("Comment not found or unauthorized.");

    res.send(comment);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blog: blogId }).populate(
      "author",
      "username"
    );
    res.send(comments);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
