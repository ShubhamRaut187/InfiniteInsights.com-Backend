const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true,
    },
    Email:{
        type:String,
        unique:true,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Avatar:{
        type:String,
        required:true
    },
    Bio:{
        type:String,
    }
})

const Usermodel = mongoose.model('users',userschema); 

module.exports = {
    Usermodel
}