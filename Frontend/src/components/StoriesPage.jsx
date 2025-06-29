// import React, { useState , useEffect} from 'react';
// import { Play, Book, Clock, Users, Star, Sparkles, Wand2, Heart, BookOpen , X, Zap, Palette} from 'lucide-react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const StoriesPage = () => {
//   const [isGeneratingStory, setIsGeneratingStory] = useState(false);
//   const navigate = useNavigate();


//    const [stories,setStories] = useState([]);
//    useEffect(()=>{
//       async function getAllQuestionSheets(){
//       try{
//       const response = await axios.get("http://localhost:5001/stories/getallstories")
//       if(response.status === 200)
//       {
//           console.log(response.data);
//           setStories(response.data);
//       }
//     }
//     catch(error)
//     {
//       console.log("Error while getting all questions sheets from the backend!!" , error);
//     }
//       }
//       getAllQuestionSheets();
//    },[])

//    function navigateToReadStory(story){
//           console.log("The story in story page is : ",story);
//           navigate("/readstory" , {state : {story}})
//    }
//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'Very Easy':
//         return 'bg-green-500/20 text-green-400 border-green-500/30';
//       case 'Easy':
//         return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
//       case 'Hard':
//         return 'bg-red-500/20 text-red-400 border-red-500/30';
//       default:
//         return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
//     }
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'Classic Literature': 'bg-purple-500/10 text-purple-400',
//       'Fables': 'bg-green-500/10 text-green-400',
//       'Fantasy': 'bg-blue-500/10 text-blue-400',
//       'Fairy Tales': 'bg-pink-500/10 text-pink-400',
//       'AI Generated': 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400'
//     };
//     return colors[category] || 'bg-gray-500/10 text-gray-400';
//   };

//   const handleGenerateStory = () => {
//     setIsGeneratingStory(true);
//     // Simulate AI story generation
//     setTimeout(() => {
//       setIsGeneratingStory(false);
//       // Here you would navigate to the story generation interface
//       console.log("Navigate to AI story generation");
//     }, 2000);
//   };

//   const renderStoryCard = (story) => (
//     <div
//       key={story._id}
//       className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
//     >
//       {/* Cover Section */}
//       <div className={`h-32 bg-gradient-to-br ${story.coverColor} relative`}>
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="absolute top-4 left-4">
//           <div className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getCategoryColor(story.category)}`}>
//             {story.category}
//           </div>
//         </div>
//         <div className="absolute top-4 right-4">
//           <div className={`px-2 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${getDifficultyColor(story.difficulty)}`}>
//             {story.difficulty}
//           </div>
//         </div>
//         <div className="absolute bottom-4 left-4 right-4">
//           <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-200 transition-colors">
//             {story.title}
//           </h3>
//           <p className="text-white/80 text-sm">by {story.author}</p>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-6">
//         {/* Description */}
//         <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
//           {story.description}
//         </p>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {story.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
//           <div className="flex items-center text-gray-400">
//             <Clock className="w-4 h-4 mr-2" />
//             <span>{story.duration}</span>
//           </div>
//           <div className="flex items-center text-gray-400">
//             <Users className="w-4 h-4 mr-2" />
//             <span>{story.ageGroup}</span>
//           </div>
//         </div>

//         {/* Action Button */}
//         <button 
//         onClick={()=>navigateToReadStory(story)}
//         className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center group">
//           <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
//           Listen to Story
//         </button>
//       </div>
//     </div>
//   );

//   const renderAIStoryCard = () => (
//     <div className="bg-gray-800 rounded-xl overflow-hidden border-2 border-gradient-to-r from-cyan-500/50 to-purple-500/50 hover:from-cyan-500/70 hover:to-purple-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 group relative">
//       {/* Animated Background */}
//       <div className="h-32 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 relative overflow-hidden">
//         <div className="absolute inset-0 bg-black/30"></div>
//         {/* Floating Sparkles Animation */}
//         <div className="absolute inset-0">
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute animate-pulse"
//               style={{
//                 left: `${20 + i * 15}%`,
//                 top: `${20 + (i % 2) * 40}%`,
//                 animationDelay: `${i * 0.5}s`,
//                 animationDuration: '2s'
//               }}
//             >
//               <Sparkles className="w-4 h-4 text-white/60" />
//             </div>
//           ))}
//         </div>
        
//         <div className="absolute top-4 left-4">
//           <div className="px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30">
//             AI Generated
//           </div>
//         </div>
        
