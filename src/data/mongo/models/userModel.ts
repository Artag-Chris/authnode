import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    emailvalidated: {
        type: Boolean,
        default: false
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

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) { 
     delete ret._id;
     delete ret.password;
     }
 });

export const UserModel = mongoose.model('User', userSchema)