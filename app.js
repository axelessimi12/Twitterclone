const express = require('express');
const app = express();
const port = 3003;
var middleware =require('./middleware');
const colors =require('colors');
const path =require('path');
const bodyParser =  require("body-parser");
const mongoose =require("./database");
const session = require("express-session");

const server = app.listen(port,() => console.log("server listenning on port " + port));
app.set("view engine","pug");
app.set("views","views");

app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false
}))


//routes

const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const logoutRoutes = require('./routes/logout');

app.use('/login',loginRoutes);
app.use('/register',registerRoutes);
app.use('/logout',logoutRoutes);


app.get('/',middleware.requireLogin,(req,res,next) => {

    console.log("ici "+ req.session.user);

    var payload ={
        pageTitle: "Home",
        userLoggedIn: req.session.user
    }

    res.status(200).render("home",payload);
})