const express  = require('express');
const {verifyToken} = require('../middleware/verifyToken');

const router = express.Router();

const {Test}  = require('../controller/Test');
const {deleteUser,SignOut,getUser,getUserForComment} = require('../controller/userController');

//mapping


router.post("/test",Test);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',SignOut);
router.get('/getuser',verifyToken,getUser);
router.get('/:userId',getUserForComment);

module.exports = router;