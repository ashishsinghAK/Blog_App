const Post = require('../model/postModel');

exports.createPost = async(req,res,next) => {
    if(!req.user.isAdmin){
        return res.json({
            success:false,
            message:"Only admin is allowed to create post"
        });
    }
    if(!req.body.title || !req.body.content){
        return res.json({
            success:false,
            message:"Please provide all fields"
        });
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'');
    const newPost = new Post({
        ...req.body,slug,userId:req.user.id
    })

    try{
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
        
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"Can't create post"
        });
    }
}

exports.getPost = async(req,res,next) => {
   try{
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const post = await Post.find({
        ...(req.query.userId && {userId: req.query.userId}),
        ...(req.query.category && {category: req.query.category}),
        ...(req.query.slug && {category: req.query.slug}),
        ...(req.query.postId && {_id: req.query.postId}),
        ...(req.query.searchTerm && {
            $or:[
                {title : {$regex:req.query.searchTerm, $options:'i'}},
                {content : {$regex:req.query.searchTerm, $options:'i'}},
            ]
        })
    }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);
    const totalPost = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const lastMonthPost = await Post.countDocuments({
        createdAt:{$gte:oneMonthAgo},
    }) ;


    res.status(200).json({
        post,
        totalPost,
        lastMonthPost
    })

   }catch(err){
        return res.status(400).json({
            success:false,
            message:"Error while fetching the Posts"
        })
   }
}

exports.deletePost = async(req,res,next) => {
    if(!req.user.isAdmin || req.user.id != req.params.userId){
        return res.json("Only admin can delete post")
    }

    try{
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({
            message:"Post has been deleted"
        })
    }catch(error){
        return res.json("Error while deleting the post");
    }
}