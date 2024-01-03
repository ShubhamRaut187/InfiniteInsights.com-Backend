const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true,
    },
    DOB:{
        type:Date,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Avatar:{
        type:String,
        required:true
    }
})

const Usermodel = mongoose.model('users',userschema); 

module.exports = {
    Usermodel
}