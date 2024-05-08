const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Comment = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  post: {
    type: ObjectId,
    ref: "Post",
  },
});

mongoose.model("Comment", Comment);
