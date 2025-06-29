// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Play, 
//   Pause, 
//   Square, 
//   Volume2, 
//   VolumeX, 
//   SkipForward, 
//   SkipBack, 
//   Settings, 
//   ArrowLeft,
//   Clock,
//   User,
//   BookOpen,
//   Tag,
//   Star,
//   Heart,
//   Share2,
//   Download,
//   RotateCcw
// } from 'lucide-react';
// // Note: In real implementation, useLocation and useNavigate would come from react-router-dom

// const StoryReader = () => {
//   // Mock navigation functions for demo (replace with actual react-router-dom in implementation)
//   const location = { state: { story: null } };
//   const navigate = (path) => console.log('Navigate to:', path);
//   const [audioFile,setAudioFile] = useState(null);
  
//   const storyData = location.state?.story || {
//     id: 1,
//     title: "The Enchanted Forest Adventure",
//     author: "Maya Johnson",
//     description: "Join Luna on a magical journey through an enchanted forest where she discovers the power of courage and friendship.",
//     duration: "25 min",
//     category: "Fantasy",
//     ageGroup: "8-12 years",
//     tags: ["Magic", "Adventure", "Friendship", "Courage"],
//     coverColor: "from-emerald-500 via-teal-500 to-cyan-500",
//     difficulty: "Intermediate",
//     story: `Once upon a time, in a small village nestled between rolling hills and a mysterious forest, lived a curious young girl named Luna. She had sparkling green eyes that matched the color of the forest leaves and an adventurous spirit that could not be contained.

// Every day, Luna would gaze out of her bedroom window at the Enchanted Forest that bordered her village. The villagers had always warned the children to stay away from the forest, telling tales of magical creatures and mysterious happenings. But Luna was different—she was drawn to the unknown like a moth to a flame.

// One sunny morning, when the golden rays of sunlight danced through her curtains, Luna made a decision that would change her life forever. She packed a small bag with some bread, cheese, and her grandmother's compass, and set off toward the forest that had captured her imagination for so long.

// As she stepped past the first line of ancient oak trees, the world around her seemed to shimmer and change. The air grew cooler and filled with a sweet, floral scent she had never encountered before. Flowers of impossible colors bloomed along the forest path, and she could swear she heard them whispering her name in the gentle breeze.

// Luna followed a winding path deeper into the forest, her heart racing with excitement and just a touch of fear. The canopy above grew thicker, filtering the sunlight into beams of gold and green that created a magical atmosphere around her.

// Suddenly, she heard a soft crying coming from behind a cluster of silver-leafed bushes. Luna's kind heart couldn't ignore the sound, so she carefully pushed through the foliage to investigate. There, sitting on a moss-covered rock, was the most beautiful creature she had ever seen—a small fairy with wings that sparkled like diamonds and tears that looked like tiny pearls.

// "Why are you crying?" Luna asked gently, kneeling down to be at eye level with the fairy.

// The fairy looked up with surprise. "You can see me? Most humans cannot see our kind unless they possess a truly pure heart and boundless courage."

// Luna smiled warmly. "I'm Luna. What's your name, and how can I help you?"

// "I'm Stella," the fairy replied, wiping away her pearl-like tears. "I've lost my way home, and without my magic crystal, I cannot fly properly. It fell somewhere in the Whispering Meadow, but I'm too small and scared to search for it alone."

// Without hesitation, Luna stood up and extended her hand to Stella. "Then we'll find it together. I may not have wings, but I have determination, and that's almost as good as magic."

// And so began an extraordinary friendship and an adventure that would teach Luna that true magic isn't found in spells or enchanted objects, but in the courage to help others and the strength that comes from believing in yourself.

// Together, Luna and Stella ventured deeper into the Enchanted Forest, facing challenges that tested not only Luna's bravery but also her wisdom and compassion. They encountered talking animals who spoke in riddles, crossed bridges guarded by ancient tree spirits, and navigated through meadows where flowers sang lullabies.

