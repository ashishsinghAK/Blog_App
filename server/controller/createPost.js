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