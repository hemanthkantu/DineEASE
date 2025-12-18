const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");

/* =======================
   SHOW REGISTER PAGE
======================= */
router.get("/register", (req, res) => {
  res.render("register");
});

/* =======================
   HANDLE REGISTER
======================= */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed],
      (err) => {
        if (err) {
          console.error(err);
          return res.render("register", {
            error: "Email already exists"
          });
        }

        // After register → login page
        res.redirect("/login");
      }
    );
  } catch (err) {
    console.error(err);
    res.render("register", { error: "Something went wrong" });
  }
});

/* =======================
   SHOW LOGIN PAGE
======================= */
router.get("/login", (req, res) => {
  res.render("login");
});

/* =======================
   HANDLE LOGIN
======================= */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.render("login", { error: "Something went wrong" });
      }

      if (results.length === 0) {
        return res.render("login", { error: "User not found" });
      }

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.render("login", { error: "Wrong password" });
      }

      // ✅ STORE ONLY NECESSARY DATA IN SESSION
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      res.redirect("/profile");
    }
  );
});

/* =======================
   PROFILE PAGE
======================= */
router.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.render("profile", {
    user: req.session.user
  });
});

/* =======================
   LOGOUT
======================= */
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
