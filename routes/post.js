const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const Category = mongoose.model("Category");

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

router.get("/trending-posts", (req, res) => {
  Post.find()
    .sort({ numberOfLikes: -1 })
    .populate("category", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/fresh-stories", (req, res) => {
  Post.find()
    .sort({ _id: -1 })
    .limit(3)
    .populate("category", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((error) => {
      console.log(error);
    });
});
router.post("/new-post", (req, res) => {
  const { title, description, imgUrl, numberOfLikes, category } = req.body;
  //validation for fields
  if (!title || !description || !imgUrl || !category) {
    res.json({ message: "All fields are required !!" });
  }
  Category.findOne({ _id: category.id })
    .then((cate) => {
      const post = new Post({
        title,
        description,
        imgUrl,
        numberOfLikes,
        category: cate,
      });
      post
        .save()
        .then(() => {
          res.json({ message: "Post Created Successfully" });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
