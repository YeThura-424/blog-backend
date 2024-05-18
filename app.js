// import express from "express";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const app = express();
const PORT = 5000;

//connection to mongodb
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongoose..");
});

mongoose.connection.on("error", (error) => {
  console.log(error, "connecting to Mongoose..");
});
//routes

// app.get("/", (req, res) => {
//   res.send("Hello World Server");
// });

// app.get("/home", (req, res) => {
//   res.send("Hello Home Page");
// });

// app.get("/category", (req, res) => {
//   res.send("Hello Category Page");
// });

// Models import
require("./models/post");
require("./models/category");
require("./models/comment");

// Allow requests from all origins
app.use(cors());

app.use(express.json());
// Router import
app.use(require("./routes/post"));
app.use(require("./routes/category"));
app.use(require("./routes/comment"));

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
