const express  = require('express');
const {verifyToken} = require('../middleware/verifyToken');

const router = express.Router();

const {Test}  = require('../controller/Test');
const {deleteUser} = require('../controller/userController');

//mapping


router.post("/test",Test);
router.delete('/delete/:userId',verifyToken,deleteUser);


module.exports = router;