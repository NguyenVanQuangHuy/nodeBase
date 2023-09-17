// @ts-ignore
const User=require('../models/user')
const bcrypt=require('bcrypt');

class AuthService {

    async registerUser(req,res) {
        const {email, password,username}=req.body;
        try {
            // hash pass
            const salt=await bcrypt.genSalt(10);
            const hashed=await bcrypt.hash(password,salt);

            // create user in db
            const result=await new User({
                username:username,
                email:email,
                password:hashed,
            }).save();
            return result;
            
        } catch (error) {
            throw error;
        }
    }


    async loginUser(req, res) {
        try {
            const findUser = await User.findOne({ username: req.body.username });
            if (!findUser) {
                return { error: "Wrong username" };
            }
            const comparePassword = await bcrypt.compare(req.body.password, findUser.password);
            if (!comparePassword) {
                return { error: "Wrong Password" };
            }
            const { password, ...other } = findUser._doc;
            if (findUser && comparePassword) {
                return other;
            }
        } catch (error) {
            throw error;
        }
    }
    
    

}

module.exports = new AuthService();
