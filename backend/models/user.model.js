import mongoose from "mongoose";
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({


        firstname : {
            type : String,
            required : true,
            minLenght : [3 , 'First name must be atleast 3 characters longs']
        },
        lastmame : {

            type : String,
            minLenght : [3 , 'Last name must be atleast 3 characters longs']

        },
    
    email : {
        type : String,
        required : true,
        unique : true,

    },
    password : {
        type : String,
        required : true,
        select : false, //jab se query marenge ye nhi jayega
        
    },
    socketId : {
        type : String
    }

});



export const User = mongoose.model("User" , userSchema)