// Each obstacle they overcame together made their friendship stronger and Luna's confidence grow. She discovered that she possessed a rare gift—the ability to understand and communicate with all the magical creatures of the forest. This gift, Stella explained, was only given to those with the purest intentions and the bravest hearts.

// As the sun began to set on their adventure, painting the sky in shades of pink and gold, Luna and Stella finally reached the Whispering Meadow. There, nestled among flowers that glowed softly in the twilight, they found Stella's precious crystal, pulsing with a warm, welcoming light.

// With her crystal restored, Stella's wings regained their brilliant sparkle, and she could fly once more. But before they parted ways, she granted Luna a special gift—a small pendant that would always remind her of their adventure and the magic that lives within courage and kindness.

// Luna returned to her village that evening, forever changed by her experience. She had learned that the greatest adventures come not from seeking magic in far-off places, but from opening your heart to help others and believing in the magic that exists within yourself.

// And though she never saw Stella again, Luna would often catch glimpses of sparkling lights dancing at the edge of the Enchanted Forest, and she would smile, knowing that somewhere in that magical realm, her fairy friend was safe and happy, spreading magic and kindness wherever she went.

// From that day forward, Luna became known in her village as the girl who brought a little bit of magic into everyone's life, simply by being brave enough to care and kind enough to help. And whenever children in the village felt scared or uncertain, they would remember Luna's story and find the courage to face their own adventures.

// The End.`
//   };


//   // Generate feedback audio for correct/incorrect responses
//   useEffect(()=>{
//   const generateAudioFile = async () => {
//     try {


//       const data = JSON.stringify({
//         text: `You are about to read "${storyData.title}", a story penned by ${storyData.author}. ${storyData.story}`,
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
//       setAudioFile(response.data.audioFile);
//       return response.data.audioFile;
//     } catch (error) {
//       console.error("Error generating feedback audio:", error);
//       return null;
//     }
//   }
//   generateAudioFile();
// },[])

//   // TTS State
//   const [isReading, setIsReading] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
//   const [currentPosition, setCurrentPosition] = useState(0);
//   const [readingSpeed, setReadingSpeed] = useState(1);
//   const [volume, setVolume] = useState(0.8);
//   const [showSettings, setShowSettings] = useState(false);

//   // Refs
//   const speechSynthesis = useRef(window.speechSynthesis);
//   const currentUtterance = useRef(null);
//   const storyTextRef = useRef(null);

//   // Break story into sentences for better control
//   const sentences = storyData.story.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);

//   // Voice synthesis functions
//   const speakText = (text, startPosition = 0) => {
//     if (audioFile) {
//       const audio = new Audio(audioFile);
//       audio.play();
//     }
//   };

//   const pauseReading = () => {
    
//   };

//   const resumeReading = () => {
    
//   };

//   const stopReading = () => {
//     setIsReading(false);
//     setIsPaused(false);
//     setCurrentPosition(0);
//   };

//   const handlePlayPause = () => {
//     if (!isReading && !isPaused) {
//       speakText(storyData.story);
//     } else if (isPaused) {
//       resumeReading();
//     } else {
//       pauseReading();
//     }
//   };

//   const skipForward = () => {
//     // Skip forward 30 seconds worth of text (approximately)
//     const wordsPerMinute = 150;
//     const wordsToSkip = (wordsPerMinute * 0.5); // 30 seconds
//     const words = storyData.story.split(' ');
//     const newPosition = Math.min(currentPosition + wordsToSkip, words.length);
//     const remainingText = words.slice(newPosition).join(' ');
    
//     setCurrentPosition(newPosition);
//     if (isReading) {
//       speakText(remainingText);
//     }
//   };

//   const skipBackward = () => {
//     // Skip backward 15 seconds worth of text
//     const wordsPerMinute = 150;
//     const wordsToSkip = (wordsPerMinute * 0.25); // 15 seconds
//     const words = storyData.story.split(' ');
//     const newPosition = Math.max(currentPosition - wordsToSkip, 0);
//     const remainingText = words.slice(newPosition).join(' ');
    
