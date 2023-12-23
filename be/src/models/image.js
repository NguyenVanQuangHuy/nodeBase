import mongoose, { Schema, ObjectId } from "mongoose";
const Image = mongoose.model('images', new Schema({
    url: {
        type: String,
        require: true,
    },
    caption: {
        type: String,
        require: true,
    }
}, { timestamps: true }))
export default Image