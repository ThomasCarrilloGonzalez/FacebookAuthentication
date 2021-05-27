const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passportLocal = require("passport-local").Strategy;
const passportFacebook = require("passport-facebook").Strategy;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("321654987"));
app.use(
  session({
    secret: "321654987",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new passportLocal(function (username, password, done) {
    if (username === "t.carrillo2" && password === "12345")
      return done(null, { id: 1, name: "Cody" });
    done(null, false);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, { id: 1, name: "Cody" });
});

app.set("view engine", "ejs");

app.get(
  "/",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login");
  },
  (req, res) => {
    //Sesion iniciada   = Mensaje de Bienvenida
    //Si no             = Redireccionar a /login
    res.send("Jelou guorld");
  }
);

app.get("/login", (req, res) => {
  //Formulario Login
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    //Recibir credenciales e iniciar sesión
    successRedirect: "/",
    failureRedirect: "/",
  })
);

app.listen(9000, () => console.log("Servidor Arriba"));
