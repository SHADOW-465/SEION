import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, User, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const filteredNavigation = navigation.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredNavigation.length > 0) {
      window.location.hash = filteredNavigation[0].href;
      setShowSearch(false);
      setSearchTerm('');
    }
  };

  const serviceDropdown = [
    { label: 'AI Solutions', href: '#services-AI-Solutions' },
    { label: 'Process Automation', href: '#services-Process-Automation' },
    { label: 'Web & App Development', href: '#services-Web-App-Development' },
    { label: 'Video Solutions', href: '#services-Video-Solutions' },
    { label: 'Strategic Consulting', href: '#services-Strategic-Consulting' },
  ];
  const industryDropdown = [
    { label: 'Healthcare', href: '#industries-Healthcare' },
    { label: 'Manufacturing', href: '#industries-Manufacturing' },
    { label: 'Financial Services', href: '#industries-Financial-Services' },
    { label: 'Enterprise', href: '#industries-Enterprise' },
    { label: 'Education', href: '#industries-Education' },
    { label: 'Retail & E-commerce', href: '#industries-Retail-&-E-commerce' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? `backdrop-blur-md ${darkMode ? 'bg-slate-900/90' : 'bg-white/90'} shadow-lg` 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap">
            <img src="/logo.png" alt="SEION Logo" className="h-8 w-8 animate-fadeInUp" style={{ animationDelay: '0.05s' }} />
            <h1 className={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'} animate-fadeInUp`} style={{ animationDelay: '0.1s' }}>
              SEION
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {showSearch ? (
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search..."
                className={`px-3 py-2 rounded-lg border outline-none text-sm transition-colors ${
                  darkMode ? 'bg-slate-800 border-slate-600 text-white placeholder:text-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-500'
                }`}
                style={{ minWidth: 120 }}
              />
            ) : (
              filteredNavigation.map((item, idx) => {
                if (item.name === 'Services') {
                  return (
                    <div key={item.name} className="relative group" ref={dropdownRef}>
                      <button
                        className={`text-sm font-medium transition-colors relative px-4 py-2 rounded-lg overflow-hidden ${darkMode ? 'text-slate-300' : 'text-slate-700'} group animate-fadeInUp`}
                        style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                        onMouseEnter={() => setOpenDropdown('services')}
                        onMouseLeave={() => setOpenDropdown(null)}
                        onClick={() => setOpenDropdown(openDropdown === 'services' ? null : 'services')}
                        type="button"
                      >
                        <span className="relative z-10 group-hover:text-white transition-colors">{item.name}</span>
                        <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 btn-aquamarine"></span>
                      </button>
                      {openDropdown === 'services' && (
                        <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 py-2 animate-fadeInUp" onMouseEnter={() => setOpenDropdown('services')} onMouseLeave={() => setOpenDropdown(null)}>
                          {serviceDropdown.map((s) => (
                            <a
                              key={s.label}
                              href={s.href}
                              className="block px-5 py-3 text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white rounded-lg transition-all font-medium"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {s.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                if (item.name === 'Industries') {
                  return (
                    <div key={item.name} className="relative group" ref={dropdownRef}>
                      <button
                        className={`text-sm font-medium transition-colors relative px-4 py-2 rounded-lg overflow-hidden ${darkMode ? 'text-slate-300' : 'text-slate-700'} group animate-fadeInUp`}
                        style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                        onMouseEnter={() => setOpenDropdown('industries')}
                        onMouseLeave={() => setOpenDropdown(null)}
                        onClick={() => setOpenDropdown(openDropdown === 'industries' ? null : 'industries')}
                        type="button"
                      >
                        <span className="relative z-10 group-hover:text-white transition-colors">{item.name}</span>
                        <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 btn-aquamarine"></span>
                      </button>
                      {openDropdown === 'industries' && (
                        <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 py-2 animate-fadeInUp" onMouseEnter={() => setOpenDropdown('industries')} onMouseLeave={() => setOpenDropdown(null)}>
                          {industryDropdown.map((i) => (
                            <a
                              key={i.label}
                              href={i.href}
                              className="block px-5 py-3 text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white rounded-lg transition-all font-medium"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {i.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setShowSearch(false);
                      setSearchTerm('');
                    }}
                    className={`text-sm font-medium transition-colors relative px-4 py-2 rounded-lg overflow-hidden
                      ${darkMode ? 'text-slate-300' : 'text-slate-700'}
                      group animate-fadeInUp`}
                    style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors">{item.name}</span>
                    <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 btn-aquamarine"></span>
                  </a>
                );
              })
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              }`}
              onClick={() => setShowSearch(s => !s)}
            >
              <Search className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>
            
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-slate-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center px-4 py-2 btn-aquamarine text-sm font-medium rounded-lg transition-colors"
            >
              Book Consultation
            </a>

            <button className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
            }`}>
              <User className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
              }`}
            >
              {isMenuOpen ? (
                <X className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
              ) : (
                <Menu className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            darkMode ? 'border-slate-700 bg-slate-900/95' : 'border-slate-200 bg-white/95'
          } backdrop-blur-md`}>
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                    darkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                className="mx-4 mt-2 px-4 py-2 btn-aquamarine text-sm font-medium rounded-lg transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Consultation
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;