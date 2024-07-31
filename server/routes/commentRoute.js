const express = require('express');

const router = express.Router();
const {createComment,getPostComment,likeComment,dislikeComment} = require('../controller/createComment');
const {verifyToken} = require('../middleware/verifyToken');

router.post('/create',verifyToken,createComment);
router.get('/getComment/:postId',getPostComment);
router.put('/like/:commentId',verifyToken,likeComment);
router.put('/dislike/:commentId',verifyToken,dislikeComment);


module.exports = router;