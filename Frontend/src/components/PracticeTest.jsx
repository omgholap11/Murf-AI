// import React, { useState, useEffect } from "react";
// import { ChevronDown, ChevronUp, Volume2, Mic, MicOff } from "lucide-react";
// import axios from "axios";
// const MPVAQuestionDisplay = () => {
//   const [questionSheet, setQuestionSheet] = useState({
//     title: "",
//     questions: [],
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswer, setUserAnswer] = useState(null);
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [voiceStatus, setVoiceStatus] = useState("ready"); // ready, speaking, listening, answered
//   const [completedQuestions, setCompletedQuestions] = useState(new Set());

//   async function handleGetQuestionSheet() {
//     try {
//       setIsLoading(true);
//       setError(null);

//       // Using fetch instead of axios since axios isn't available in this environment
//       const response = await fetch(
//         "http://localhost:5001/questions/getquestionsheet/Kinematics"
//       );

//       if (response.ok) {
//         const rawData = await response.json();
//         const formattedQuestions = rawData[0].questions.map((q, index) => ({
//           id: index + 1,
//           text: q.question,
//           options: [
//             { id: "A", text: q.options[0] },
//             { id: "B", text: q.options[1] },
//             { id: "C", text: q.options[2] },
//             { id: "D", text: q.options[3] },
//           ],
//           answer: q.answer,
//           explanation: q.explanation,
//         }));

//         setQuestionSheet({
//           title: rawData.title,
//           questions: formattedQuestions,
//         });

//         console.log("Question sheet loaded:", formattedQuestions);
//       } else {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error("Error while getting question sheet from backend:", error);
//       setError(
//         "Failed to load questions. Please check your connection and try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // Call it once using useEffect
//   useEffect(() => {
//     handleGetQuestionSheet();
//   }, []);

//   const currentQuestion = questionSheet.questions[currentQuestionIndex];
//   const progress =
//     questionSheet.questions.length > 0
//       ? (completedQuestions.size / questionSheet.questions.length) * 100
//       : 0;

//   // Simulate voice interaction

//   async function generateAudioFile(currentQuestion) {
//     try {
//       const formattedText = `Question number ${currentQuestion.id}. ${currentQuestion.text}. 
//       Option A: ${currentQuestion.options[0].text}. 
//       Option B: ${currentQuestion.options[1].text}. 
//       Option C: ${currentQuestion.options[2].text}. 
//       Option D: ${currentQuestion.options[3].text}.`;

//       const data = JSON.stringify({
//         text: formattedText,
//         voiceId: "en-US-natalie",
//         channelType: "MONO",
//         sampleRate: 24000,
//       });

//       const config = {
//         method: "post",
//         url: "https://api.murf.ai/v1/speech/generate",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "api-key": "ap2_9612a922-814c-4ed7-998f-dae83a2fcab5",
//         },
//         data: data,
//       };

//       const response = await axios(config);
//       console.log("Audio API response:", response.data);
//       console.log("audio url: ", response.data.audioFile);

//       return response.data.audioFile; // Make sure API returns this key
//     } catch (error) {
//       console.error("Error generating audio file:", error);
//       return null;
//     }
//   }

//   const startVoiceInteraction = async (currentQuestion) => {
//     setVoiceStatus("speaking");

//     const audioFile = await generateAudioFile(currentQuestion); // ✅ await here
//     console.log("🎧 Audio file URL:", audioFile);

//     if (audioFile) {
//       const audio = new Audio(audioFile);
//       audio.play();
//     }

//     setUserAnswer(null);
//     setShowExplanation(false);

//     // Simulate TTS reading delay
//     setTimeout(() => {
//       setVoiceStatus("listening");
//       setIsListening(true);

//       // Simulate voice recognition
//       setTimeout(() => {
//         simulateVoiceInput();
//       }, 3000);
//     }, 2000);
//   };

//   const simulateVoiceInput = () => {
//     // Simulate random user answer for demo
//     const options = ["A", "B", "C", "D"];
//     const randomAnswer = options[Math.floor(Math.random() * options.length)];

//     setUserAnswer(randomAnswer);
//     setIsListening(false);
//     setVoiceStatus("answered");
//     setCompletedQuestions((prev) => new Set([...prev, currentQuestion.id]));
//   };

//   const nextQuestion = () => {
//     if (currentQuestionIndex < questionSheet.questions.length - 1) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//       setUserAnswer(null);
//       setShowExplanation(false);
//       setVoiceStatus("ready");
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prev) => prev - 1);
//       setUserAnswer(null);
//       setShowExplanation(false);
//       setVoiceStatus("ready");
//     }
//   };

//   const getOptionStyle = (optionId) => {
//     if (!userAnswer) return "border-gray-200 hover:border-blue-300 bg-white";

//     if (optionId === currentQuestion.answer) {
//       return "border-green-500 bg-green-50 text-green-800";
//     }

//     if (optionId === userAnswer && optionId !== currentQuestion.answer) {
//       return "border-red-500 bg-red-50 text-red-800";
//     }

//     return "border-gray-200 bg-gray-50 text-gray-600";
//   };

//   const getOptionIcon = (optionId) => {
//     if (!userAnswer) return null;

//     if (optionId === currentQuestion.answer) {
//       return <span className="text-green-600 font-bold">✅</span>;
//     }

//     if (optionId === userAnswer && optionId !== currentQuestion.answer) {
//       return <span className="text-red-600 font-bold">❌</span>;
//     }

//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">MPVA</h1>
//           <h2 className="text-xl text-gray-600 mb-4">
//             {questionSheet.title || "Loading..."}
//           </h2>

//           {/* Progress Bar */}
//           <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
//             <div
//               className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <p className="text-sm text-gray-600">
//             Progress: {completedQuestions.size} /{" "}
//             {questionSheet.questions.length} questions completed
//           </p>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100 text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading questions...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-6 text-center">
//             <p className="text-red-600 mb-4">{error}</p>
//             <button
//               onClick={handleGetQuestionSheet}
//               className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         {/* Question Card */}
//         {!isLoading && !error && currentQuestion && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
//             <div className="flex justify-between items-center mb-6">
//               <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                 Question {currentQuestionIndex + 1} of{" "}
//                 {questionSheet.questions.length}
//               </span>

//               {/* Voice Status Indicator */}
//               <div className="flex items-center space-x-2">
//                 {voiceStatus === "speaking" && (
//                   <div className="flex items-center space-x-2 text-blue-600">
//                     <Volume2 className="w-5 h-5 animate-pulse" />
//                     <span className="text-sm">Reading question...</span>
//                   </div>
//                 )}
//                 {voiceStatus === "listening" && (
//                   <div className="flex items-center space-x-2 text-green-600">
//                     <Mic className="w-5 h-5 animate-pulse" />
//                     <span className="text-sm">Listening for answer...</span>
//                   </div>
//                 )}
//                 {voiceStatus === "answered" && (
//                   <div className="flex items-center space-x-2 text-gray-600">
//                     <MicOff className="w-5 h-5" />
//                     <span className="text-sm">Answer received</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Question Text */}
//             <h3 className="text-2xl font-semibold text-gray-800 mb-8 leading-relaxed">
//               {currentQuestion.text}
//             </h3>

