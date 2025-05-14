import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true,
        unique : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 60 * 60 * 24 //1 day in seconds
}})


export const BlacklistToken = mongoose.model("BlacklistToken" , blacklistTokenSchema) //blacklist token model