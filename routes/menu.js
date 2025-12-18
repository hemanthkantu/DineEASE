const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM menu_items";

  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.send("Menu DB Error");
    }

    res.render("menu", {
      menu: rows,               // ✅ matches pug
      user: req.session.user
    });
  });
});

module.exports = router;
