const User = require('../model/userModel');

exports.deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id != req.params.userId) {
        return res.status(403).json({
            success: false,
            message: "You are not authorised to delete this user"
        })
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User has been deleted");

    } catch (err) {
        return res.status(403).json({
            success: false,
            message: "error occured while deleting the account"
        })
    }
}

exports.SignOut = (req, res, next) => {
    try {
        res.clearCookie('token').status(200).json('User has been sign out')
    } catch (err) {
        res.json({
            message: "Error occured while sign out"
        })
    }
}


exports.getUser = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.json("Only admin are allowed to see all Users");
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const users = await User.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);
        const userWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        })
        const totalUser = await User.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(), now.getMonth() - 1, now.getDate()
        )
        const lastMonthUser = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });

        res.status(200).json({
            users: userWithoutPassword,
            totalUser,
            lastMonthUser
        })
    } catch (err) {
        return res.json("Error while fetching the user");
    }
}