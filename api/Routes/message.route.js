import express from "express";
import {
  addMessage
} from "../Controllers/message.controller.js";
import {verifyToken} from "../Middleware/verifyToken.js";

const router = express.Router();


router.post("/:chatId", verifyToken, addMessage);

export default router;