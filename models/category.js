const mongoose = require("mongoose");

const category = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

mongoose.model("Category", category);