//         <div className="absolute bottom-4 left-4 right-4">
//           <h3 className="text-white font-bold text-lg mb-1 flex items-center">
//             <Wand2 className="w-5 h-5 mr-2" />
//             Create Your Own Story
//           </h3>
//           <p className="text-white/80 text-sm">Powered by AI Magic</p>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-6">
//         <p className="text-gray-400 text-sm leading-relaxed mb-4">
//           Let our AI create a personalized story just for you! Choose your favorite characters, 
//           setting, and theme, and watch as our intelligent system crafts a unique tale that will 
//           captivate and inspire.
//         </p>

//         {/* Features */}
//         <div className="space-y-2 mb-6">
//           {[
//             "🎭 Custom characters and themes",
//             "🌍 Any setting or time period", 
//             "📚 Educational or entertaining",
//             "🎨 Personalized to your interests"
//           ].map((feature, index) => (
//             <div key={index} className="flex items-center text-sm text-gray-300">
//               <span className="mr-2">{feature.split(' ')[0]}</span>
//               <span>{feature.split(' ').slice(1).join(' ')}</span>
//             </div>
//           ))}
//         </div>

//         {/* Action Button */}
//         <button 
//           onClick={handleGenerateStory}
//           disabled={isGeneratingStory}
//           className="w-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
//         >
//           {isGeneratingStory ? (
//             <>
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//               Generating Magic...
//             </>
//           ) : (
//             <>
//               <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
//               Generate AI Story
//             </>
//           )}
          
//           {/* Shimmer Effect */}
//           {!isGeneratingStory && (
//             <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
//           )}
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-900 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-white mb-3">
//             Story Collection
//           </h1>
//           <p className="text-gray-400 text-lg">
//             Discover amazing stories and let our AI create personalized tales just for you
//           </p>
//         </div>

//         {/* Stats Bar */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
//             <div className="flex items-center">
//               <Book className="w-8 h-8 text-blue-400 mr-3" />
//               <div>
//                 <p className="text-2xl font-bold text-white">{stories.length}</p>
//                 <p className="text-gray-400 text-sm">Stories Available</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
//             <div className="flex items-center">
//               <Users className="w-8 h-8 text-green-400 mr-3" />
//               <div>
//                 <p className="text-2xl font-bold text-white">15K+</p>
//                 <p className="text-gray-400 text-sm">Happy Listeners</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
//             <div className="flex items-center">
//               <Clock className="w-8 h-8 text-purple-400 mr-3" />
//               <div>
//                 <p className="text-2xl font-bold text-white">50+</p>
//                 <p className="text-gray-400 text-sm">Hours of Content</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
//             <div className="flex items-center">
//               <Sparkles className="w-8 h-8 text-cyan-400 mr-3" />
//               <div>
//                 <p className="text-2xl font-bold text-white">AI</p>
//                 <p className="text-gray-400 text-sm">Story Generator</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stories Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {/* Regular Stories */}
//           {stories.map(story => renderStoryCard(story))}
//           {/* AI Story Generation Card - Always Last */}
//           {renderAIStoryCard()}
//         </div>

