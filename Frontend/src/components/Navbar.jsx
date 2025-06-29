import { useState } from 'react';
import { Menu, X, Volume2, BookOpen, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
          onClick={()=>navigate("")}
          className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Volume2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">EduVoice</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/" className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Home
              </a>
              <a href="/questionsheets" className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>MCQ Practice</span>
              </a>
              <a href="/allstories" className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>Stories</span>
              </a>
              <a href="/contactus" className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Contact Us
              </a>
            </div>
          </div>

          {/* User Profile & Settings */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              Get Started
            </button>
            <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-300">U</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg mt-2">
              <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 block">
                Home
              </a>
              <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>MCQ Practice</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Stories</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 block">
                About
              </a>
              <div className="pt-4 pb-2 border-t border-gray-700">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}