import mongoose from "mongoose";

import validator from "validator";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name must contain atleast 3 characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name must contain atleast 3 characters!"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please provide a valid Email!"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone number must contain Exact 10 digits!"],
        maxLength:[10,"Phone number must contain Exact 10 digits!"]
    },
    nic:{
        type:String,
        required:true,
        minLength:[5,"NIC must contain Exact 5 digits!"],
        maxLength:[5,"NIC must contain Exact 5 digits!"]
        
    },
    dob:{
        type:Date,
        required:[true,"DOB is required!"],

    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"],
    },
    password:{
        type:String,
        minLength:[8,"Password must contain atleast 8 characters!"],
        required:true,
        select:false // to hide password when accesssing users details 
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"],
    },
    doctorDepartment:{
        type:String,
    },
    docAvatar:{
        public_id: {
            type: String, 
            //required: true,
          },
          url: {
            type: String, 
            //required: true,
          },
      
    }
    
});

userSchema.pre("save", async function(next){ //when user schema is saved while registering 
    if(!this.isModified("password")){         // we get new password 
        next();  
    }
    this.password = await bcrypt.hash(this.password,10); // it will update the password in  hashed form 

});
// compare hashed password
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
};

//token generation 

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    })
}

export const User = mongoose.model("User",userSchema);