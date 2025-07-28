import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const footerLinks = {
    Services: [
      { name: 'AI Solutions', href: '#services' },
      { name: 'Process Automation', href: '#services' },
      { name: 'Web & App Development', href: '#services' },
      { name: 'Video Solutions', href: '#services' },
      { name: 'Strategic Consulting', href: '#services' }
    ],
    Industries: [
      { name: 'Healthcare', href: '#industries' },
      { name: 'Manufacturing', href: '#industries' },
      { name: 'Financial Services', href: '#industries' },
      { name: 'Enterprise', href: '#industries' },
      { name: 'Education', href: '#industries' }
    ],
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'Leadership', href: '#about' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Partners', href: '#' }
    ],
    Resources: [
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'White Papers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Support', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className={`${
      darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
    } border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              SEION
            </h3>
            <p className={`text-sm mb-6 leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Transforming enterprises with advanced AI and digital solutions. 
              Trusted by Fortune 500 companies worldwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className={`w-4 h-4 mr-3 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`} />
                <span className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  enterprise@seion.com
                </span>
              </div>
              <div className="flex items-center">
                <Phone className={`w-4 h-4 mr-3 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`} />
                <span className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className={`w-4 h-4 mr-3 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`} />
                <span className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className={`text-sm font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-sm transition-colors hover:text-blue-600 ${
                        darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center ${
          darkMode ? 'border-slate-700' : 'border-slate-200'
        }`}>
          {/* Copyright */}
          <div className={`text-sm mb-4 md:mb-0 ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            © 2024 SEION. All rights reserved. | Privacy Policy | Terms of Service
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Enterprise Badge */}
        <div className="mt-8 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-medium ${
            darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
          }`}>
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Enterprise-grade security and compliance
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;