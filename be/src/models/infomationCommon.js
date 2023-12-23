import mongoose, { Schema, ObjectId } from "mongoose";
const infomationComon = mongoose.model('infomationComons',new Schema({
    content: {
        type: String,
        require: true,
    },
    images: 
        [
            {
                type: Schema.Types.ObjectId, ref: 'images' 
            }
        ]
    
}))

export default infomationComon;