//     setCurrentPosition(newPosition);
//     if (isReading) {
//       speakText(remainingText);
//     }
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'Beginner':
//         return 'bg-green-500/20 text-green-400 border-green-500/30';
//       case 'Intermediate':
//         return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
//       case 'Advanced':
//         return 'bg-red-500/20 text-red-400 border-red-500/30';
//       default:
//         return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
//     }
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'Fantasy': 'bg-purple-500/10 text-purple-400',
//       'Adventure': 'bg-orange-500/10 text-orange-400',
//       'Classic Literature': 'bg-blue-500/10 text-blue-400',
//       'Fairy Tales': 'bg-pink-500/10 text-pink-400',
//       'Science Fiction': 'bg-cyan-500/10 text-cyan-400'
//     };
//     return colors[category] || 'bg-gray-500/10 text-gray-400';
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       stopReading();
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900">
//       {/* Hero Section */}
//       <div className={`bg-gradient-to-br ${storyData.coverColor} relative`}>
//         <div className="absolute inset-0 bg-black/40"></div>
//         <div className="relative max-w-7xl mx-auto px-6 py-12">
//           {/* Navigation */}
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center text-white/90 hover:text-white mb-8 transition-colors duration-200"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Stories
//           </button>

//           {/* Story Header */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
//             <div className="lg:col-span-2">
//               <div className="flex flex-wrap gap-3 mb-4">
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${getCategoryColor(storyData.category)}`}>
//                   {storyData.category}
//                 </span>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${getDifficultyColor(storyData.difficulty)}`}>
//                   {storyData.difficulty}
//                 </span>
//               </div>
              
//               <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                 {storyData.title}
//               </h1>
              
//               <p className="text-xl text-white/90 mb-6 leading-relaxed">
//                 {storyData.description}
//               </p>

//               {/* Story Metadata */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white/80">
//                 <div className="flex items-center">
//                   <User className="w-5 h-5 mr-2" />
//                   <div>
//                     <p className="text-sm opacity-75">Author</p>
//                     <p className="font-medium">{storyData.author}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="w-5 h-5 mr-2" />
//                   <div>
//                     <p className="text-sm opacity-75">Duration</p>
//                     <p className="font-medium">{storyData.duration}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <BookOpen className="w-5 h-5 mr-2" />
//                   <div>
//                     <p className="text-sm opacity-75">Age Group</p>
//                     <p className="font-medium">{storyData.ageGroup}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center">
//                   <Star className="w-5 h-5 mr-2 text-yellow-400" />
//                   <div>
//                     <p className="text-sm opacity-75">Rating</p>
//                     <p className="font-medium">4.8/5</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Action Panel */}
//             <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
//               <h3 className="text-white font-semibold mb-4">Story Controls</h3>
              
//               {/* Main Play Button */}
//               <button
//                 onClick={handlePlayPause}
//                 className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center mb-4 border border-white/20 hover:border-white/30"
//               >
//                 {isReading && !isPaused ? (
//                   <>
//                     <Pause className="w-6 h-6 mr-2" />
//                     Pause Story
//                   </>
//                 ) : (
//                   <>
//                     <Play className="w-6 h-6 mr-2" />
//                     {isPaused ? 'Resume Story' : 'Start Reading'}
//                   </>
//                 )}
//               </button>

//               {/* Control Buttons */}
//               <div className="flex items-center justify-center space-x-2 mb-4">
//                 <button
//                   onClick={skipBackward}
//                   className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all duration-300 border border-white/10"
//                   title="Skip Back 15s"
//                 >
//                   <SkipBack className="w-5 h-5 text-white" />
//                 </button>
                
//                 <button
//                   onClick={stopReading}
//                   className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all duration-300 border border-white/10"
//                   title="Stop"
//                 >
//                   <Square className="w-5 h-5 text-white" />
//                 </button>
                
