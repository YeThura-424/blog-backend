const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const post = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  numberOfLikes: {
    type: Number,
    default: 0,
  },
  category: {
    type: ObjectId,
    ref: "Category",
  },
});

mongoose.model("Post", post);
