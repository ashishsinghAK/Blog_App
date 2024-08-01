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

exports.getcomments = async (req, res, next) => {
    if (!req.user.isAdmin)
      return res.json("you are not authorised to get all comments")
    
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === 'desc' ? -1 : 1;
      const comments = await Comment.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
      const totalComments = await Comment.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthComments = await Comment.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
      res.status(200).json({ comments, totalComments, lastMonthComments });
    } catch (error) {
      next(error);
    }
  };