import React, { useState } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      darkMode ? 'bg-slate-900' : 'bg-white'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Trusted by Fortune 500 Companies
          </div> */}

          {/* Main Headline */}
          <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 ${darkMode ? 'text-white' : 'text-slate-900'} animate-fadeInUp`} style={{ animationDelay: '0.1s' }}>
            Transforming Business with{' '}
            <span className="text-aquamarine-gradient">Advanced AI</span>{' '}
            & Digital Solutions
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          } animate-fadeInUp`} style={{ animationDelay: '0.3s' }}>
            Enterprise-grade AI automation, custom development, and strategic consulting 
            that delivers measurable ROI for industry leaders.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#contact"
              className="btn-aquamarine px-8 py-4 text-lg font-semibold rounded-lg group inline-flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-fadeInUp"
              style={{ animationDelay: '0.5s' }}
            >
              Connect with Our Experts
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button
              className={`btn-aquamarine group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg border-2 transition-all duration-300 animate-fadeInUp`}
              style={{ animationDelay: '0.7s' }}
              onClick={openModal}
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
          darkMode ? 'border-slate-600' : 'border-slate-300'
        }`}>
          <div className={`w-1 h-3 rounded-full mt-2 animate-bounce ${
            darkMode ? 'bg-slate-400' : 'bg-slate-600'
          }`}></div>
        </div>
      </div>
    </section>
    {/* Video Modal */}
    {isModalOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
        onClick={closeModal}
      >
        <div 
          className="bg-slate-800 rounded-lg shadow-2xl p-4 relative w-full max-w-4xl mx-4 transition-transform duration-300 transform scale-95"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
        >
          <button 
            onClick={closeModal}
            className="absolute -top-4 -right-4 bg-white text-slate-800 rounded-full h-10 w-10 flex items-center justify-center shadow-lg hover:bg-slate-200 transition"
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="aspect-w-16 aspect-h-9">
            {/* Use <video> for local file playback */}
            <video
              src="https://drive.google.com/file/d/1KMOvri871AjMTSMT_hZoJYakX5cEQLN_/view?usp=sharing"
              controls
              autoPlay
              className="w-full h-full rounded-md"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Hero;