// import express from "express";
const express = require("express");
const app = express();
const PORT = 5000;

//routes

app.get("/", (req, res) => {
  res.send("Hello World Server");
});

app.get("/home", (req, res) => {
  res.send("Hello Home Page");
});

app.get("/category", (req, res) => {
  res.send("Hello Category Page");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
