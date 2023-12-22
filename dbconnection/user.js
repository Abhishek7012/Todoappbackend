const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    fname:String,
    phoneNumber:Number,
    password:String,
});

module.exports = mongoose.model("user", userSchema);