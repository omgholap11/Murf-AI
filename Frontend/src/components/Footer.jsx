import { Volume2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github, Heart } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'MCQ Practice', href: '#' },
    { name: 'Stories', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  const features = [
    { name: 'Voice Learning', href: '#' },
    { name: 'Progress Tracking', href: '#' },
    { name: 'Custom Stories', href: '#' },
    { name: 'OCR Integration', href: '#' },
    { name: 'Analytics', href: '#' }
  ];

  const support = [
    { name: 'Help Center', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Tutorials', href: '#' },
    { name: 'FAQ', href: '#' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-300' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-300' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Volume2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EduVoice</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Revolutionizing education through voice-powered learning. Practice MCQs and listen to stories with our innovative platform.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">contact@eduvoice.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-6">Features</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index}>
                  <a 
                    href={feature.href} 
                    className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block"
                  >
                    {feature.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-3 mb-6">
              {support.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition text-sm hover:translate-x-1 transform inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-3 text-sm">Stay Updated</h4>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Enter email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© 2024 EduVoice. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>for learners worldwide.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-sm hidden sm:block">Follow us:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-all transform hover:scale-110`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}