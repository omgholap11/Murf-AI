const Questions = require("../Model/questions.js");
// const connectMongoDB = require("./connectMongoDB.js");
// connectMongoDB("mongodb://127.0.0.1:27017/murfapi")


async function handleAddQuestions(req , res)
{
  const questions = {
  title: "Logical Reasoning Practice",
  description: "A basic-level set of logical reasoning questions to enhance aptitude skills.",
  category: "logical",
  difficulty : "easy",
  time: 15,
  questions: [
    {
      question: "Find the next number in the series: 2, 4, 8, 16, ___",
      options: ["24", "32", "20", "30"],
      answer: "B",
      explanation: "Each number is multiplied by 2. 16 × 2 = 32."
    },
    {
      question: "If CAT = 24 and DOG = 26, what is the value of BAT?",
      options: ["23", "24", "25", "26"],
      answer: "C",
      explanation: "B=2, A=1, T=20 → 2+1+20 = 23."
    },
    {
      question: "Which one is different from the rest?",
      options: ["Circle", "Triangle", "Rectangle", "Sphere"],
      answer: "D",
      explanation: "Sphere is 3D; others are 2D shapes."
    },
    {
      question: "What comes next? Monday, Wednesday, Friday, ___",
      options: ["Saturday", "Sunday", "Monday", "Tuesday"],
      answer: "B",
      explanation: "Skipping one day: Mon → Wed → Fri → Sun."
    },
    {
      question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely:",
      options: ["Lazzies", "Razzies", "Bloops", "None"],
      answer: "A",
      explanation: "By transitive logic: Bloops ⊆ Razzies ⊆ Lazzies → Bloops ⊆ Lazzies."
    },
    {
      question: "Which number is the odd one out? 3, 5, 7, 9, 11",
      options: ["3", "5", "7", "9"],
      answer: "D",
      explanation: "All are prime numbers except 9."
    },
    {
      question: "If 1 = 5, 2 = 25, 3 = 325, then 4 = ?",
      options: ["4325", "425", "432", "None"],
      answer: "A",
      explanation: "Pattern: number followed by decreasing digits. 4 = 4 + 3 + 2 + 5 → 4325."
    },
    {
      question: "Which word is the odd one out?",
      options: ["Pen", "Pencil", "Paper", "Book"],
      answer: "D",
      explanation: "Others are used for writing, but book is for reading."
    },
    {
      question: "What comes next? A, C, E, G, ___",
      options: ["H", "I", "J", "K"],
      answer: "B",
      explanation: "Skipping one letter: A → C → E → G → I."
    },
    {
      question: "If in a code, FLOWER is written as GMSXFS, how is GARDEN written?",
      options: ["HBSFMO", "HBSEFO", "HBSFEO", "HBSEMO"],
      answer: "A",
      explanation: "Each letter is incremented by 1 alphabetically."
    }
  ]
}

    const addQuestions = await Questions.create(questions);
    // const allqnos = await 
    console.log(addQuestions);

    if(!addQuestions)
    {
      return res.status(400).json({error : "Error while inserting questions sheet!"});
    }

    return res.status(200).json({msg : "Question sheet inserted successfully!"})
}


async function handleGetQuestionsSheet(req,res)
{
    const sheetName = req.params.topic;
    console.log(sheetName);
    const questionSheet = await Questions.find({title : sheetName});
    if(!questionSheet)
    {
        return res.status(404).json({error : "Question sheet not found in database"});
    }
    console.log(questionSheet);
    return res.status(200).json(questionSheet);
}


async function handleGetAllQuestionsSheets(req,res)
{
    const allQuestionSheets = await Questions.find({});
    if(!allQuestionSheets)
    {
        return res.status(404).json({error : "Question sheet not found in database"});
    }
    console.log(allQuestionSheets);
    return res.status(200).json(allQuestionSheets);
}


// handleAddQuestions();
module.exports = {handleAddQuestions , handleGetQuestionsSheet , handleGetAllQuestionsSheets}