//             {/* Options */}
//             <div className="space-y-4 mb-8">
//               {currentQuestion.options.map((option) => (
//                 <div
//                   key={option.id}
//                   className={`
//                     p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
//                     ${getOptionStyle(option.id)}
//                     ${
//                       userAnswer
//                         ? ""
//                         : "hover:shadow-md transform hover:-translate-y-1"
//                     }
//                   `}
//                   role="button"
//                   tabIndex={0}
//                   aria-label={`Option ${option.id}: ${option.text}`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-700">
//                         {option.id}
//                       </span>
//                       <span className="text-lg">{option.text}</span>
//                     </div>
//                     {getOptionIcon(option.id)}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-center space-x-4">
//               {voiceStatus === "ready" && (
//                 <button
//                   onClick={() => {
//                     startVoiceInteraction(currentQuestion);
//                   }}
//                   className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//                   aria-label="Start voice interaction"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <Mic className="w-5 h-5" />
//                     <span>Start Voice Question</span>
//                   </div>
//                 </button>
//               )}

//               {userAnswer && (
//                 <button
//                   onClick={() => setShowExplanation(!showExplanation)}
//                   className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
//                   aria-expanded={showExplanation}
//                   aria-label="Toggle explanation"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <span>View Explanation</span>
//                     {showExplanation ? (
//                       <ChevronUp className="w-5 h-5" />
//                     ) : (
//                       <ChevronDown className="w-5 h-5" />
//                     )}
//                   </div>
//                 </button>
//               )}
//             </div>

//             {/* Explanation Section */}
//             {userAnswer && (
//               <div
//                 className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                   showExplanation ? "max-h-96 mt-6" : "max-h-0"
//                 }`}
//               >
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
//                   <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
//                     <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                     Explanation
//                   </h4>
//                   <p className="text-gray-700 leading-relaxed">
//                     {currentQuestion.explanation}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Navigation */}
//         {!isLoading && !error && questionSheet.questions.length > 0 && (
//           <div className="flex justify-between items-center">
//             <button
//               onClick={prevQuestion}
//               disabled={currentQuestionIndex === 0}
//               className="px-6 py-3 bg-white text-gray-600 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
//             >
//               Previous
//             </button>

//             <div className="flex space-x-2">
//               {questionSheet.questions.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => {
//                     setCurrentQuestionIndex(index);
//                     setUserAnswer(null);
//                     setShowExplanation(false);
//                     setVoiceStatus("ready");
//                   }}
//                   className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${
//                     index === currentQuestionIndex
//                       ? "bg-blue-500 text-white shadow-lg"
//                       : completedQuestions.has(
//                           questionSheet.questions[index].id
//                         )
//                       ? "bg-green-500 text-white"
//                       : "bg-white text-gray-600 hover:bg-gray-50"
//                   } shadow-md`}
//                   aria-label={`Go to question ${index + 1}`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//             </div>

//             <button
//               onClick={nextQuestion}
//               disabled={
//                 currentQuestionIndex === questionSheet.questions.length - 1
//               }
//               className="px-6 py-3 bg-white text-gray-600 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MPVAQuestionDisplay;


// import React, { useState, useEffect, useRef } from 'react';
// import { Volume2, VolumeX, ChevronLeft, ChevronRight, Eye, EyeOff, CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// const PracticeTest = () => {
//   const location = useLocation();

//   const {sheet} = location.state || {};
//   console.log("Sheet:>> ",sheet);

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
//   const [isReading, setIsReading] = useState(false);
//   const [score, setScore] = useState(0);
//   const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
//   const [userAnswers, setUserAnswers] = useState({});
//   const [audioFile,setAudioFile] = useState(null);
//   const speechSynthesis = useRef(window.speechSynthesis);
//   const currentUtterance = useRef(null);


//  useEffect(()=>{
//   async function generateAudioFile() {
//     try {
//       const question = sheet.questions[currentQuestion];
//       console.log("Current Question:: ",question)
//       const formattedText = `Question number ${currentQuestion + 1}. ${question.question}. 
//       Option A: ${currentQ.options[0]}. 
//       Option B: ${currentQ.options[1]}. 
//       Option C: ${currentQ.options[2]}. 
//       Option D: ${currentQ.options[3]}.`;

//       const data = JSON.stringify({
//         text: formattedText,
//         voiceId: "en-US-natalie",
//         channelType: "MONO",
//         sampleRate: 24000,
//       });

//       const config = {
//         method: "post",
//         url: "https://api.murf.ai/v1/speech/generate",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "api-key": "ap2_9612a922-814c-4ed7-998f-dae83a2fcab5",
//         },
//         data: data,
//       };

//       const response = await axios(config);
//       console.log("Audio API response:", response.data);
//       console.log("audio url: ", response.data.audioFile);
//       setAudioFile(response.data.audioFile);
//       return response.data.audioFile; // Make sure API returns this key
//     } catch (error) {
//       console.error("Error generating audio file:", error);
//       return null;
//     }
//   }
//   generateAudioFile();
//  },[currentQuestion])


//   // Speech synthesis function
//   const speakText = () => {
//     if (!isVoiceEnabled  || !audioFile) return;
//     setIsReading(true);
//     console.log("🎧 Audio file URL:", audioFile);

//     if (audioFile) {
//       const audio = new Audio(audioFile);
//       audio.play();
//     }
//     setIsReading(false);
//     setShowExplanation(false);
//   };

//   const stopSpeaking = () => {
//     setIsReading(false);
//   };

//   // Read question when component mounts or question changes
//   useEffect(() => {
//     if (isVoiceEnabled) {
//       speakText();
//     }
//   }, [audioFile]);

//   const handleAnswerSelect = (answerIndex) => {
//     if (isAnswered) return;
    
//     setSelectedAnswer(answerIndex);
//     setIsAnswered(true);
//     setAnsweredQuestions(prev => new Set([...prev, currentQuestion]));
//     setUserAnswers(prev => ({ ...prev, [currentQuestion]: answerIndex }));
    
//     // Update score if correct
//     if (answerIndex === (sheet.questions[currentQuestion].answer.charCodeAt(0) - 'A'.charCodeAt(0))) {
//       console.log("choosen :: ",sheet.questions[currentQuestion].answer);
//       setScore(prev => prev + 1);
//     }

