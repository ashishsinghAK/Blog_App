const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    likes:{
        type:Array,
        default:[],
    },
    dislikes:{
        type:Array,
        default:[]
    },
    numberOfLikes:{
        type:Number,
        default:0,
    },
    numberOfdisLikes:{
        type:Number,
        default:0,
    }

},{timestamps:true})

module.exports = mongoose.model('Comment',commentSchema);