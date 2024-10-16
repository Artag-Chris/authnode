import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
   img:{
       type: String
   },
   role: {
       type: [String],
       enum: ['USER_ROLE', 'ADMIN_ROLE'],
       default: 'USER_ROLE'
   }
});

export const UserModel = mongoose.model('User', userSchema)