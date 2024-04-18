import express from "express";
import { sendMessage } from "../controller/messageController.js";

//defining router 

const router= express.Router();

//posting message in database 
router.post("/send",sendMessage);

export default router;