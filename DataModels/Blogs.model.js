const mongoose = require('mongoose');

const blogschma = mongoose.Schema({
    Title:{
        type:String,
        required:true,
    },
    SubTitle:{
        type:String,
        required:true,
    },
    Author:{
        type:String,
        required:true,
    },
    AuthorAvatar:{
        type:String,
        required:true
    },
    AuthorID:{
        type:String,
        required:true,
    },
    Day:{
        type:String,
        required:true
    },
    ContentOne:{
        type:String,
        required:true,
    },
    ContentTwo:{
        type:String,
        required:true
    },
    ContentThree:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true,
    },
    Likes:{
        type:Number,
        default:0
    },
    Images:{
        type:[String],
        default:undefined,
        required:true
    },

},{timestamps:true})

const Blogmodel = mongoose.model('blogs',blogschma);

module.exports = {
    Blogmodel
}