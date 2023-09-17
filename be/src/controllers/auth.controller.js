const asyncHandler = require('../utils/async-handler');
// const { errorResponse, successResponse } = require('../utils/response');
const AuthService=require("../services/auth.service")
module.exports = {

    registerUser: asyncHandler(async (req, res) => {
        const  user= await AuthService.registerUser(req,res);
        return res.status(200).json(user);
    }),
    loginUser: asyncHandler(async (req, res) => {
        const user = await AuthService.loginUser(req, res);
        if (user.error) {
            return res.status(404).json({ error: user.error });
        }
        return res.status(200).json(user);
    }),
    
    
};