//                 <button
//                   onClick={skipForward}
//                   className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all duration-300 border border-white/10"
//                   title="Skip Forward 30s"
//                 >
//                   <SkipForward className="w-5 h-5 text-white" />
//                 </button>
                
//                 <button
//                   onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
//                   className={`p-3 backdrop-blur-sm rounded-lg transition-all duration-300 border ${
//                     isVoiceEnabled 
//                       ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
//                       : 'bg-white/10 border-white/10 text-white'
//                   }`}
//                   title={isVoiceEnabled ? "Disable Voice" : "Enable Voice"}
//                 >
//                   {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
//                 </button>
//               </div>

//               {/* Settings Toggle */}
//               <button
//                 onClick={() => setShowSettings(!showSettings)}
//                 className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center border border-white/10"
//               >
//                 <Settings className="w-4 h-4 mr-2" />
//                 Voice Settings
//               </button>

//               {/* Voice Settings Panel */}
//               {showSettings && (
//                 <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 space-y-4">
//                   <div>
//                     <label className="block text-white text-sm mb-2">Reading Speed</label>
//                     <input
//                       type="range"
//                       min="0.5"
//                       max="2"
//                       step="0.1"
//                       value={readingSpeed}
//                       onChange={(e) => setReadingSpeed(parseFloat(e.target.value))}
//                       className="w-full accent-blue-500"
//                     />
//                     <div className="flex justify-between text-xs text-white/70 mt-1">
//                       <span>Slow</span>
//                       <span>{readingSpeed}x</span>
//                       <span>Fast</span>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-white text-sm mb-2">Volume</label>
//                     <input
//                       type="range"
//                       min="0"
//                       max="1"
//                       step="0.1"
//                       value={volume}
//                       onChange={(e) => setVolume(parseFloat(e.target.value))}
//                       className="w-full accent-blue-500"
//                     />
//                     <div className="flex justify-between text-xs text-white/70 mt-1">
//                       <span>Quiet</span>
//                       <span>{Math.round(volume * 100)}%</span>
//                       <span>Loud</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Additional Actions */}
//               <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
//                 <button className="flex items-center text-white/70 hover:text-white transition-colors text-sm">
//                   <Heart className="w-4 h-4 mr-1" />
//                   Like
//                 </button>
//                 <button className="flex items-center text-white/70 hover:text-white transition-colors text-sm">
//                   <Share2 className="w-4 h-4 mr-1" />
//                   Share
//                 </button>
//                 <button className="flex items-center text-white/70 hover:text-white transition-colors text-sm">
//                   <Download className="w-4 h-4 mr-1" />
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Story Content */}
//       <div className="max-w-4xl mx-auto px-6 py-12">
//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mb-8">
//           {storyData.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="flex items-center px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
//             >
//               <Tag className="w-3 h-3 mr-1" />
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Reading Status */}
//         {isReading && (
//           <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8 flex items-center">
//             <div className="animate-pulse bg-blue-500 rounded-full w-3 h-3 mr-3"></div>
//             <span className="text-blue-400 font-medium">
//               {isPaused ? 'Reading Paused' : 'Currently Reading...'}
//             </span>
//             <div className="ml-auto flex items-center space-x-2">
//               <span className="text-blue-400 text-sm">{readingSpeed}x speed</span>
//               <button
//                 onClick={() => setIsReading(false)}
//                 className="text-blue-400 hover:text-blue-300"
//               >
//                 <Square className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Story Text */}
//         <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
//           <div
//             ref={storyTextRef}
//             className="prose prose-lg prose-invert max-w-none leading-relaxed"
//             style={{
//               fontSize: '1.1rem',
//               lineHeight: '1.8',
//               color: '#e5e7eb'
//             }}
//           >
//             {storyData.story.split('\n').map((paragraph, index) => (
//               paragraph.trim() && (
//                 <p key={index} className="mb-6 text-gray-200">
//                   {paragraph}
//                 </p>
//               )
//             ))}
//           </div>
//         </div>

