import userService from '../services/user.service.js';
import jwt from 'jsonwebtoken'
async function createUser_controller(req,res){
    try {
        const {name ,email ,password}= req.body;
        console.log(name);
        const data = await userService.createUser({name,email,password});
        res.status(200).json({
            message: 'okok',
            data: data
        })
    } catch (error) {
        res.status(500).json({ message: error.toString() })
    }
}
async function getUser_controller(req,res){
    try {
        const email = req.body.email;
        console.log(email);
            // const accessToken = token.split(" ")[1];
            const data = await userService.getUser({email});
            console.log(data, 'huy');
            res.status(200).json({ message: 'okok' , data: data });
          
    } catch (error) {
        res.status(500).json({ message: error.toString() })
    }
}
async function loginController(req,res){
    try {
        const{email,password} = req.body;
        const user = await userService.checkUser({email,password});
        if(user.name == ""){
         throw new Error("User not found");
        }
        else{
            const accessToken = await userService.createTokenAccess(user.username,user.email);
            const refreshToken = await userService.createTokenRefresh(user.username,user.email);
            res.cookie("accessToken", accessToken, {
                    httpOnly: false, // Đặt là true để chỉ cho phép cookie được truy cập qua HTTP và không thể truy cập thông qua JavaScript.
                    secure: false, // Đặt là true nếu bạn chỉ muốn gửi cookie qua kênh an toàn
                    path: "/", // Đường dẫn cho cookie.
                    sameSite: "strict", //Cookie chỉ được gửi trong các yêu cầu từ cùng tên miền gốc 
                });
            const data = {
                name: user.username,
                email: user.email,
                isAdmin: user.admin
            }
            res.status(200).json({ message: 'okok' , data: data });
        }
    } catch (error) {
        res.status(500).json({ message: error.toString() })
    }
}
export default {createUser_controller,getUser_controller,loginController};