import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddleware.js"
import{User} from "../models/userSchema.js"
import {generateToken} from '../utils/jwtToken.js'
export const patientRegister = catchAsyncErrors(async(req,res,next)=>{
    const {firstName, lastName, email, phone, nic, dob, gender, password ,role} =req.body ;

    if(!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !role
        ){
            return next(new ErrorHandler("Please FillFull form!",400));
        }
        let user= await User.findOne({ email });
        if(user){
            return next(new ErrorHandler("User already Registered!",400));
        }
        user= await User.create({firstName, lastName, email, phone, nic, dob, gender, password ,role});

        generateToken(user,"User Registered!",200,res);

});

export const login =  catchAsyncErrors(async(req,res,next)=>{
    const{ email,password,confirmPassword, role}=req.body;
    if(!email|| !password|| !confirmPassword|| !role){
        return next(new ErrorHandler("Please Provide all Details!",400));
    }
    if(password!==confirmPassword){
        return next(new ErrorHandler("Password ans Confirm password do not Match!",400));
    }
    const user= await User.findOne({ email }).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email!",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email!",400));
    }
    if(role!== user.role){
        return next(new ErrorHandler("User with this Role not Found!",400));

    }
    generateToken(user,"User Logged In Successfully!",200,res);
})