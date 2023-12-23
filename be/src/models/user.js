import mongoose, { Schema, ObjectId } from "mongoose";
const User = mongoose.model('users', new Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    refreshToken:{
        type:String,
    },
    phoneNumber:{
        type: Number,
        maxlength: 10,
        minlength: 10,
    },
    address: {
        type: String,
    },
    contactFacebook: {
        type: String
    }
}, { timestamps: true }));
export default User;