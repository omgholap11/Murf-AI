import React, { useEffect, useState } from 'react';
import { Play, BookOpen, Users, Clock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const QuestionSheets = () => {
  // Sample question sheets data
    const navigate = useNavigate();
  const [questionSheets,setQuestionSheets] = useState([]);
 useEffect(()=>{
    async function getAllQuestionSheets(){
          try{
    const response = await axios.get("http://localhost:5001/questions/getallquestionsheets")

    if(response.status === 200)
    {
        console.log(response.data);
        setQuestionSheets(response.data);
    }
    
  }
  catch(error)
  {
    console.log("Error while getting all questions sheets from the backend!!" , error);
  }
    }
    getAllQuestionSheets();
 },[])
//   const questionSheets = [
//     {
//       id: 1,
//       title: "Mathematics - Algebra Basics",
//       description: "Master fundamental algebraic concepts with 25 interactive questions",
//       questionCount: 25,
//       difficulty: "Beginner",
//       estimatedTime: "15 min",
//       completedBy: 1240,
//       category: "Mathematics"
//     },
//     {
//       id: 2,
//       title: "Physics - Motion and Forces",
//       description: "Test your understanding of Newton's laws and motion principles",
//       questionCount: 30,
//       difficulty: "Intermediate",
//       estimatedTime: "20 min",
//       completedBy: 856,
//       category: "Physics"
//     },
//     {
//       id: 3,
//       title: "Chemistry - Periodic Table",
//       description: "Explore elements, atomic structure, and periodic trends",
//       questionCount: 20,
//       difficulty: "Beginner",
//       estimatedTime: "12 min",
//       completedBy: 2103,
//       category: "Chemistry"
//     },
//     {
//       id: 4,
//       title: "Biology - Cell Structure",
//       description: "Deep dive into cellular components and their functions",
//       questionCount: 35,
//       difficulty: "Advanced",
//       estimatedTime: "25 min",
//       completedBy: 634,
//       category: "Biology"
//     },
//     {
//       id: 5,
//       title: "English - Grammar Essentials",
//       description: "Perfect your grammar skills with comprehensive exercises",
//       questionCount: 40,
//       difficulty: "Intermediate",
//       estimatedTime: "30 min",
//       completedBy: 1789,
//       category: "English"
//     },
//     {
//       id: 6,
//       title: "History - World War II",
//       description: "Test your knowledge of major events and figures from WWII",
//       questionCount: 28,
//       difficulty: "Intermediate",
//       estimatedTime: "18 min",
//       completedBy: 923,
//       category: "History"
//     }
//   ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      mathematics: 'bg-blue-500/10 text-blue-400',
      physics: 'bg-purple-500/10 text-purple-400',
      chemistry: 'bg-orange-500/10 text-orange-400',
      biology: 'bg-green-500/10 text-green-400',
      english: 'bg-pink-500/10 text-pink-400',
      history: 'bg-amber-500/10 text-amber-400',
      logical: 'bg-cyan-500/10 text-cyan-400'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            Practice Question Sheets
          </h1>
          <p className="text-gray-400 text-lg">
            Choose a topic and start practicing with our AI-powered voice interface
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{questionSheets.length}</p>
                <p className="text-gray-400 text-sm">Available Sheets</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">8.5K+</p>
                <p className="text-gray-400 text-sm">Students Learning</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">120</p>
                <p className="text-gray-400 text-sm">Avg. Minutes/Day</p>
              </div>
            </div>
          </div>
        </div>

        {/* Question Sheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {questionSheets.map((sheet) => (
            <div
              key={sheet._id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(sheet.category)}`}>
                  {sheet.category}
                </div>
                <div className={`px-2 py-1 rounded-lg text-xs font-medium border ${getDifficultyColor(sheet.difficulty)}`}>
                  {sheet.difficulty}
                </div>
              </div>

              {/* Card Content */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {sheet.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {sheet.description}
                </p>
              </div>

              {/* Card Stats */}
              <div className="flex items-center justify-between mb-6 text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1 mt-1" />
                    <span>{sheet.questions.length} Questions</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 mt-1" />
                    <span>{sheet.time} minutes</span>
                  </div>
                </div>
              </div>

              {/* Completion Stats */}
              {/* <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Completed by</span>
                  <span className="text-blue-400 font-medium">{sheet.completedBy.toLocaleString()} students</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((sheet.completedBy / 2500) * 100, 100)}%` }}
                  ></div>
                </div>
              </div> */}

              {/* Action Button */}
              <button 
              onClick={()=>navigate("/practicetest" , {state : {sheet}})}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Practice
              </button>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-medium py-3 px-8 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300">
            Load More Sheets
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionSheets;