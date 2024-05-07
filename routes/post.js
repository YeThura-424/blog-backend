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

router.post("/new-post", (req, res) => {
  const { title, description, imgUrl, category } = req.body;
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
