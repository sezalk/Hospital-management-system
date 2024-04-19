import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddleware.js"
import{User} from "../models/userSchema.js"
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
        const user= await User.findOne({ email });
        if(user){
            return next(new ErrorHandler("User already Registered!",400));
        }
        user= await User.create({firstName, lastName, email, phone, nic, dob, gender, password ,role});

        res.status(200).json({
            sucess:true,
            message:"User Registered!",
        });

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
    res.status(200).json({
        sucess:true,
        message:"User Loggeed In Successfully!",
    });
})