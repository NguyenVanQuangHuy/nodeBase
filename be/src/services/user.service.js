import User from "../models/user.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
async function createUser({ name, email, password}) {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        console.log(hash);
        const data = await User.create({username: name,email,password: hash});
        return data
    } catch (error) {
        console.log(error.toString());
    }
}

async function getUser({ email }) {
    try {
        const data = await User.findOne({ email: email });
        return data;
    } catch (error) {
        console.log(error.toString());
    }
}
async function updateUser({attributes}){
    
}
async function checkUser({ email, password }) {
    try {
        const data = await User.findOne({ email: email});
        if(!data){
            return null;
        }
        else {
            const comparePassword = await bcrypt.compare(password, data.password);
            if(comparePassword){
                return data;
            }
            else {
                return null;
            }
        }
    } catch (error) {
        console.log(error.toString());
    }
}

async function createTokenAccess({ userName, email }) {
    try {
        const payload = { userName, email };
        const secretKey = process.env.ACCESS_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.log(error.toString());
    }
}
async function createTokenRefresh({ userName, email }) {
    try {
        const payload = { userName, email };
        const secretKey = process.env.REFRESH_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });
        return token;
    } catch (error) {
        console.log(error.toString());
    }
}
export default { createUser, getUser, checkUser, createTokenAccess, createTokenRefresh }