const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.cart || req.session.cart.length === 0) {
    return res.redirect("/cart");
  }

  res.render("checkout", {
    cart: req.session.cart,
    user: req.session.user
  });
});

module.exports = router;
