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
        type: Number,
        default: 1000
    }, 
    transaccions:{
        type: Array, 
        default: [] 
    }
}); 

module.exports = mongoose.model("User", userSchema);