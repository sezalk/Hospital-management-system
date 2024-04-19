import express from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import {isAdminAuthenticated} from "../middlewares/auth.js"
//defining router 

const router= express.Router();

//posting message in database 
router.post("/send",sendMessage);

router.get("/getall", isAdminAuthenticated, getAllMessages)

export default router;