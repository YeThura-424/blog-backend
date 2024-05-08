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

router.post("/new-comment/:post_id", (req, res) => {
  const { body } = req.body;
  if (!body) {
    res.json({ message: "Body field is required !!" });
  }
  Post.find({ _id: req.params.post_id })
    .then((comment_post) => {
      const comment = new Comment({
        body,
        post: comment_post,
      });
      comment
        .save()
        .then((comment) => {
          res.json({ comment });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
