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

router.post("/new-post", (req, res) => {
  const { title, description, imgUrl } = req.body;
  //validation for fields
  if (!title || !description || !imgUrl) {
    res.json({ message: "All fields are required !!" });
  }

  const post = new Post({
    title,
    description,
    imgUrl,
  });
  post
    .save()
    .then(() => {
      res.json({ message: "Post Created Successfully" });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
