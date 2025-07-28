import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle } from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
    service: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'Seion.automation.services@gmail.com',
      description: 'Get in touch with our enterprise team'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 93424 75264',
      description: '24/7 executive support line'
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      details: 'Chennai, India',
      description: ''
    },
    {
      icon: Calendar,
      title: 'Schedule',
      details: 'Book a Call',
      description: 'Direct access to our experts'
    }
  ];

  return (
    <section id="contact" className={`py-24 ${
      darkMode ? 'bg-slate-800' : 'bg-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Get Expert Advice
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Ready to transform your business? Connect with our enterprise specialists 
            for a personalized consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`p-8 rounded-2xl ${
            darkMode ? 'bg-slate-900' : 'bg-white'
          } border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <h3 className={`text-2xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Schedule Your Consultation
            </h3>

            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className={`text-xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Thank You!
                </h4>
                <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  We'll be in touch within 24 hours to schedule your consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        darkMode 
                          ? 'bg-slate-800 border-slate-600 text-white focus:border-blue-500' 
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        darkMode 
                          ? 'bg-slate-800 border-slate-600 text-white focus:border-blue-500' 
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        darkMode 
                          ? 'bg-slate-800 border-slate-600 text-white focus:border-blue-500' 
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Company Name"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Role *
                    </label>
                    <select
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        darkMode 
                          ? 'bg-slate-800 border-slate-600 text-white focus:border-blue-500' 
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    >
                      <option value="">Select Role</option>
                      <option value="ceo">CEO/President</option>
                      <option value="cto">CTO/CIO</option>
                      <option value="vp">VP/Director</option>
                      <option value="manager">Manager</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'bg-slate-800 border-slate-600 text-white focus:border-blue-500' 
                        : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <option value="">Select Service</option>
                    <option value="ai">AI Solutions</option>
                    <option value="automation">Process Automation</option>
                    <option value="development">Web & App Development</option>
                    <option value="video">Video Solutions</option>
                    <option value="consulting">Strategic Consulting</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'bg-slate-800 border-slate-600 text-white focus:border-blue-500' 
                        : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Tell us about your project requirements, timeline, and goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-8 py-4 btn-aquamarine text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl"
                >
                  <Send className="mr-2 w-5 h-5" />
                  Schedule Consultation
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className={
                    `p-6 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 border-0 shadow-lg` +
                    ` contact-gradient-box`
                  }
                  style={{ color: 'white' }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="inline-flex p-3 rounded-xl bg-white/20">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold mb-1 text-white">
                        {info.title}
                      </h4>
                      <p className="text-lg font-semibold mb-1 text-white">
                        {info.details}
                      </p>
                      <p className="text-sm text-white/90">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quick Access Panel */}
            <div className={`p-6 rounded-2xl ${
              darkMode
                ? 'bg-gradient-to-br from-blue-600 via-slate-800 to-slate-900'
                : 'bg-gradient-to-br from-blue-100 via-blue-50 to-white'
            }`}>
              <h4 className={`text-lg font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Executive Quick Access
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Case Studies', href: '#case-studies' },
                  { label: 'Industries', href: '#industries' },
                  { label: 'Client Portal', href: '#' },
                  { label: 'Book a Call', href: '#contact' }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg text-center transition-colors btn-aquamarine`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;