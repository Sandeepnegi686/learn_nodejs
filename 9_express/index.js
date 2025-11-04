const express = require("express");
const app = express();
const middleware = require("./middleware.js");

const data = {
  data: [
    { id: 1, name: "product 1" },
    { id: 2, name: "product 2" },
    { id: 3, name: "product 3" },
  ],
};

app.use(middleware);

app.get("/", function (req, res) {
  res.send("homepage");
});

app.get("/data", function (req, res) {
  res.json(data);
});

app.get("/data/:productId", function (req, res) {
  const productId = +req.params.productId;
  const product = data.data.filter((product) => product.id == productId);
  //   console.log(product);
  if (product.length) {
    res.status(200).json(product);
  } else {
    res.status(404).send("not found");
  }
});

app.listen(3000, () => console.log("server started."));
