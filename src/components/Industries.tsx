import React, { useState } from 'react';
import { Building2, Heart, Factory, Briefcase, GraduationCap, ShoppingCart } from 'lucide-react';

interface IndustriesProps {
  darkMode: boolean;
}

const Industries: React.FC<IndustriesProps> = ({ darkMode }) => {
  const industries = [
    {
      icon: Heart,
      title: 'Healthcare',
      description: 'AI-powered diagnostics, patient management systems, and compliance automation for hospitals and healthcare networks.',
      solutions: ['Electronic Health Records', 'Telemedicine Platforms', 'AI Diagnostics', 'Compliance Automation'],
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'Smart factory solutions, predictive maintenance, and supply chain optimization for industrial leaders.',
      solutions: ['IoT Integration', 'Predictive Maintenance', 'Quality Control AI', 'Supply Chain Optimization'],
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Briefcase,
      title: 'Financial Services',
      description: 'Risk management, fraud detection, and automated trading systems for banks and financial institutions.',
      solutions: ['Risk Analytics', 'Fraud Detection', 'Algorithmic Trading', 'Regulatory Compliance'],
      image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Building2,
      title: 'Enterprise',
      description: 'Digital transformation, workflow automation, and data analytics for Fortune 500 companies.',
      solutions: ['Digital Transformation', 'Process Automation', 'Data Analytics', 'Cloud Migration'],
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Learning management systems, AI tutoring, and administrative automation for educational institutions.',
      solutions: ['LMS Platforms', 'AI Tutoring', 'Student Analytics', 'Administrative Automation'],
      image: 'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: ShoppingCart,
      title: 'Retail & E-commerce',
      description: 'Personalization engines, inventory management, and customer analytics for retail leaders.',
      solutions: ['Personalization AI', 'Inventory Optimization', 'Customer Analytics', 'Omnichannel Solutions'],
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  // Slider state
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerView = 3;
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + cardsPerView < industries.length;

  const handlePrev = () => {
    if (canGoPrev) setStartIndex(startIndex - cardsPerView);
  };
  const handleNext = () => {
    if (canGoNext) setStartIndex(startIndex + cardsPerView);
  };

  return (
    <section id="industries" className={`py-24 ${
      darkMode ? 'bg-slate-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Industries We Serve</h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Specialized solutions tailored for the unique challenges and opportunities in your industry sector.</p>
        </div>

        {/* Industries Slider */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`absolute left-[-48px] z-10 top-1/2 -translate-y-1/2 bg-slate-700 hover:bg-slate-600 text-white rounded-full p-2 shadow transition disabled:opacity-30 disabled:cursor-not-allowed hidden lg:block`}
            aria-label="Previous"
            style={{ visibility: canGoPrev ? 'visible' : 'hidden' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {industries.slice(startIndex, startIndex + cardsPerView).map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div
                  key={startIndex + index}
                  id={`industries-${industry.title.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:transform hover:scale-105 scroll-mt-32 ${
                    darkMode 
                      ? 'bg-slate-800 border border-slate-700' 
                      : 'bg-white border border-slate-200 shadow-lg hover:shadow-2xl'
                  }`}
                >
                  {/* Background Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {/* Icon */}
                    <div className="absolute top-4 left-4">
                      <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{industry.title}</h3>
                    <p className={`text-sm mb-4 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{industry.description}</p>
                    {/* Solutions */}
                    <div className="space-y-2">
                      {industry.solutions.map((solution, solutionIndex) => (
                        <div key={solutionIndex} className={`flex items-center text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}> <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div> {solution} </div>
                      ))}
                    </div>
                    {/* CTA */}
                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <a href="#contact" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">Explore Solutions →</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`absolute right-[-48px] z-10 top-1/2 -translate-y-1/2 bg-slate-700 hover:bg-slate-600 text-white rounded-full p-2 shadow transition disabled:opacity-30 disabled:cursor-not-allowed hidden lg:block`}
            aria-label="Next"
            style={{ visibility: canGoNext ? 'visible' : 'hidden' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className={`inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}> <div className="text-center sm:text-left"> <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Don't see your industry?</h3> <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>We work across all sectors. Let's discuss your specific needs.</p> </div> <a href="#contact" className="flex-shrink-0 px-6 py-3 btn-aquamarine font-semibold rounded-lg">Schedule Consultation</a> </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;