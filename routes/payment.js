const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (cart.length === 0) {
    return res.redirect("/menu");
  }

  res.render("payment", { total });
});

router.post("/success", (req, res) => {
  req.session.cart = []; // clear cart after payment
  res.render("payment-success");
});

module.exports = router;
