const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema  = new Schema({
    firstname: {type: String ,require: true , trim: true },
    lastname: {type: String ,require: true , trim: true },
    username: {type: String ,require: true , trim: true , unique: true },
    email: {type: String ,require: true , trim: true , unique: true },
    password: {type: String ,require: true , trim: true },
    profilePic: {type: String ,default: "images/profilePic.jpeg"},
},{
    timestamps: true});

var User = mongoose.model("User",UserSchema);

module.exports = User;