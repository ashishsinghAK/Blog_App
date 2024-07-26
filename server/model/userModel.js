const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
       unique:true,
    },
    password:{
        type:String, 
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrUfiySJr8Org5W-oE2v3_i7VqufglYtSdqw&s"
    },

},{timestamps:true});


module.exports = mongoose.model('User',userSchema);

