const express = require("express");
const app = express();
const ejs = require("ejs");
const { join, dirname } = require("path");

// app.set("greet", "hello");
// app.get("greet");
const products = [
  { id: 1, name: "product 1" },
  { id: 2, name: "product 2" },
  { id: 3, name: "product 3" },
];

app.set("view engine", "ejs");

app.set("views", join(dirname(__filename), "templates"));

app.get("/", (req, res) => {
  res.render("home", { title: "Hompage", products });
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => console.log("server started"));
