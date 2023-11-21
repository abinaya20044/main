import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user:String,
    pass:String
})

export const userModel = model('user',userSchema)