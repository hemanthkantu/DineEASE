const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const menuRouter = require('./routes/menu');
const cartRouter = require('./routes/cart');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// enable sessions
app.use(session({
  secret: "dineease-secret",
  resave: false,
  saveUninitialized: true
}));
const menuRoute = require("./routes/menu");
app.use("/menu", menuRoute);

// routes
app.use('/menu', menuRouter);
app.use('/cart', cartRouter);

// homepage
app.get('/', (req, res) => {
  res.render('index', { title: 'DineEase Home' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`DineEase app listening at http://localhost:${PORT}`);
});
app.get("/contact", (req, res) => {
    res.render("contact");
});