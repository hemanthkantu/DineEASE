const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => {
  if (!req.session.cart) req.session.cart = [];

  req.session.cart.push({
    item_id: req.body.id,
    name: req.body.name,
    price: req.body.price
  });

  res.redirect("/cart");
});

router.get("/", (req, res) => {
  res.render("cart", {
    cart: req.session.cart || [],
    user: req.session.user
  });
});

module.exports = router;
