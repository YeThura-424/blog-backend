const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = mongoose.model("Post");

router.get("/post", (req, res) => {
  Post.find()
    .populate("category", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
