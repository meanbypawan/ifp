import express from "express";
import { generateQuestionPaper } from "../controller/user-paper.controller.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
router.post("/generate",verifyToken,generateQuestionPaper);
export default router;  