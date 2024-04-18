import express from "express";
import {config} from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
const app=express();
config({path:"./config/config.env"});
// connecting FRontend
app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));

//get cookies
app.use(cookieParser());
//convert json to string 
app.use(express.json());
// to recognise  real time things like date(mm/dd/yyyy) and name in string format
app.use(express.urlencoded({extended:true}));
//to upload files

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}))

app.use("/api/v1/message",messageRouter);
dbConnection();

export default app;
