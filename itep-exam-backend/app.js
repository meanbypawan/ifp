import express from "express";
import mongoose from "mongoose";
import { User } from "./model/user.model.js";
import bodyParser from "body-parser";
import questionRouter from './routes/question.route.js';
import userRouter from './routes/user.route.js';
import userPaperRouter from './routes/user-paper.route.js';
import cors from "cors";
const app = express();

mongoose.connect('mongodb+srv://meanstack:mean123@cluster0.dkefj.mongodb.net/exam-backend?retryWrites=true&w=majority').then(result=>{
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use("/question",questionRouter);
    app.use("/user",userRouter);
    app.use("/paper",userPaperRouter);
    app.listen(3001, () => {
        console.log("Server Running..");
    })
}).catch(err=>{
   console.log(err);
});