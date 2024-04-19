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