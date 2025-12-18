const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => {
  if (!req.session.cart) req.session.cart = [];

  req.session.cart.push({
    item_id: req.body.id,
    name: req.body.name,
    price: Number(req.body.price)
  });

  res.redirect("/cart");
});

router.post("/delete", (req, res) => {
  const index = req.body.index;
  if (req.session.cart) {
    req.session.cart.splice(index, 1);
  }
  res.redirect("/cart");
});

router.get("/", (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  res.render("cart", {
    cart,
    total,
    user: req.session.user
  });
});

module.exports = router;
