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

exports.likeComment = async(req,res,next) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return res.json({
                success:false,
                error:"Comment not found"
            });

        }

        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex === -1){
            comment.numberOfLikes +=1;
            comment.likes.push(req.user.id);
        }
        else{
            comment.numberOfLikes -=1;
            comment.likes.splice(userIndex,1);
        }
        await comment.save();
        res.status(200).json(comment);
    }catch(err){
        return res.json({
            success:false,
            message:"error occur!"
        })
    }
}

exports.dislikeComment = async(req,res,next) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return res.json({
                success:false,
                error:"Comment not found"
            });

        }

        const userIndex = comment.dislikes.indexOf(req.user.id);
        if(userIndex === -1){
            comment.numberOfdisLikes +=1;
            comment.dislikes.push(req.user.id);
        }
        else{
            comment.numberOfdisLikes -=1;
            comment.dislikes.splice(userIndex,1);
        }
        await comment.save();
        res.status(200).json(comment);
    }
    catch(err){
        return res.json({
            success:false,
            message:"error occur!"
        })
    }
};

exports.deleteComment = async(req,res,next) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return res.json({
                success:false,
                error:"Comment not found"
            });
        }
        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return res.json({
                success:false,
                message:'you are not authorised to delete comment'
            })
        };
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json('Comment has been deleted');
    }catch(err){
        return res.json({
            success:false,
            message:"error occur!"
        })
    }
}