const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");
router.get("/comments", (req, res) => {
  Comment.find()
    .populate("post", "_id title")
    .then((comment) => {
      res.json({ comment });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/new-comment", (req, res) => {
  const { body, post_id } = req.body;
  if (!body || !post_id) {
    res.json({ message: "All field are required !!" });
  }

  const comment = new Comment({
    body,
    post: post_id,
  });
  comment
    .save()
    .then((comment) => {
      res.json({ comment });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/comments/post/:postId", (req, res) => {
  Comment.find({ post: { _id: req.params.postId } })
    .populate("post", "_id title")
    .then((comments) => {
      res.json({ comments });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
