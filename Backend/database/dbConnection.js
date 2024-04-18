import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM"
    }).then(()=>{
        console.log("Connected to Database")
    }).catch(err=>{
        console.log(`Some error while connecting to Database: ${err}`)
    })
}