//         {/* Load More Section */}
//         <div className="text-center mt-12">
//           <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-medium py-3 px-8 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 flex items-center mx-auto">
//             <BookOpen className="w-5 h-5 mr-2" />
//             Load More Stories
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .line-clamp-3 {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default StoriesPage;

import React, { useState , useEffect} from 'react';
import { Play, Book, Clock, Users, Star, Sparkles, Wand2, Heart, BookOpen , X, Zap, Palette} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StoriesPage = () => {
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    tags: [],
    difficulty: '',
    ageGroup: '',
    duration: ''
  });
  const navigate = useNavigate();

  const [stories,setStories] = useState([]);
  
  // Story generation options
  const categories = [
    { value: 'adventure', label: '🗺️ Adventure', color: 'from-orange-500 to-red-500' },
    { value: 'fantasy', label: '🧙‍♂️ Fantasy', color: 'from-purple-500 to-pink-500' },
    { value: 'mystery', label: '🔍 Mystery', color: 'from-gray-600 to-gray-800' },
    { value: 'sci-fi', label: '🚀 Sci-Fi', color: 'from-blue-500 to-cyan-500' },
    { value: 'horror', label: '👻 Horror', color: 'from-red-700 to-black' },
    { value: 'romance', label: '💕 Romance', color: 'from-pink-400 to-rose-500' },
    { value: 'comedy', label: '😂 Comedy', color: 'from-yellow-400 to-orange-400' },
    { value: 'drama', label: '🎭 Drama', color: 'from-indigo-500 to-purple-600' }
  ];

  const availableTags = [
    'Magic', 'Dragons', 'Pirates', 'Space', 'Robots', 'Wizards', 'Princesses', 
    'Monsters', 'Time Travel', 'Underwater', 'Forest', 'Castle', 'Aliens', 
    'Friendship', 'Family', 'Quest', 'Treasure', 'School', 'Animals', 'Superheroes'
  ];

  const difficulties = [
    { value: 'easy', label: '🟢 Easy', desc: 'Simple vocabulary, short sentences' },
    { value: 'intermediate', label: '🟡 Intermediate', desc: 'Moderate complexity' },
    { value: 'hard', label: '🔴 Hard', desc: 'Advanced vocabulary, complex plot' }
  ];

  const ageGroups = [
    { value: '3-6', label: '👶 Ages 3-6' },
    { value: '7-10', label: '🧒 Ages 7-10' },
    { value: '11-14', label: '👦 Ages 11-14' },
    { value: '15+', label: '👨 Ages 15+' }
  ];

  const durations = [
    { value: '5-10 minutes', label: '⚡ Quick (5-10 min)' },
    { value: '10-20 minutes', label: '📖 Medium (10-20 min)' },
    { value: '20+ minutes', label: '📚 Long (20+ min)' }
  ];

  useEffect(()=>{
    async function getAllQuestionSheets(){
      try{
        const response = await axios.get("http://localhost:5001/stories/getallstories")
        if(response.status === 200)
        {
          console.log(response.data);
          setStories(response.data);
        }
      }
      catch(error)
      {
        console.log("Error while getting all questions sheets from the backend!!" , error);
      }
    }
    getAllQuestionSheets();
  },[])

  function navigateToReadStory(story){
    console.log("The story in story page is : ",story);
    navigate("/readstory" , {state : {story}})
  }

  const handleGenerateStory = () => {
    setShowPopup(true);
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag].slice(0, 5) // Limit to 5 tags
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateStoryWithAI = async () => {
    if (!formData.category || !formData.difficulty || !formData.ageGroup) {
      alert('Please fill in all required fields (Category, Difficulty, Age Group)');
      return;
    }

    setIsGeneratingStory(true);
    
    try {
      // Prepare the prompt for Gemini API
      const prompt = `Create a ${formData.difficulty} difficulty ${formData.category} story for ages ${formData.ageGroup}. 
      Include these elements: ${formData.tags.join(', ')}. 
      Duration should be ${formData.duration || '10-15 minutes'}.
      
      Please return a JSON response with the following structure:
      {
        "title": "Story Title",
        "author": "AI Assistant",
        "description": "Brief story description",
        "duration": "${formData.duration || '10-15 minutes'}",
        "category": "${formData.category}",
        "ageGroup": "${formData.ageGroup}",
        "tags": ${JSON.stringify(formData.tags)},
        "coverColor": "A suitable hex color for the story theme",
        "difficulty": "${formData.difficulty}",
        "story": "The complete story content"
      }`;

      // Replace with your actual Gemini API endpoint and key
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBDV8F4-iOuT9y83vtDoCj46y2iA3R5u_0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      console.log("Gemini response: ",data);
      // Parse the JSON response from Gemini
      let storyData;
      try {
        const generatedText = data.candidates[0].content.parts[0].text;
        // Extract JSON from the response (Gemini might include additional text)
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          storyData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No valid JSON found in response');
        }
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        // Fallback story structure
        storyData = {
          title: "AI Generated Adventure",
          author: "AI Assistant", 
          description: "A wonderful story created just for you!",
          duration: formData.duration || '10-15 minutes',
          category: formData.category,
          ageGroup: formData.ageGroup,
          tags: formData.tags,
          coverColor: "from-purple-500 to-pink-500",
          difficulty: formData.difficulty,
          story: "Once upon a time... (Story generation failed, please try again)"
        };
      }

      // Close popup and navigate to ReadStory page
      setShowPopup(false);
      
      // Navigate to ReadStory with the generated story data
      navigate("/readstory", { state: { story: storyData } });
      
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Failed to generate story. Please try again.');
    } finally {
      setIsGeneratingStory(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Very Easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Easy':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Classic Literature': 'bg-purple-500/10 text-purple-400',
      'Fables': 'bg-green-500/10 text-green-400',
      'Fantasy': 'bg-blue-500/10 text-blue-400',
      'Fairy Tales': 'bg-pink-500/10 text-pink-400',
      'AI Generated': 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-400';
  };

  const renderStoryCard = (story) => (
    <div
      key={story._id}
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
    >
      {/* Cover Section */}
      <div className={`h-32 bg-gradient-to-br ${story.coverColor} relative`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getCategoryColor(story.category)}`}>
            {story.category}
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className={`px-2 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${getDifficultyColor(story.difficulty)}`}>
            {story.difficulty}
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-200 transition-colors">
            {story.title}
          </h3>
          <p className="text-white/80 text-sm">by {story.author}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {story.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {story.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span>{story.duration}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Users className="w-4 h-4 mr-2" />
            <span>{story.ageGroup}</span>
          </div>
        </div>

        {/* Action Button */}
        <button 
        onClick={()=>navigateToReadStory(story)}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center group">
          <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Listen to Story
        </button>
      </div>
    </div>
  );

  const renderAIStoryCard = () => (
    <div className="bg-gray-800 rounded-xl overflow-hidden border-2 border-gradient-to-r from-cyan-500/50 to-purple-500/50 hover:from-cyan-500/70 hover:to-purple-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 group relative">
      {/* Animated Background */}
      <div className="h-32 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Floating Sparkles Animation */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            >
              <Sparkles className="w-4 h-4 text-white/60" />
            </div>
          ))}
        </div>
        
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/30">
            AI Generated
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg mb-1 flex items-center">
            <Wand2 className="w-5 h-5 mr-2" />
            Create Your Own Story
          </h3>
          <p className="text-white/80 text-sm">Powered by AI Magic</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          Let our AI create a personalized story just for you! Choose your favorite characters, 
          setting, and theme, and watch as our intelligent system crafts a unique tale that will 
          captivate and inspire.
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {[
            "🎭 Custom characters and themes",
            "🌍 Any setting or time period", 
            "📚 Educational or entertaining",
            "🎨 Personalized to your interests"
          ].map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-300">
              <span className="mr-2">{feature.split(' ')[0]}</span>
              <span>{feature.split(' ').slice(1).join(' ')}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={handleGenerateStory}
          disabled={isGeneratingStory}
          className="w-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
        >
          {isGeneratingStory ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generating Magic...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Generate AI Story
            </>
          )}
          
          {/* Shimmer Effect */}
          {!isGeneratingStory && (
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            Story Collection
          </h1>
          <p className="text-gray-400 text-lg">
            Discover amazing stories and let our AI create personalized tales just for you
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <Book className="w-8 h-8 text-blue-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">{stories.length}</p>
                <p className="text-gray-400 text-sm">Stories Available</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">15K+</p>
                <p className="text-gray-400 text-sm">Happy Listeners</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-gray-400 text-sm">Hours of Content</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <Sparkles className="w-8 h-8 text-cyan-400 mr-3" />
              <div>
                <p className="text-2xl font-bold text-white">AI</p>
                <p className="text-gray-400 text-sm">Story Generator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* AI Story Generation Card - Always Last */}
          {renderAIStoryCard()}
          {/* Regular Stories */}
          {stories.map(story => renderStoryCard(story))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-medium py-3 px-8 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 flex items-center mx-auto">
            <BookOpen className="w-5 h-5 mr-2" />
            Load More Stories
          </button>
        </div>
      </div>

      {/* AI Story Generation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Header */}
            <div className="sticky top-0 bg-gray-800 p-6 pb-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Wand2 className="w-6 h-6 mr-2 text-purple-400" />
                Create Your Story
              </h2>
              <button 
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Category Selection */}
              <div>
                <label className="flex items-center text-white font-medium mb-3">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Story Category *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleInputChange('category', cat.value)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        formData.category === cat.value
                          ? `bg-gradient-to-r ${cat.color} text-white`
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags Selection */}
              <div>
                <label className="flex items-center text-white font-medium mb-3">
                  <Palette className="w-4 h-4 mr-2" />
                  Story Elements (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        formData.tags.includes(tag)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Selected: {formData.tags.length}/5 elements
                </p>
              </div>

              {/* Difficulty */}
              <div>
                <label className="flex items-center text-white font-medium mb-3">
                  <Zap className="w-4 h-4 mr-2" />
                  Difficulty Level *
                </label>
                <div className="space-y-2">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() => handleInputChange('difficulty', diff.value)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        formData.difficulty === diff.value
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="font-medium">{diff.label}</div>
                      <div className="text-xs opacity-80">{diff.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Group */}
              <div>
                <label className="flex items-center text-white font-medium mb-3">
                  <Users className="w-4 h-4 mr-2" />
                  Age Group *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ageGroups.map((age) => (
                    <button
                      key={age.value}
                      onClick={() => handleInputChange('ageGroup', age.value)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        formData.ageGroup === age.value
                          ? 'bg-cyan-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {age.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="flex items-center text-white font-medium mb-3">
                  <Clock className="w-4 h-4 mr-2" />
                  Story Length (Optional)
                </label>
                <div className="space-y-2">
                  {durations.map((dur) => (
                    <button
                      key={dur.value}
                      onClick={() => handleInputChange('duration', dur.value)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        formData.duration === dur.value
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateStoryWithAI}
                disabled={isGeneratingStory || !formData.category || !formData.difficulty || !formData.ageGroup}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isGeneratingStory ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating Your Story...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3" />
                    Generate Story
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                * Required fields. Story generation may take 30-60 seconds.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default StoriesPage;