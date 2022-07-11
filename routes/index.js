var express = require("express");
var router = express.Router();

var fs = require("fs");

var Controller = require("../controller/controller");

var products = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "NodeJS MVC Shopping Cart",
    products: products
  });
});

router.get("/add/:id", Controller.addContoller);
router.get("/cart", Controller.cartContorller);

router.get("/remove/:id", Controller.removeController);

module.exports = router;
