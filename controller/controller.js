var Cart = require("../models/cart");
var fs = require("fs");
var products = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));

class controller {
  addContoller(req, res, next) {
    var productId = req.params.id;
    //console.log(productId);
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(cart);
    var product = products.filter(function (item) {
      console.log(item.id);

      return item.id == productId;
    });

    cart.add(product[0], productId);
    req.session.cart = cart;
    res.redirect("/");
  }
  cartContorller(req, res, next) {
    if (!req.session.cart) {
      return res.render("cart", {
        products: null
      });
    }
    var cart = new Cart(req.session.cart);
    res.render("cart", {
      title: "MVC NodeJS Shopping ",
      products: cart.getItems(),
      totalPrice: cart.totalPrice
    });
  }
  removeController(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(productId);
    req.session.cart = cart;
    res.redirect("/cart");
  }
}
module.exports = new controller();
