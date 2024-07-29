const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJmk0x81nWJRxpHuRKOeGWC5ClBPmWhsOrA&s",
        type:String,

    },
    category:{
        type:String,
        default:"uncategorised"
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },


},{timestamps:true}
)


module.exports = mongoose.model('Post',postSchema); 