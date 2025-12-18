const express = require("express");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const cartRoutes = require("./routes/cart");
const checkoutRoutes = require("./routes/checkout");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "dineease_secret",
    resave: false,
    saveUninitialized: true
  })
);
const paymentRoutes = require("./routes/payment");

app.use("/payment", paymentRoutes);

app.use("/", authRoutes);
app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);

app.use("/checkout", require("./routes/checkout"));

app.get("/", (req, res) => {
  res.render("home", { user: req.session.user });
});

app.listen(3001, () =>
  console.log("DineEase running → http://localhost:3001")
);
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
