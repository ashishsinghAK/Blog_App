const Comment = require('../model/commentModel');

exports.createComment = async(req,res,next) => {
    try{
        const {content,postId,userId} = req.body;
        if(userId != req.user.id){
            return res.json('You are not allowed to post the comment');
        }
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        await newComment.save();
        res.status(200).json(newComment);
    }catch(err){
        next(err);
    }
}

exports.getPostComment = async(req,res,next) => {
        try{
            const comments = await Comment.find({postId:req.params.postId}).sort({
                createdAt:-1,
            });
            res.status(200).json(comments);

        }catch(err){
            return res.status(400).json({
                message:'Error while fetching the comments',
                success:false
            })
        }
}