const express = require("express");
const router = express.Router();
const db = require("../db");  // <-- Make sure your file is db.js

// GET /menu
router.get("/", async (req, res) => {
  try {
    const [categories] = await db.query("SELECT * FROM categories");
    const [items] = await db.query("SELECT * FROM menu_items");

    res.render("menu", {
      title: "Menu",
      categories,
      items
    });

  } catch (err) {
    console.error("SQL ERROR:", err);
    res.send("Database error");
  }
});

module.exports = router;
