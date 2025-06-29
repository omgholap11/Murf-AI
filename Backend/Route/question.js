const express = require("express");
const {handleAddQuestions, handleGetQuestionsSheet, handleGetAllQuestionsSheets} = require("../Controllers/questionHandlers.js")
const questionRouter = express.Router();

questionRouter.post("/addquestions",handleAddQuestions);

questionRouter.get("/getquestionsheet/:topic",handleGetQuestionsSheet)

questionRouter.get("/getallquestionsheets",handleGetAllQuestionsSheets)

module.exports = questionRouter;