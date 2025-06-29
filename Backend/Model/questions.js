const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  category : {
    type : String,
    required : true,
  },
  time : {
    type : Number,
    required : true,
  },
  difficulty : {
    type : String,
    required : true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true
      },
      options: {
        type: [String], // Array of 4 options: ["A", "B", "C", "D"]
        validate: [arr => arr.length === 4, 'Exactly 4 options required']
      },
      answer: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D'] // Or use actual string answers
      },
      explanation: {
        type: String,
        required: true
      }
    }
  ]
});

const Questions = mongoose.model("Questions", QuestionSchema);
module.exports = Questions;
