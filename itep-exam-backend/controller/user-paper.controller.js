import { Question } from "../model/question.model.js";
import { UserPaper } from "../model/user-paper.model.js";
import mongoose from "mongoose";
export const generateQuestionPaper = async (request,response,next)=>{
  const session = await mongoose.startSession();
  try{ 
   session.startTransaction(); 
   const userId = request.body.userId;
   let user = await UserPaper.findOne({userId: userId});
   if(!user){
     let hindiQuestions = await getRandomQuestionByCategory("Hindi",10);
     let englishQuestions = await getRandomQuestionByCategory("English",10);
     let gkQuestions = await getRandomQuestionByCategory("General Knowledge",10);
     let basicComputerQuestions = await getRandomQuestionByCategory("Computer Basic",10);
     let logicalResoningQuestion = await getRandomQuestionByCategory("Logical Resoning",30);
     let aptitudeQuestions = await getRandomQuestionByCategory("Quantitative Aptitude",30);
     let paper = {userId:userId,questionsList:[{"English":englishQuestions,"Hindi":hindiQuestions,"General Knowledge":gkQuestions,"Computer Basic":basicComputerQuestions,"Quantitative Aptitude":aptitudeQuestions,"Logical Resoning":logicalResoningQuestion}]};
     let result = await UserPaper.create(paper,{session});
     await session.commitTransaction();
     return response.status(200).json(result);
   }
   else
     return response.status(200).json(user); 
  }
  catch(err){
    await session.abortTransaction();
    return response.status(500).json({error: "Server Error"});
  }
  finally{
    session.endSession();
  }
}

const getRandomQuestionByCategory = async (category,limit)=>{
    try {
        const randomQuestions = await Question.aggregate([
          { $match: { Category: category } }, // Filter by category
          { $sample: { size: limit } } // Retrieve a random document from the filtered results
        ]);
        return randomQuestions; // Return the first (and only) result from the array
      } catch (error) {
        console.error('Error fetching random Questions:', error);
        throw error;
      }
}