//         {/* Story End Actions */}
//         <div className="mt-8 text-center">
//           <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
//             <h3 className="text-xl font-bold text-white mb-4">Enjoyed this story?</h3>
//             <div className="flex flex-wrap items-center justify-center gap-4">
//               <button className="flex items-center px-4 py-2 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-all duration-300">
//                 <Heart className="w-4 h-4 mr-2" />
//                 Add to Favorites
//               </button>
//               <button className="flex items-center px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300">
//                 <Share2 className="w-4 h-4 mr-2" />
//                 Share Story
//               </button>
//               <button className="flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all duration-300">
//                 <RotateCcw className="w-4 h-4 mr-2" />
//                 Read Again
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoryReader;



import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios'; // Make sure axios is installed and imported
import { useLocation } from 'react-router-dom';
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Settings,
  ArrowLeft,
  Clock,
  User,
  BookOpen,
  Tag,
  Star,
  Heart,
  Share2,
  Download,
} from 'lucide-react';
// Note: In real implementation, useLocation and useNavigate would come from react-router-dom

const StoryReader = () => {
  // Mock navigation functions for demo (replace with actual react-router-dom in implementation)
  const location = useLocation();
  const navigate = (path) => console.log('Navigate to:', path);

  const [audioFile, setAudioFile] = useState(null); // State for Murf.ai generated audio URL
  const [isAudioLoading, setIsAudioLoading] = useState(true); // Tracks if Murf.ai audio is being generated
  const [audioError, setAudioError] = useState(null); // Stores any error from Murf.ai API

  // Mock storyData for demonstration. In a real app, this would come from `location.state.story`
  console.log(location.state.story);
  const storyData = location.state?.story || {
    id: 1,
    title: "The Enchanted Forest Adventure",
    author: "Maya Johnson",
    description: "Join Luna on a magical journey through an enchanted forest where she discovers the power of courage and friendship.",
    duration: "25 min",
    category: "Fantasy",
    ageGroup: "8-12 years",
    tags: ["Magic", "Adventure", "Friendship", "Courage"],
    coverColor: "from-emerald-500 via-teal-500 to-cyan-500",
    difficulty: "Intermediate",
    story: `Once upon a time, in a small village nestled between rolling hills and a mysterious forest, lived a curious young girl named Luna. She had sparkling green eyes that matched the color of the forest leaves and an adventurous spirit that could not be contained.

Every day, Luna would gaze out of her bedroom window at the Enchanted Forest that bordered her village. The villagers had always warned the children to stay away from the forest, telling tales of magical creatures and mysterious happenings. But Luna was different—she was drawn to the unknown like a moth to a flame.

One sunny morning, when the golden rays of sunlight danced through her curtains, Luna made a decision that would change her life forever. She packed a small bag with some bread, cheese, and her grandmother's compass, and set off toward the forest that had captured her imagination for so long.

As she stepped past the first line of ancient oak trees, the world around her seemed to shimmer and change. The air grew cooler and filled with a sweet, floral scent she had never encountered before. Flowers of impossible colors bloomed along the forest path, and she could swear she heard them whispering her name in the gentle breeze.

Luna followed a winding path deeper into the forest, her heart racing with excitement and just a touch of fear. The canopy above grew thicker, filtering the sunlight into beams of gold and green that created a magical atmosphere around her.

Suddenly, she heard a soft crying coming from behind a cluster of silver-leafed bushes. Luna's kind heart couldn't ignore the sound, so she carefully pushed through the foliage to investigate. There, sitting on a moss-covered rock, was the most beautiful creature she had ever seen—a small fairy with wings that sparkled like diamonds and tears that looked like tiny pearls.

"Why are you crying?" Luna asked gently, kneeling down to be at eye level with the fairy.

The fairy looked up with surprise. "You can see me? Most humans cannot see our kind unless they possess a truly pure heart and boundless courage."

Luna smiled warmly. "I'm Luna. What's your name, and how can I help you?"

"I'm Stella," the fairy replied, wiping away her pearl-like tears. "I've lost my way home, and without my magic crystal, I cannot fly properly. It fell somewhere in the Whispering Meadow, but I'm too small and scared to search for it alone."

Without hesitation, Luna stood up and extended her hand to Stella. "Then we'll find it together. I may not have wings, but I have determination, and that's almost as good as magic."

And so began an extraordinary friendship and an adventure that would teach Luna that true magic isn't found in spells or enchanted objects, but in the courage to help others and the strength that comes from believing in yourself.

Together, Luna and Stella ventured deeper into the Enchanted Forest, facing challenges that tested not only Luna's bravery but also her wisdom and compassion. They encountered talking animals who spoke in riddles, crossed bridges guarded by ancient tree spirits, and navigated through meadows where flowers sang lullabies.

Each obstacle they overcame together made their friendship stronger and Luna's confidence grow. She discovered that she possessed a rare gift—the ability to understand and communicate with all the magical creatures of the forest. This gift, Stella explained, was only given to those with the purest intentions and the bravest hearts.

As the sun began to set on their adventure, painting the sky in shades of pink and gold, Luna and Stella finally reached the Whispering Meadow. There, nestled among flowers that glowed softly in the twilight, they found Stella's precious crystal, pulsing with a warm, welcoming light.

With her crystal restored, Stella's wings regained their brilliant sparkle, and she could fly once more. But before they parted ways, she granted Luna a special gift—a small pendant that would always remind her of their adventure and the magic that lives within courage and kindness.

Luna returned to her village that evening, forever changed by her experience. She had learned that the greatest adventures come not from seeking magic in far-off places, but from opening your heart to help others and believing in the magic that exists within yourself.

And though she never saw Stella again, Luna would often catch glimpses of sparkling lights dancing at the edge of the Enchanted Forest, and she would smile, knowing that somewhere in that magical realm, her fairy friend was safe and happy, spreading magic and kindness wherever she went.

From that day forward, Luna became known in her village as the girl who brought a little bit of magic into everyone's life, simply by being brave enough to care and kind enough to help. And whenever children in the village felt scared or uncertain, they would remember Luna's story and find the courage to face their own adventures.

The End.`
  };

  // TTS State
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true); // Now primarily controls Murf.ai
  const [volume, setVolume] = useState(0.8); // Default volume
  const [showSettings, setShowSettings] = useState(false); // For UI settings

  // Refs for managing audio playback
  const audioPlayerRef = useRef(null); // Ref for the HTML Audio element for Murf.ai file

  const stopReading = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0; // Rewind to start
    }
    setIsReading(false);
    setIsPaused(false);
  }, []);

  // Main speak function, now exclusively for Murf.ai generated audio
  const speakText = useCallback(() => {
    if (!isVoiceEnabled) {
      console.log("Voice is disabled.");
      return;
    }

    if (!audioFile) {
      console.error("No Murf.ai audio file available to play.");
      setAudioError("No audio available. Please try again later.");
      setIsReading(false);
      return;
    }

    // Stop any ongoing audio first to ensure clean start
    stopReading();

    setIsReading(true);
    setIsPaused(false);

    // Create new Audio object and assign to ref if not already existing or if source changes
    if (!audioPlayerRef.current || audioPlayerRef.current.src !== audioFile) {
      audioPlayerRef.current = new Audio(audioFile);
      audioPlayerRef.current.volume = volume;

      audioPlayerRef.current.onended = () => {
        setIsReading(false);
      };
      audioPlayerRef.current.onerror = (e) => {
        console.error("Error playing Murf.ai audio:", e);
        setAudioError("Error playing generated audio.");
        setIsReading(false);
      };
    }

    // Attempt to play the audio file
    audioPlayerRef.current.play().catch(error => {
      console.error("Error initiating Murf.ai audio playback:", error);
      // This catch handles common issues like browser requiring user gesture for autoplay
      setAudioError("Playback blocked. Please click play again.");
      setIsReading(false);
    });
  }, [isVoiceEnabled, audioFile, volume, stopReading]);


  const pauseReading = useCallback(() => {
    if (isReading && audioPlayerRef.current && !audioPlayerRef.current.paused) {
      audioPlayerRef.current.pause();
      setIsPaused(true);
      setIsReading(false);
    }
  }, [isReading]);


  const resumeReading = useCallback(() => {
    if (isPaused && audioPlayerRef.current && audioPlayerRef.current.paused) {
      audioPlayerRef.current.play().catch(error => {
        console.error("Error resuming Murf.ai audio playback:", error);
        setAudioError("Resume blocked. Please try again.");
      });
      setIsPaused(false);
      setIsReading(true);
    }
  }, [isPaused]);


  // --- useEffect to generate audio file from Murf.ai on component mount ---
  // This effect runs once on mount, or if storyData changes (to get audio for a new story)
  useEffect(() => {
    const generateAudioFileFromMurf = async () => {
      // Only generate if voice is enabled and we don't have an audio file already for this story
      if (!isVoiceEnabled || audioFile) {
        setIsAudioLoading(false); // If voice is disabled or already has audio, not loading Murf.ai
        return;
      }

      setIsAudioLoading(true); // Start loading indicator
      setAudioError(null);     // Clear any previous errors

      try {
        console.log("Generating Audio File!");
        const fullStoryText = `You are about to read "${storyData.title}", a story penned by ${storyData.author}. ${storyData.story}`;
        const data = JSON.stringify({
          text: fullStoryText,
          voiceId: "en-US-natalie", // Confirm this voice ID is valid for your Murf.ai plan
          channelType: "MONO",
          sampleRate: 24000,
        });

        const config = {
          method: "post",
          url: "https://api.murf.ai/v1/speech/generate",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "api-key": "ap2_9612a922-814c-4ed7-998f-dae83a2fcab5", // IMPORTANT: Use environment variables for API keys in production!
          },
          data: data,
        };

        console.log("Attempting to generate Murf.ai audio...");
        const response = await axios(config);
        setAudioFile(response.data.audioFile);
        console.log("Murf.ai audio generated successfully.");
      } catch (error) {
        console.error("Error generating audio from Murf.ai:", error.response ? error.response.data : error.message);
        setAudioError("Couldn't generate high-quality audio. Please check API key or network.");
        setAudioFile(null); // Ensure audioFile is null if generation failed
      } finally {
        setIsAudioLoading(false); // Stop loading indicator
      }
    };

    // This ensures generation only happens when storyData is available,
    // when voice is enabled, and when we don't already have an audio file.
    // Also, it avoids re-triggering if already loading.
    // if (storyData && isVoiceEnabled && !audioFile && !isAudioLoading) {
    //   generateAudioFileFromMurf();
    // }
    generateAudioFileFromMurf();
    // --- Cleanup function for when component unmounts or dependencies change ---
    return () => {
      stopReading(); // Ensure all audio playback is stopped
    };
  }, []); // Dependencies: re-run if these change


  const handlePlayPause = () => {
    if (!isReading && !isPaused) {
      speakText(); // No need for arguments, audioFile is already set
    } else if (isPaused) {
      resumeReading();
    } else {
      pauseReading();
    }
  };

  // Removed skipForward and skipBackward logic as requested.
  // The UI buttons will still appear but will do nothing.
  // To remove them from UI, delete the corresponding JSX buttons.
  const noop = () => {}; // No operation function


  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
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
      'Fantasy': 'bg-purple-500/10 text-purple-400',
      'Adventure': 'bg-orange-500/10 text-orange-400',
      'Classic Literature': 'bg-blue-500/10 text-blue-400',
      'Fairy Tales': 'bg-pink-500/10 text-pink-400',
      'Science Fiction': 'bg-cyan-500/10 text-cyan-400'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${storyData.coverColor} relative`}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          {/* Navigation */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white/90 hover:text-white mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Stories
          </button>

          {/* Story Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${getCategoryColor(storyData.category)}`}>
                  {storyData.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${getDifficultyColor(storyData.difficulty)}`}>
                  {storyData.difficulty}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {storyData.title}
              </h1>

              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {storyData.description}
              </p>

              {/* Story Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white/80">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <div>
                    <p className="text-sm opacity-75">Author</p>
                    <p className="font-medium">{storyData.author}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <div>
                    <p className="text-sm opacity-75">Duration</p>
                    <p className="font-medium">{storyData.duration}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <div>
                    <p className="text-sm opacity-75">Age Group</p>
                    <p className="font-medium">{storyData.ageGroup}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  <div>
                    <p className="text-sm opacity-75">Rating</p>
                    <p className="font-medium">4.8/5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Story Controls</h3>

              {/* Loading/Error for Murf.ai Audio */}
              {isAudioLoading && (
                <p className="text-blue-300 text-sm mb-2 flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-3 w-4 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating high-quality audio...
                </p>
              )}
              {audioError && (
                <p className="text-red-400 text-sm mb-2 text-center">{audioError}</p>
              )}

              {/* Control Buttons - Skip Forward/Backward actions are now no-ops */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {/* Main Play/Pause/Resume Button - More Width (flex-grow for dynamic width) */}
                <button
                  onClick={handlePlayPause}
                  className="flex-grow bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center border border-white/20 hover:border-white/30"
                  disabled={isAudioLoading && !audioFile} // Disable if Murf.ai audio is loading and not yet available
                >
                  {isReading && !isPaused ? (
                    <>
                      <Pause className="w-6 h-6 mr-2" />
                      Pause Story
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6 mr-2" />
                      {isPaused ? 'Resume Story' : 'Start Reading'}
                    </>
                  )}
                </button>

                {/* Voice Toggle Button - Less Width (fixed padding to make it smaller than flex-grow) */}
                <button
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className={`p-4 backdrop-blur-sm rounded-xl transition-all duration-300 border ${
                    isVoiceEnabled
                      ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                      : 'bg-white/10 border-white/10 text-white'
                  } flex-shrink-0`}
                  title={isVoiceEnabled ? "Disable Voice" : "Enable Voice"}
                >
                  {isVoiceEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                </button>
              </div>

              {/* Settings Toggle */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center border border-white/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Voice Settings
              </button>

              {/* Voice Settings Panel */}
              {showSettings && (
                <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 space-y-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Volume</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        if (audioPlayerRef.current) {
                          audioPlayerRef.current.volume = parseFloat(e.target.value);
                        }
                      }}
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-white/70 mt-1">
                      <span>Quiet</span>
                      <span>{Math.round(volume * 100)}%</span>
                      <span>Loud</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Actions */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <button className="flex items-center text-white/70 hover:text-white transition-colors text-sm">
                  <Heart className="w-4 h-4 mr-1" />
                  Like
                </button>
                <button className="flex items-center text-white/70 hover:text-white transition-colors text-sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </button>
                <button className="flex items-center text-white/70 hover:text-white transition-colors text-sm">
                  <Download className="w-4 h-4 mr-1" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {storyData.tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Reading Status */}
        {isReading && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-8 flex items-center">
            <div className="animate-pulse bg-blue-500 rounded-full w-3 h-3 mr-3"></div>
            <span className="text-blue-400 font-medium">
              {isPaused ? 'Reading Paused' : 'Currently Reading...'}
            </span>
            <div className="ml-auto flex items-center space-x-2">
              <button
                onClick={stopReading}
                className="text-blue-400 hover:text-blue-300"
                title="Stop Reading"
              >
                <Square className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Story Text */}
        <div className="bg-gray-300 rounded-2xl p-8 border border-gray-700">
          <div
            className="prose prose-lg prose-invert max-w-none leading-relaxed"
          >
            {storyData.story.split('\n\n').map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryReader;