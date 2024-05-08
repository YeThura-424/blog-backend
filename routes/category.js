const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Category = mongoose.model("Category");

router.get("/category", (req, res) => {
  Category.find()
    .then((categories) => {
      res.json({ categories });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/category_num", (req, res) => {
  Category.countDocuments({})
    .then((categories) => {
      res.json({ categories });
    })
    .catch((error) => {
      console.log(error);
    });
});
router.post("/new-category", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.json({ message: "Name field is required !!" });
  }

  const category = new Category({
    name,
  });
  category
    .save()
    .then(() => {
      res.json({ message: "Category Created Successfully" });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
