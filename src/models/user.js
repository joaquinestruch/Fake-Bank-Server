const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true, 
        unique: true
    },
    password:{
        type: String,
        require: true
    }
    ,
    money:{
        type: String,
    }
}); 

module.exports = mongoose.model("User", userSchema);