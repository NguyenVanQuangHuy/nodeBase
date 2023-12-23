import express from 'express'
import userController from '../controllers/user.controller.js';
const userRouter = express.Router();

userRouter.post('/create', userController.createUser_controller);
userRouter.post('/login',userController.loginController);
userRouter.post('/getuser', userController.getUser_controller);
export default userRouter