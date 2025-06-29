import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react'; // Importing icons

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null); // Reset status

    // --- In a real application, you would send this data to your backend API ---
    console.log('Form Submitted:', formData);

    try {
      // Simulate API call
      // Replace this with your actual API endpoint and fetch/axios call
      const response = await new Promise((resolve) => setTimeout(() => {
        // Simulate success or error based on some condition, e.g., email field
        if (formData.email.includes('fail')) {
          resolve({ success: false, message: 'Failed to send message. Please try again.' });
        } else {
          resolve({ success: true, message: 'Your message has been sent successfully!' });
        }
      }, 1500));

      if (response.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        setFormStatus('error');
      }
      // --- End of simulation ---

    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section - Consistent with PracticeTest */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-gray-400 text-lg">We'd love to hear from you! Send us a message or reach out through our direct contacts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Form Section */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  placeholder="Topic of your message"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 resize-y"
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                disabled={formStatus === 'success'} // Disable button after successful submission
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>

              {formStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 flex items-center justify-center animate-fadeIn">
                  <span className="mr-2">🎉</span> {formStatus.message}
                </div>
              )}
              {formStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 flex items-center justify-center animate-fadeIn">
                  <span className="mr-2">❌</span> Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Direct Contact Info Section */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-semibold text-white mb-6">Our Contact Details</h2>
                <div className="space-y-4 text-gray-300">
                    <div className="flex items-center">
                        <Mail className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0" />
                        <span>Email: <a href="mailto:support@example.com" className="text-blue-400 hover:underline">eduvoice@gmail.com</a></span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                        <span>Phone: <a href="tel:+911234567890" className="text-green-400 hover:underline">+91 123-456-7890</a></span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" />
                        <span>Address: 123 Learning Lane, Shirdi , Ahilyanagar, Maharashtra, India, 413700</span>
                    </div>
                </div>
            </div>
            {/* Optional: Add a small map or illustration here */}
            <div className="mt-8 text-gray-500 text-sm italic">
                <p>We typically respond within 24-48 business hours.</p>
                <p>For urgent matters, please use the phone number provided.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Re-using the fadeIn animation from PracticeTest */}
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

export default ContactUs;