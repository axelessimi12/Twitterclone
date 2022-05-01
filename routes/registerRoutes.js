const express = require('express');
const app = express();
const router = express.Router();
const bodyParser =  require("body-parser");
const bcrypt = require("bcrypt");
const User = require('../schemas/userSchema');

app.set("view engine","pug");
app.set("views","views");

app.use(bodyParser.urlencoded({ extended:false }));

router.get('/',(req,res,next) => {
    res.status(200).render("register");
})

router.post('/',async (req,res,next) => {
   //console.log(req.body);
    var firstname =req.body.firstname.trim();
    var lastname =req.body.lastname.trim();
    var username =req.body.username.trim();
    var email =req.body.email.trim();
    var password = req.body.password;
    //console.log(password);


    var payload = req.body;
    if(firstname && lastname && username && email && password){
        var user= await User.findOne({
            $or: [
                {username: username},
                {email: email},

            ]
        })
        .catch((error)=>{
            console.log(error);
            errorMessage("something went wrong");
            res.status(200).render("register",payload);
        });

        if(user == null){
            //no user 
            var data = req.body;

            data.password =await bcrypt.hash(password,10); 

            //console.log("password: " + req.body.password);

            User.create(data)
            .then((user) =>{
                req.session.user = user;
                res.redirect("/");
                //console.log(user);
                //console.log("passwordUser: " + user.password);
            })
        }
        else
        {
            //user found
            if(email == user.email){
                payload.errorMessage=" Email already in use ! ";
            }
            else
            {
                payload.errorMessage=" Username already in use ! ";
            }
            res.status(200).render("register",payload);
        }
    }
    else{
        payload.errorMessage=" Make sure each field has a valid value. ";
        res.status(200).render("register",payload);
    }

})

module.exports = router ;