//     // Announce result
//     if (isVoiceEnabled) {
//       const isCorrect = answerIndex === (sheet.questions[currentQuestion].answer.charCodeAt(0) - 'A'.charCodeAt(0));
//       const resultText = isCorrect ? "Correct answer!" : "Incorrect answer.";
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < sheet.questions.length - 1) {
//       setCurrentQuestion(prev => prev + 1);
//       setSelectedAnswer(null);
//       setIsAnswered(false);
//       setShowExplanation(false);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(prev => prev - 1);
//       setSelectedAnswer(userAnswers[currentQuestion - 1] || null);
//       setIsAnswered(answeredQuestions.has(currentQuestion - 1));
//       setShowExplanation(false);
//     }
//   };

//   const toggleVoice = () => {
//     setIsVoiceEnabled(prev => !prev);
//   };

//   const toggleExplanation = () => {
//     setShowExplanation(prev => !prev);
//     if (isVoiceEnabled && !showExplanation) {
//       speakText();
//     }
//   };

//   const resetTest = () => {
//     setCurrentQuestion(0);
//     setSelectedAnswer(null);
//     setIsAnswered(false);
//     setShowExplanation(false);
//     setScore(0);
//     setAnsweredQuestions(new Set());
//     setUserAnswers({});
//     stopSpeaking();
//   };

//   const getOptionLabel = (index) => {
//     return String.fromCharCode(65 + index); // A, B, C, D
//   };

//   const getOptionClassName = (index) => {
//     let baseClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-300 transform hover:scale-[1.02] ";
    
//     if (!isAnswered) {
//       return baseClass + "bg-gray-800 border-gray-600 text-white hover:border-blue-500 hover:bg-gray-700";
//     }
    
//     if (index === (sheet.questions[currentQuestion].answer.charCodeAt(0) - 'A'.charCodeAt(0))) {
//       return baseClass + "bg-green-500/20 border-green-500 text-green-400 animate-pulse";
//     }
    
//     if (index === selectedAnswer && index !== (sheet.questions[currentQuestion].answer.charCodeAt(0) - 'A'.charCodeAt(0))) {
//       console.log("choosen :: ",(sheet.questions[currentQuestion].answer.charCodeAt(0) - 'A'.charCodeAt(0)));
//       // console.log("B" - 'A');
//       return baseClass + "bg-red-500/20 border-red-500 text-red-400 animate-pulse";
//     }
    
//     return baseClass + "bg-gray-800 border-gray-600 text-gray-400";
//   };

//   const currentQ = sheet.questions[currentQuestion];
//   const progress = ((currentQuestion + 1) / sheet.questions.length) * 100;

//   return (
//     <div className="min-h-screen bg-gray-900 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-2">{sheet.title}</h1>
//               <p className="text-gray-400">{sheet.description}</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               {/* Voice Toggle */}
//               <button
//                 onClick={toggleVoice}
//                 className={`p-3 rounded-lg border-2 transition-all duration-300 ${
//                   isVoiceEnabled
//                     ? 'bg-blue-500/20 border-blue-500 text-blue-400'
//                     : 'bg-gray-700 border-gray-600 text-gray-400'
//                 }`}
//                 title={isVoiceEnabled ? "Disable Voice" : "Enable Voice"}
//               >
//                 {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
//               </button>
              
//               {/* Home Button */}
//               <button className="p-3 rounded-lg border-2 border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
//                 <Home className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="mb-4">
//             <div className="flex justify-between text-sm text-gray-400 mb-2">
//               <span>Question {currentQuestion + 1} of {sheet.questions.length}</span>
//               <span>Score: {score}/{answeredQuestions.size}</span>
//             </div>
//             <div className="w-full bg-gray-700 rounded-full h-3">
//               <div 
//                 className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-500 ease-out"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Reading Status */}
//           {isReading && (
//             <div className="flex items-center text-blue-400 text-sm animate-pulse">
//               <Volume2 className="w-4 h-4 mr-2" />
//               <span>Reading question...</span>
//             </div>
//           )}
//         </div>

//         {/* Question Card */}
//         <div className="bg-gray-800 rounded-xl p-8 mb-6 border border-gray-700">
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-semibold text-white">
//                 Question {currentQuestion + 1}
//               </h2>
//               {isAnswered && (
//                 <div className="flex items-center">
//                   {selectedAnswer === currentQ.answer.charCodeAt(0) - 'A'.charCodeAt(0) ? (
//                     <CheckCircle className="w-6 h-6 text-green-400 animate-bounce" />
//                   ) : (
//                     <XCircle className="w-6 h-6 text-red-400 animate-bounce" />
//                   )}
//                 </div>
//               )}
//             </div>
//             <p className="text-lg text-gray-200 leading-relaxed">{currentQ.question}</p>
//           </div>

//           {/* Options */}
//           <div className="space-y-4 mb-8">
//             {currentQ.options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerSelect(index)}
//                 disabled={isAnswered}
//                 className={getOptionClassName(index)}
//               >
//                 <div className="flex items-center">
//                   <span className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
//                     {getOptionLabel(index)}
//                   </span>
//                   <span className="text-left">{option}</span>
//                 </div>
//               </button>
//             ))}
//           </div>

//           {/* Explanation */}
//           {isAnswered && (
//             <div className="border-t border-gray-700 pt-6">
//               <button
//                 onClick={toggleExplanation}
//                 className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-4"
//               >
//                 {showExplanation ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
//                 {showExplanation ? 'Hide Explanation' : 'View Explanation'}
//               </button>
              
//               {showExplanation && (
//                 <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 animate-fadeIn">
//                   <h4 className="text-green-400 font-semibold mb-2">Explanation:</h4>
//                   <p className="text-gray-300 leading-relaxed">{currentQ.explanation}</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Navigation */}
//         <div className="flex items-center justify-between">
//           <button
//             onClick={handlePreviousQuestion}
//             disabled={currentQuestion === 0}
//             className="flex items-center px-6 py-3 bg-gray-800 text-gray-300 rounded-lg border border-gray-600 hover:border-gray-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronLeft className="w-5 h-5 mr-2" />
//             Previous
//           </button>

//           <div className="flex items-center space-x-4">
//             <button
//               onClick={resetTest}
//               className="flex items-center px-4 py-3 bg-yellow-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 transition-all duration-300"
//             >
//               <RotateCcw className="w-5 h-5 mr-2" />
//               Reset
//             </button>
//           </div>

//           <button
//             onClick={handleNextQuestion}
//             disabled={currentQuestion === sheet.questions.length - 1}
//             className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//             <ChevronRight className="w-5 h-5 ml-2" />
//           </button>
//         </div>

//         {/* Completion Status */}
//         {currentQuestion === sheet.questions.length - 1 && isAnswered && (
//           <div className="mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30 animate-fadeIn">
//             <h3 className="text-xl font-bold text-white mb-2">Test Completed! 🎉</h3>
//             <p className="text-gray-300">
//               Your final score: <span className="text-green-400 font-bold">{score}/{sheet.questions.length}</span>
//             </p>
//             <p className="text-gray-400 text-sm mt-2">
//               Accuracy: {((score / sheet.questions.length) * 100).toFixed(1)}%
//             </p>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );

// };

// export default PracticeTest;



// import React, { useState, useEffect, useRef } from 'react';
// import { Volume2, VolumeX, ChevronLeft, ChevronRight, Eye, EyeOff, CheckCircle, XCircle, RotateCcw, Home, Mic, MicOff } from 'lucide-react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// const PracticeTest = () => {
//   const location = useLocation();

//   const {sheet} = location.state || {};
//   console.log("Sheet:>> ",sheet);

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
//   const [isReading, setIsReading] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [score, setScore] = useState(0);
//   const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
//   const [userAnswers, setUserAnswers] = useState({});
//   const [audioFile, setAudioFile] = useState(null);
//   const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
//   const [currentAudio, setCurrentAudio] = useState(null);
//   const [feedbackAudio, setFeedbackAudio] = useState(null);
  
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const streamRef = useRef(null);

//   // Deepgram configuration
//   const DEEPGRAM_API_KEY = 'ba4837327683bbccd1b1e363491a87fadaf9bd76'; // Replace with your actual API key

//   useEffect(() => {
//     async function generateAudioFile() {
//       try {
//         const question = sheet.questions[currentQuestion];
//         console.log("Current Question:: ", question)
//         const formattedText = `Question number ${currentQuestion + 1}. ${question.question}. 
//         Option A: ${question.options[0]}. 
//         Option B: ${question.options[1]}. 
//         Option C: ${question.options[2]}. 
//         Option D: ${question.options[3]}.`;

//         const data = JSON.stringify({
//           text: formattedText,
//           voiceId: "en-US-natalie",
//           channelType: "MONO",
//           sampleRate: 24000,
//         });

//         const config = {
//           method: "post",
//           url: "https://api.murf.ai/v1/speech/generate",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             "api-key": "ap2_9612a922-814c-4ed7-998f-dae83a2fcab5",
//           },
//           data: data,
//         };

//         const response = await axios(config);
//         console.log("Audio API response:", response.data);
//         console.log("audio url: ", response.data.audioFile);
//         setAudioFile(response.data.audioFile);
//         return response.data.audioFile;
//       } catch (error) {
//         console.error("Error generating audio file:", error);
//         return null;
//       }
//     }
//     generateAudioFile();
//   }, [currentQuestion])

//   // Generate feedback audio for correct/incorrect responses
//   const generateFeedbackAudio = async (text) => {
//     try {
//       const data = JSON.stringify({
//         text: text,
//         voiceId: "en-US-natalie",
//         channelType: "MONO",
//         sampleRate: 24000,
//       });

//       const config = {
//         method: "post",
//         url: "https://api.murf.ai/v1/speech/generate",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "api-key": "ap2_9612a922-814c-4ed7-998f-dae83a2fcab5",
//         },
//         data: data,
//       };

//       const response = await axios(config);
//       return response.data.audioFile;
//     } catch (error) {
//       console.error("Error generating feedback audio:", error);
//       return null;
//     }
//   };

//   // Generate explanation audio
//   const generateExplanationAudio = async () => {
//     try {
//       const currentQ = sheet.questions[currentQuestion];
//       const explanationText = `Here is the explanation: ${currentQ.explanation}`;
//       console.log(explanationText);
//       const data = JSON.stringify({
//         text: explanationText,
//         voiceId: "en-US-natalie",
//         channelType: "MONO",
//         sampleRate: 24000,
//       });

//       const config = {
//         method: "post",
//         url: "https://api.murf.ai/v1/speech/generate",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "api-key": "ap2_9612a922-814c-4ed7-998f-dae83a2fcab5",
//         },
//         data: data,
//       };

//       const response = await axios(config);
//       return response.data.audioFile;
//     } catch (error) {
//       console.error("Error generating explanation audio:", error);
//       return null;
//     }
//   };

//   // Start voice recognition
//   const startListening = async () => {
//     try {
//       setIsListening(true);
//       audioChunksRef.current = [];

//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       streamRef.current = stream;

//       const mediaRecorder = new MediaRecorder(stream, {
//         mimeType: 'audio/webm;codecs=opus'
//       });
//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
//         await processAudioWithDeepgram(audioBlob);
        
//         // Stop the stream
//         if (streamRef.current) {
//           streamRef.current.getTracks().forEach(track => track.stop());
//         }
//         setIsListening(false);
//       };

//       mediaRecorder.start();

//       // Auto-stop after 5 seconds
//       setTimeout(() => {
//         if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
//           mediaRecorderRef.current.stop();
//         }
//       }, 5000);

//     } catch (error) {
//       console.error('Error starting voice recognition:', error);
//       setIsListening(false);
//       setIsWaitingForResponse(false);
//     }
//   };

//   // Stop listening
//   const stopListening = () => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
//       mediaRecorderRef.current.stop();
//     }
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//     }
//     setIsListening(false);
//   };

//   // Process audio with Deepgram
//   const processAudioWithDeepgram = async (audioBlob) => {
//     try {
//       const formData = new FormData();
//       formData.append('audio', audioBlob);

//       const response = await fetch('https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Token ${DEEPGRAM_API_KEY}`,
//         },
//         body: formData
//       });

//       const result = await response.json();
//       console.log(result);
//       const transcript = result.results?.channels?.[0]?.alternatives?.[0]?.transcript?.toLowerCase() || '';
      
//       console.log('Transcript:', transcript);
//       await handleVoiceResponse(transcript);

//     } catch (error) {
//       console.error('Error processing audio with Deepgram:', error);
//       setIsWaitingForResponse(false);
//     }
//   };

//   // Handle voice response
//   const handleVoiceResponse = async (transcript) => {
//     setIsWaitingForResponse(false);

//     // Check for explanation request
//     if (transcript.includes('explanation') || transcript.includes('explain')) {
//       await readExplanation();
//       return;
//     }

//     if (transcript.includes('next question') || transcript.includes('new question')) {
//       handleNextQuestion();;
//       return;
//     }

//     // Parse answer from transcript
//     let answerIndex = -1;
    
//     // Check for letter answers (a, b, c, d)
//     if (transcript.includes('option a') || transcript.includes(' a ') || transcript === 'a') {
//       answerIndex = 0;
//     } else if (transcript.includes('option b') || transcript.includes(' b ') || transcript === 'b') {
//       answerIndex = 1;
//     } else if (transcript.includes('option c') || transcript.includes(' c ') || transcript === 'c') {
//       answerIndex = 2;
//     } else if (transcript.includes('option d') || transcript.includes(' d ') || transcript === 'd') {
//       answerIndex = 3;
//     }
//     // Check for number answers (1, 2, 3, 4)
//     else if (transcript.includes('1') || transcript.includes('one')) {
//       answerIndex = 0;
//     } else if (transcript.includes('2') || transcript.includes('two')) {
//       answerIndex = 1;
//     } else if (transcript.includes('3') || transcript.includes('three')) {
//       answerIndex = 2;
//     } else if (transcript.includes('4') || transcript.includes('four')) {
//       answerIndex = 3;
//     }

//     if (answerIndex !== -1) {
//       await handleAnswerSelect(answerIndex);
//     } else {
//       // If no valid answer detected, ask user to repeat
//       const repeatAudio = await generateFeedbackAudio("I didn't understand your answer. Please say option A, B, C, or D, or say 1, 2, 3, or 4.");
//       if (repeatAudio) {
//         playAudio(repeatAudio, () => {
//           setIsWaitingForResponse(true);
//           startListening();
//         });
//       }
//     }
//   };

//   // Read explanation
//   const readExplanation = async () => {
//     setShowExplanation(true);
//     const explanationAudio = await generateExplanationAudio();
//     if (explanationAudio) {
//       playAudio(explanationAudio, () => {
//         // After explanation, listen for next instruction
//         setTimeout(() => {
//           const nextInstructionAudio = generateFeedbackAudio("Say 'next question' to continue or 'explanation' to hear it again.");
//           if (nextInstructionAudio) {
//             playAudio(nextInstructionAudio, () => {
//               setIsWaitingForResponse(true);
//               startListening();
//             });
//           }
//         }, 1000);
//       });
//     }
//   };

//   // Play audio with callback
//   const playAudio = (audioUrl, onEnded = null) => {
//     if (currentAudio) {
//       currentAudio.pause();
//       currentAudio.currentTime = 0;
//     }

//     const audio = new Audio(audioUrl);
//     setCurrentAudio(audio);
    
//     audio.onended = () => {
//       setIsReading(false);
//       if (onEnded) onEnded();
//     };
    
//     audio.onerror = (error) => {
//       console.error('Audio playback error:', error);
//       setIsReading(false);
//       if (onEnded) onEnded();
//     };

//     setIsReading(true);
//     audio.play().catch(error => {
//       console.error('Error playing audio:', error);
//       setIsReading(false);
//       if (onEnded) onEnded();
//     });
//   };

//   // Speak question and wait for response
//   const speakText = () => {
//     if (!isVoiceEnabled || !audioFile) return;
    
//     playAudio(audioFile, () => {
//       // After question is read, s  tart listening for answer
//       setIsWaitingForResponse(true);
//       setTimeout(() => {
//         startListening();
//       }, 500);
//     });
//   };

//   const stopSpeaking = () => {
//     if (currentAudio) {
//       currentAudio.pause();
//       currentAudio.currentTime = 0;
//     }
//     setIsReading(false);
//     setIsWaitingForResponse(false);
//     stopListening();
//   };

//   // Read question when audio file is ready
//   useEffect(() => {
//     if (isVoiceEnabled && audioFile && !isAnswered) {
//       speakText();
//     }
//   }, [audioFile]);

//   const handleAnswerSelect = async (answerIndex) => {
//     if (isAnswered) return;
    
//     setSelectedAnswer(answerIndex);
//     setIsAnswered(true);
//     setAnsweredQuestions(prev => new Set([...prev, currentQuestion]));
//     setUserAnswers(prev => ({ ...prev, [currentQuestion]: answerIndex }));
    
//     // Check if answer is correct
//     const correctAnswerIndex = sheet.questions[currentQuestion].answer.charCodeAt(0) - 'A'.charCodeAt(0);
//     const isCorrect = answerIndex === correctAnswerIndex;
    
//     // Update score if correct
//     if (isCorrect) {
//       setScore(prev => prev + 1);
//     }

//     // Provide audio feedback
//     if (isVoiceEnabled) {
//       const feedbackText = isCorrect ? "Correct! Well done." : "That's incorrect. The correct answer is option " + sheet.questions[currentQuestion].answer + ".";
//       const feedbackAudioUrl = await generateFeedbackAudio(feedbackText);
      
//       if (feedbackAudioUrl) {
//         playAudio(feedbackAudioUrl, () => {
//           // After feedback, ask what to do next
//           setTimeout(async () => {
//             const nextActionText = "Say 'next question' to continue or 'read explanation' to hear the explanation.";
//             const nextActionAudio = await generateFeedbackAudio(nextActionText);
//             if (nextActionAudio) {
//               playAudio(nextActionAudio, () => {
//                 setIsWaitingForResponse(true);
//                 startListening();
//               });
//             }
//           }, 1000);
//         });
//       }
//     }
//   };

//   // Handle voice commands for navigation
//   const handleNavigationCommand = async (transcript) => {
//     if (transcript.includes('next') || transcript.includes('continue')) {
//       handleNextQuestion();
//     } else if (transcript.includes('explanation') || transcript.includes('explain')) {
//       await readExplanation();
//     } else {
//       // Ask user to repeat
//       const repeatAudio = await generateFeedbackAudio("Please say 'next question' or 'read explanation'.");
//       if (repeatAudio) {
//         playAudio(repeatAudio, () => {
//           setIsWaitingForResponse(true);
//           startListening();
//         });
//       }
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < sheet.questions.length - 1) {
//       setCurrentQuestion(prev => prev + 1);
//       setSelectedAnswer(null);
//       setIsAnswered(false);
//       setShowExplanation(false);
//       setIsWaitingForResponse(false);
//       stopListening();
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(prev => prev - 1);
//       setSelectedAnswer(userAnswers[currentQuestion - 1] || null);
//       setIsAnswered(answeredQuestions.has(currentQuestion - 1));
//       setShowExplanation(false);
//       setIsWaitingForResponse(false);
//       stopListening();
//     }
//   };

//   const toggleVoice = () => {
//     setIsVoiceEnabled(prev => !prev);
//     if (isVoiceEnabled) {
//       stopSpeaking();
//     }
//   };

//   const toggleExplanation = () => {
//     setShowExplanation(prev => !prev);
//   };

//   const resetTest = () => {
//     setCurrentQuestion(0);
//     setSelectedAnswer(null);
//     setIsAnswered(false);
//     setShowExplanation(false);
//     setScore(0);
//     setAnsweredQuestions(new Set());
//     setUserAnswers({});
//     setIsWaitingForResponse(false);
//     stopSpeaking();
//     stopListening();
//   };

//   const getOptionLabel = (index) => {
//     return String.fromCharCode(65 + index); // A, B, C, D
//   };

//   const getOptionClassName = (index) => {
//     let baseClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-300 transform hover:scale-[1.02] ";
    
//     if (!isAnswered) {
//       return baseClass + "bg-gray-800 border-gray-600 text-white hover:border-blue-500 hover:bg-gray-700";
//     }
    
//     if (index === (sheet.questions[currentQuestion].answer.charCodeAt(0) - 'A'.charCodeAt(0))) {
//       return baseClass + "bg-green-500/20 border-green-500 text-green-400 animate-pulse";
//     }
    
//     if (index === selectedAnswer && index !== (sheet.questions[currentQuestion].answer.charCodeAt(0) - 'A'.charCodeAt(0))) {
//       return baseClass + "bg-red-500/20 border-red-500 text-red-400 animate-pulse";
//     }
    
//     return baseClass + "bg-gray-800 border-gray-600 text-gray-400";
//   };

//   const currentQ = sheet.questions[currentQuestion];
//   const progress = ((currentQuestion + 1) / sheet.questions.length) * 100;

//   return (
//     <div className="min-h-screen bg-gray-900 p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-2">{sheet.title}</h1>
//               <p className="text-gray-400">{sheet.description}</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               {/* Voice Toggle */}
//               <button
//                 onClick={toggleVoice}
//                 className={`p-3 rounded-lg border-2 transition-all duration-300 ${
//                   isVoiceEnabled
//                     ? 'bg-blue-500/20 border-blue-500 text-blue-400'
//                     : 'bg-gray-700 border-gray-600 text-gray-400'
//                 }`}
//                 title={isVoiceEnabled ? "Disable Voice" : "Enable Voice"}
//               >
//                 {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
//               </button>
              
//               {/* Home Button */}
//               <button className="p-3 rounded-lg border-2 border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
//                 <Home className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="mb-4">
//             <div className="flex justify-between text-sm text-gray-400 mb-2">
//               <span>Question {currentQuestion + 1} of {sheet.questions.length}</span>
//               <span>Score: {score}/{answeredQuestions.size}</span>
//             </div>
//             <div className="w-full bg-gray-700 rounded-full h-3">
//               <div 
//                 className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-500 ease-out"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Status Indicators */}
//           <div className="flex items-center space-x-4">
//             {isReading && (
//               <div className="flex items-center text-blue-400 text-sm animate-pulse">
//                 <Volume2 className="w-4 h-4 mr-2" />
//                 <span>Reading question...</span>
//               </div>
//             )}
            
//             {isListening && (
//               <div className="flex items-center text-green-400 text-sm animate-pulse">
//                 <Mic className="w-4 h-4 mr-2" />
//                 <span>Listening for your answer...</span>
//               </div>
//             )}
            
//             {isWaitingForResponse && !isListening && (
//               <div className="flex items-center text-yellow-400 text-sm">
//                 <MicOff className="w-4 h-4 mr-2" />
//                 <span>Waiting for response...</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Question Card */}
//         <div className="bg-gray-800 rounded-xl p-8 mb-6 border border-gray-700">
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-semibold text-white">
//                 Question {currentQuestion + 1}
//               </h2>
//               {isAnswered && (
//                 <div className="flex items-center">
//                   {selectedAnswer === (currentQ.answer.charCodeAt(0) - 'A'.charCodeAt(0)) ? (
//                     <CheckCircle className="w-6 h-6 text-green-400 animate-bounce" />
//                   ) : (
//                     <XCircle className="w-6 h-6 text-red-400 animate-bounce" />
//                   )}
//                 </div>
//               )}
//             </div>
//             <p className="text-lg text-gray-200 leading-relaxed">{currentQ.question}</p>
//           </div>

//           {/* Options */}
//           <div className="space-y-4 mb-8">
//             {currentQ.options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerSelect(index)}
//                 disabled={isAnswered}
//                 className={getOptionClassName(index)}
//               >
//                 <div className="flex items-center">
//                   <span className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
//                     {getOptionLabel(index)}
//                   </span>
//                   <span className="text-left">{option}</span>
//                 </div>
//               </button>
//             ))}
//           </div>

//           {/* Voice Instructions */}
//           {isVoiceEnabled && !isAnswered && (
//             <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
//               <p className="text-blue-300 text-sm">
//                 🎤 Voice Instructions: Say "A", "B", "C", "D" or "1", "2", "3", "4" to select your answer.
//               </p>
//             </div>
//           )}

//           {/* Explanation */}
//           {isAnswered && (
//             <div className="border-t border-gray-700 pt-6">
//               <button
//                 onClick={toggleExplanation}
//                 className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-4"
//               >
//                 {showExplanation ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
//                 {showExplanation ? 'Hide Explanation' : 'View Explanation'}
//               </button>
              
//               {showExplanation && (
//                 <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 animate-fadeIn">
//                   <h4 className="text-green-400 font-semibold mb-2">Explanation:</h4>
//                   <p className="text-gray-300 leading-relaxed">{currentQ.explanation}</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Manual Controls */}
//         <div className="flex items-center justify-between">
//           <button
//             onClick={handlePreviousQuestion}
//             disabled={currentQuestion === 0}
//             className="flex items-center px-6 py-3 bg-gray-800 text-gray-300 rounded-lg border border-gray-600 hover:border-gray-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronLeft className="w-5 h-5 mr-2" />
//             Previous
//           </button>

//           <div className="flex items-center space-x-4">
//             {/* Manual Voice Controls */}
//             {isVoiceEnabled && (
//               <div className="flex items-center space-x-2">
//                 {!isListening ? (
//                   <button
//                     onClick={startListening}
//                     disabled={isReading || !isWaitingForResponse}
//                     className="flex items-center px-4 py-3 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Mic className="w-5 h-5 mr-2" />
//                     Listen
//                   </button>
//                 ) : (
//                   <button
//                     onClick={stopListening}
//                     className="flex items-center px-4 py-3 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all duration-300"
//                   >
//                     <MicOff className="w-5 h-5 mr-2" />
//                     Stop
//                   </button>
//                 )}
//               </div>
//             )}

//             <button
//               onClick={resetTest}
//               className="flex items-center px-4 py-3 bg-yellow-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 transition-all duration-300"
//             >
//               <RotateCcw className="w-5 h-5 mr-2" />
//               Reset
//             </button>
//           </div>

//           <button
//             onClick={handleNextQuestion}
//             disabled={currentQuestion === sheet.questions.length - 1}
//             className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//             <ChevronRight className="w-5 h-5 ml-2" />
//           </button>
//         </div>

//         {/* Completion Status */}
//         {currentQuestion === sheet.questions.length - 1 && isAnswered && (
//           <div className="mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30 animate-fadeIn">
//             <h3 className="text-xl font-bold text-white mb-2">Test Completed! 🎉</h3>
//             <p className="text-gray-300">
//               Your final score: <span className="text-green-400 font-bold">{score}/{sheet.questions.length}</span>
//             </p>
//             <p className="text-gray-400 text-sm mt-2">
//               Accuracy: {((score / sheet.questions.length) * 100).toFixed(1)}%
//             </p>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PracticeTest;

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Eye, EyeOff, CheckCircle, XCircle, RotateCcw, Home, Mic, MicOff, StopCircle } from 'lucide-react'; // Import StopCircle
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PracticeTest = () => {
  const location = useLocation();

  const {sheet} = location.state || {};
  console.log("Sheet:>> ",sheet);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isReading, setIsReading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [userAnswers, setUserAnswers] = useState({});
  const [audioFile, setAudioFile] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [feedbackAudio, setFeedbackAudio] = useState(null); // This state is declared but not used in provided logic, consider removing if not needed.
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  // Deepgram configuration
  const DEEPGRAM_API_KEY = 'ba4837327683bbccd1b1e363491a87fadaf9bd76'; // Replace with your actual API key

  // Cleanup effect for unmounting
  useEffect(() => {
    return () => {
      // This function runs when the component unmounts
      console.log("Cleaning up PracticeTest component on unmount...");
      handleStopAllVoice(); // Ensure all audio is stopped on unmount
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  useEffect(() => {
    async function generateAudioFile() {
      if (!sheet || !sheet.questions || !sheet.questions[currentQuestion]) {
        console.warn("Sheet data or current question is not available for audio generation.");
        return;
      }
      try {
        const question = sheet.questions[currentQuestion];
        console.log("Current Question:: ", question)
        const formattedText = `Question number ${currentQuestion + 1}. ${question.question}. 
        Option A: ${question.options[0]}. 
        Option B: ${question.options[1]}. 
        Option C: ${question.options[2]}. 
        Option D: ${question.options[3]}.`;

        const data = JSON.stringify({
          text: formattedText,
          voiceId: "en-US-natalie",
          channelType: "MONO",
          sampleRate: 24000,
        });

        const config = {
          method: "post",
          url: "https://api.murf.ai/v1/speech/generate",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "api-key": "ap2_9612a922-814c-4ed7-998f-dae83a2fcab5",
          },
          data: data,
        };

        const response = await axios(config);
        console.log("Audio API response:", response.data);
        console.log("audio url: ", response.data.audioFile);
        setAudioFile(response.data.audioFile);
        return response.data.audioFile;
      } catch (error) {
        console.error("Error generating audio file:", error);
        return null;
      }
    }
    generateAudioFile();
  }, [currentQuestion, sheet]); // Added sheet to dependencies in case it changes

  // Generate feedback audio for correct/incorrect responses
  const generateFeedbackAudio = async (text) => {
    try {
      const data = JSON.stringify({
        text: text,
        voiceId: "en-US-natalie",
        channelType: "MONO",
        sampleRate: 24000,
      });

      const config = {
        method: "post",
        url: "https://api.murf.ai/v1/speech/generate",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": "ap2_9612a922-814c-4ed7-998f-dae83a2fcab5",
        },
        data: data,
      };

      const response = await axios(config);
      return response.data.audioFile;
    } catch (error) {
      console.error("Error generating feedback audio:", error);
      return null;
    }
  };

  // Generate explanation audio
  const generateExplanationAudio = async () => {
    if (!sheet || !sheet.questions || !sheet.questions[currentQuestion]) {
      console.warn("Sheet data or current question explanation is not available.");
      return null;
    }
    try {
      const currentQ = sheet.questions[currentQuestion];
      const explanationText = `Here is the explanation: ${currentQ.explanation}`;
      console.log(explanationText);
      const data = JSON.stringify({
        text: explanationText,
        voiceId: "en-US-natalie",
        channelType: "MONO",
        sampleRate: 24000,
      });

      const config = {
        method: "post",
        url: "https://api.murf.ai/v1/speech/generate",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": "ap2_9612a922-814c-4ed7-998f-dae83a2fcab5",
        },
        data: data,
      };

      const response = await axios(config);
      return response.data.audioFile;
    } catch (error) {
      console.error("Error generating explanation audio:", error);
      return null;
    }
  };

  // Start voice recognition
  const startListening = async () => {
    try {
      setIsListening(true);
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
        await processAudioWithDeepgram(audioBlob);
        
        // Stop the stream tracks after recording stops
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null; // Clear the ref
        }
        setIsListening(false);
        mediaRecorderRef.current = null; // Clear the ref
      };

      mediaRecorder.start();

      // Auto-stop after 5 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      }, 5000);

    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setIsListening(false);
      setIsWaitingForResponse(false);
      // Ensure stream is stopped even on error
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  // Stop listening
  const stopListening = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    // Ensure stream is stopped even if mediaRecorder was not recording
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsListening(false);
  };

  // Process audio with Deepgram
  const processAudioWithDeepgram = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const response = await fetch('https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${DEEPGRAM_API_KEY}`,
        },
        body: formData
      });

      const result = await response.json();
      console.log(result);
      const transcript = result.results?.channels?.[0]?.alternatives?.[0]?.transcript?.toLowerCase() || '';
      
      console.log('Transcript:', transcript);
      await handleVoiceResponse(transcript);

    } catch (error) {
      console.error('Error processing audio with Deepgram:', error);
      setIsWaitingForResponse(false);
    }
  };

  // Handle voice response
  const handleVoiceResponse = async (transcript) => {
    setIsWaitingForResponse(false);

    // Check for explanation request
    if (transcript.includes('explanation') || transcript.includes('explain')) {
      await readExplanation();
      return;
    }

    if (transcript.includes('next question') || transcript.includes('new question')) {
      handleNextQuestion();
      return;
    }

    // Parse answer from transcript
    let answerIndex = -1;
    
    // Check for letter answers (a, b, c, d)
    if (transcript.includes('option a') || transcript.includes(' a ') || transcript === 'a') {
      answerIndex = 0;
    } else if (transcript.includes('option b') || transcript.includes(' b ') || transcript === 'b') {
      answerIndex = 1;
    } else if (transcript.includes('option c') || transcript.includes(' c ') || transcript === 'c') {
      answerIndex = 2;
    } else if (transcript.includes('option d') || transcript.includes(' d ') || transcript === 'd') {
      answerIndex = 3;
    }
    // Check for number answers (1, 2, 3, 4)
    else if (transcript.includes('1') || transcript.includes('one')) {
      answerIndex = 0;
    } else if (transcript.includes('2') || transcript.includes('two')) {
      answerIndex = 1;
    } else if (transcript.includes('3') || transcript.includes('three')) {
      answerIndex = 2;
    } else if (transcript.includes('4') || transcript.includes('four')) {
      answerIndex = 3;
    }

    if (answerIndex !== -1) {
      await handleAnswerSelect(answerIndex);
    } else {
      // If no valid answer detected, ask user to repeat
      const repeatAudio = await generateFeedbackAudio("I didn't understand your answer. Please say option A, B, C, or D, or say 1, 2, 3, or 4.");
      if (repeatAudio) {
        playAudio(repeatAudio, () => {
          setIsWaitingForResponse(true);
          startListening();
        });
      }
    }
  };

  // Read explanation
  const readExplanation = async () => {
    setShowExplanation(true);
    const explanationAudio = await generateExplanationAudio();
    if (explanationAudio) {
      playAudio(explanationAudio, () => {
        // After explanation, listen for next instruction
        setTimeout(async () => { // Made async to await generateFeedbackAudio
          const nextInstructionAudio = await generateFeedbackAudio("Say 'next question' to continue or 'explanation' to hear it again.");
          if (nextInstructionAudio) {
            playAudio(nextInstructionAudio, () => {
              setIsWaitingForResponse(true);
              startListening();
            });
          }
        }, 1000);
      });
    }
  };

  // Play audio with callback
  const playAudio = (audioUrl, onEnded = null) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = new Audio(audioUrl);
    setCurrentAudio(audio);
    
    audio.onended = () => {
      setIsReading(false);
      if (onEnded) onEnded();
      setCurrentAudio(null); // Clear after audio ends
    };
    
    audio.onerror = (error) => {
      console.error('Audio playback error:', error);
      setIsReading(false);
      if (onEnded) onEnded();
      setCurrentAudio(null); // Clear after audio error
    };

    setIsReading(true);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
      setIsReading(false);
      if (onEnded) onEnded();
      setCurrentAudio(null); // Clear after play error
    });
  };

  // Speak question and wait for response
  const speakText = () => {
    if (!isVoiceEnabled || !audioFile) return;
    
    playAudio(audioFile, () => {
      // After question is read, start listening for answer
      setIsWaitingForResponse(true);
      setTimeout(() => {
        startListening();
      }, 500);
    });
  };

  // Consolidated stop function
  const handleStopAllVoice = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    setIsReading(false);
    setAudioFile(null);
    setCurrentAudio(null);
    setIsWaitingForResponse(false);
    stopListening(); // Calls the existing stopListening logic
  };

  // Read question when audio file is ready
  useEffect(() => {
    // Only speak if voice is enabled, audio file is available, and we haven't answered yet
    // Also, added a check to ensure we aren't already reading
    if (isVoiceEnabled && audioFile && !isAnswered && !isReading) {
      speakText();
    }
  }, [audioFile, isVoiceEnabled, isAnswered]); // Added isVoiceEnabled and isAnswered to dependencies

  const handleAnswerSelect = async (answerIndex) => {
    if (isAnswered) return;
    
    // Stop any ongoing voice activities immediately when an answer is selected
    handleStopAllVoice();

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion]));
    setUserAnswers(prev => ({ ...prev, [currentQuestion]: answerIndex }));
    
    // Check if answer is correct
    const correctAnswerIndex = sheet.questions[currentQuestion].answer.charCodeAt(0) - 'A'.charCodeAt(0);
    const isCorrect = answerIndex === correctAnswerIndex;
    
    // Update score if correct
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Provide audio feedback
    if (isVoiceEnabled) {
      const feedbackText = isCorrect ? "Correct! Well done." : "That's incorrect. The correct answer is option " + sheet.questions[currentQuestion].answer + ".";
      const feedbackAudioUrl = await generateFeedbackAudio(feedbackText);
      
      if (feedbackAudioUrl) {
        playAudio(feedbackAudioUrl, () => {
          // After feedback, ask what to do next
          setTimeout(async () => { // Made async to await generateFeedbackAudio
            const nextActionText = "Say 'next question' to continue or 'read explanation' to hear the explanation.";
            const nextActionAudio = await generateFeedbackAudio(nextActionText);
            if (nextActionAudio) {
              playAudio(nextActionAudio, () => {
                setIsWaitingForResponse(true);
                startListening();
              });
            }
          }, 1000);
        });
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sheet.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
      setIsWaitingForResponse(false);
      setAudioFile(null); // Reset audio file for new question
      handleStopAllVoice(); // Ensure speaking and listening stops immediately
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1] || null);
      setIsAnswered(answeredQuestions.has(currentQuestion - 1));
      setShowExplanation(false);
      setIsWaitingForResponse(false);
      setAudioFile(null); // Reset audio file for new question
      handleStopAllVoice(); // Ensure speaking and listening stops immediately
    }
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(prev => !prev);
    // If voice was enabled and is now being disabled, stop all current voice activities
    if (isVoiceEnabled) { 
      handleStopAllVoice();
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(prev => !prev);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    setUserAnswers({});
    setIsWaitingForResponse(false);
    setAudioFile(null); // Reset audio file for first question
    handleStopAllVoice(); // Stop all voice activities on reset
  };

  const getOptionLabel = (index) => {
    return String.fromCharCode(65 + index); // A, B, C, D
  };

  const getOptionClassName = (index) => {
    let baseClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-300 transform hover:scale-[1.02] ";
    
    if (!isAnswered) {
      return baseClass + "bg-gray-800 border-gray-600 text-white hover:border-blue-500 hover:bg-gray-700";
    }
    
    if (index === (sheet.questions[currentQuestion].answer.charCodeAt(0) - 'A'.charCodeAt(0))) {
      return baseClass + "bg-green-500/20 border-green-500 text-green-400 animate-pulse";
    }
    
    if (index === selectedAnswer && index !== (sheet.questions[currentQuestion].answer.charCodeAt(0) - 'A'.charCodeAt(0))) {
      return baseClass + "bg-red-500/20 border-red-500 text-red-400 animate-pulse";
    }
    
    return baseClass + "bg-gray-800 border-gray-600 text-gray-400";
  };

  const currentQ = sheet.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / sheet.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{sheet.title}</h1>
              <p className="text-gray-400">{sheet.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Voice Toggle */}
              <button
                onClick={toggleVoice}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  isVoiceEnabled
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                    : 'bg-gray-700 border-gray-600 text-gray-400'
                }`}
                title={isVoiceEnabled ? "Disable Voice" : "Enable Voice"}
              >
                {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              
              {/* Stop All Voice Button */}~
                <button
                  onClick={handleStopAllVoice}
                  className="p-3 rounded-lg border-2 border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
                  title="Stop All Voice Activity"
                >
                  <StopCircle className="w-5 h-5" />
                </button>

              {/* Home Button */}
              <button className="p-3 rounded-lg border-2 border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                <Home className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentQuestion + 1} of {sheet.questions.length}</span>
              <span>Score: {score}/{answeredQuestions.size}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-4">
            {isReading && (
              <div className="flex items-center text-blue-400 text-sm animate-pulse">
                <Volume2 className="w-4 h-4 mr-2" />
                <span>Reading question...</span>
              </div>
            )}
            
            {isListening && (
              <div className="flex items-center text-green-400 text-sm animate-pulse">
                <Mic className="w-4 h-4 mr-2" />
                <span>Listening for your answer...</span>
              </div>
            )}
            
            {isWaitingForResponse && !isListening && (
              <div className="flex items-center text-yellow-400 text-sm">
                <MicOff className="w-4 h-4 mr-2" />
                <span>Waiting for response...</span>
              </div>
            )}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-800 rounded-xl p-8 mb-6 border border-gray-700">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                Question {currentQuestion + 1}
              </h2>
              {isAnswered && (
                <div className="flex items-center">
                  {selectedAnswer === (currentQ.answer.charCodeAt(0) - 'A'.charCodeAt(0)) ? (
                    <CheckCircle className="w-6 h-6 text-green-400 animate-bounce" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 animate-bounce" />
                  )}
                </div>
              )}
            </div>
            <p className="text-lg text-gray-200 leading-relaxed">{currentQ.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={getOptionClassName(index)}
              >
                <div className="flex items-center">
                  <span className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                    {getOptionLabel(index)}
                  </span>
                  <span className="text-left">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Voice Instructions */}
          {isVoiceEnabled && !isAnswered && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-blue-300 text-sm">
                🎤 Voice Instructions: Say "A", "B", "C", "D" or "1", "2", "3", "4" to select your answer.
              </p>
            </div>
          )}

          {/* Explanation */}
          {isAnswered && (
            <div className="border-t border-gray-700 pt-6">
              <button
                onClick={toggleExplanation}
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-4"
              >
                {showExplanation ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
                {showExplanation ? 'Hide Explanation' : 'View Explanation'}
              </button>
              
              {showExplanation && (
                <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 animate-fadeIn">
                  <h4 className="text-green-400 font-semibold mb-2">Explanation:</h4>
                  <p className="text-gray-300 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Manual Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center px-6 py-3 bg-gray-800 text-gray-300 rounded-lg border border-gray-600 hover:border-gray-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <div className="flex items-center space-x-4">
            {/* Manual Voice Controls */}
            {isVoiceEnabled && (
              <div className="flex items-center space-x-2">
                {!isListening ? (
                  <button
                    onClick={startListening}
                    // Disable if reading or not in a state waiting for voice input
                    disabled={isReading || !isWaitingForResponse || isAnswered}
                    className="flex items-center px-4 py-3 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Mic className="w-5 h-5 mr-2" />
                    Listen
                  </button>
                ) : (
                  <button
                    onClick={stopListening}
                    className="flex items-center px-4 py-3 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all duration-300"
                  >
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop
                  </button>
                )}
              </div>
            )}

            <button
              onClick={resetTest}
              className="flex items-center px-4 py-3 bg-yellow-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </button>
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={currentQuestion === sheet.questions.length - 1}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Completion Status */}
        {currentQuestion === sheet.questions.length - 1 && isAnswered && (
          <div className="mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30 animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-2">Test Completed! 🎉</h3>
            <p className="text-gray-300">
              Your final score: <span className="text-green-400 font-bold">{score}/{sheet.questions.length}</span>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Accuracy: {((score / sheet.questions.length) * 100).toFixed(1)}%
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PracticeTest;