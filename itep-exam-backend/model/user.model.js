import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    mobile:{
        type: Number,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    examStatus:{
        type: Boolean,
        default: false
    }
});

export const User = mongoose.model("user",userSchema);