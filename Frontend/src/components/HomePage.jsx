import { useState } from 'react';
import { Menu, X, Volume2, BookOpen, MessageCircle, Play, Brain, Headphones, Star, Users, Award, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const features = [
    {
      icon: Brain,
      title: "Smart MCQ Practice",
      description: "AI-powered questions with voice interaction for better retention",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Headphones,
      title: "Interactive Stories",
      description: "Listen to engaging stories and chapters with natural voice",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Zap,
      title: "Quick Learning",
      description: "Accelerate your learning with voice-based interaction",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Award,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "500+", label: "MCQ Questions" },
    { number: "100+", label: "Story Collections" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Learn with Your 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Voice</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Experience the future of education with EduVoice. Practice MCQs and listen to stories 
              through interactive voice technology that makes learning engaging and accessible.
            </p>
            
            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button 
              onClick={()=>navigate("/questionsheets")}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-3 w-full sm:w-auto">
                <Brain className="h-6 w-6 group-hover:animate-pulse" />
                <span>Start MCQ Practice</span>
              </button>
              <button 
              onClick={()=>navigate("/allstories")}
              className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-3 w-full sm:w-auto">
                <Play className="h-6 w-6 group-hover:animate-pulse" />
                <span>Listen to Stories</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:bg-gray-800/70">
                    <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose EduVoice?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the powerful features that make learning more engaging and effective
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-500 hover:scale-105 hover:bg-gray-800/70 hover:shadow-2xl animate-slide-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:animate-bounce`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of students who are already learning smarter with EduVoice
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Start Free Trial</span>
              </button>
              <button className="border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Join Community</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}